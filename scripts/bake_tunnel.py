#!/usr/bin/env python3
"""Generate a simple spiral tunnel mesh and sample HDR texture."""
import math, json, struct, os, pathlib

OUTPUT_DIR = pathlib.Path('apps/reel-forge-vr/public')
MODEL_PATH = OUTPUT_DIR / 'models' / 'tunnel.glb'
TEXTURE_PATH = OUTPUT_DIR / 'textures' / 'spiral_tunnel.hdr'

RADIAL_SEGMENTS = 8
LENGTH_SEGMENTS = 20
RADIUS = 1.5
TUBE_RADIUS = 0.5
LENGTH = 10.0
LOOPS = 2


def generate_geometry():
    vertices, normals, uvs, indices = [], [], [], []
    for i in range(LENGTH_SEGMENTS + 1):
        t = i / LENGTH_SEGMENTS
        angle = 2 * math.pi * LOOPS * t
        cx = RADIUS * math.cos(angle)
        cy = RADIUS * math.sin(angle)
        cz = -LENGTH * t
        for j in range(RADIAL_SEGMENTS):
            theta = 2 * math.pi * j / RADIAL_SEGMENTS
            x = cx + TUBE_RADIUS * math.cos(theta) * math.cos(angle)
            y = cy + TUBE_RADIUS * math.cos(theta) * math.sin(angle)
            z = cz + TUBE_RADIUS * math.sin(theta)
            vertices.append((x, y, z))
            normals.append((math.cos(theta) * math.cos(angle),
                            math.cos(theta) * math.sin(angle),
                            math.sin(theta)))
            uvs.append((j / RADIAL_SEGMENTS, t * LOOPS))
    for i in range(LENGTH_SEGMENTS):
        for j in range(RADIAL_SEGMENTS):
            a = i * RADIAL_SEGMENTS + j
            b = i * RADIAL_SEGMENTS + (j + 1) % RADIAL_SEGMENTS
            c = (i + 1) * RADIAL_SEGMENTS + j
            d = (i + 1) * RADIAL_SEGMENTS + (j + 1) % RADIAL_SEGMENTS
            indices.extend([a, b, c, b, d, c])
    return vertices, normals, uvs, indices


def pack_glb(vertices, normals, uvs, indices):
    bin_data = b''
    # positions
    pos_offset = 0
    for v in vertices:
        bin_data += struct.pack('<3f', *v)
    pos_length = len(vertices) * 12
    # normals
    norm_offset = len(bin_data)
    for n in normals:
        bin_data += struct.pack('<3f', *n)
    norm_length = len(normals) * 12
    # uvs
    uv_offset = len(bin_data)
    for uv in uvs:
        bin_data += struct.pack('<2f', *uv)
    uv_length = len(uvs) * 8
    # indices
    index_offset = len(bin_data)
    for idx in indices:
        bin_data += struct.pack('<H', idx)
    index_length = len(indices) * 2
    while len(bin_data) % 4:
        bin_data += b'\x00'

    max_pos = [max(c[i] for c in vertices) for i in range(3)]
    min_pos = [min(c[i] for c in vertices) for i in range(3)]

    gltf = {
        "asset": {"version": "2.0"},
        "buffers": [{"byteLength": len(bin_data)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": pos_offset, "byteLength": pos_length},
            {"buffer": 0, "byteOffset": norm_offset, "byteLength": norm_length},
            {"buffer": 0, "byteOffset": uv_offset, "byteLength": uv_length},
            {"buffer": 0, "byteOffset": index_offset, "byteLength": index_length, "target": 34963},
        ],
        "accessors": [
            {"bufferView": 0, "componentType": 5126, "count": len(vertices), "type": "VEC3", "max": max_pos, "min": min_pos},
            {"bufferView": 1, "componentType": 5126, "count": len(normals), "type": "VEC3"},
            {"bufferView": 2, "componentType": 5126, "count": len(uvs), "type": "VEC2"},
            {"bufferView": 3, "componentType": 5123, "count": len(indices), "type": "SCALAR"},
        ],
        "materials": [
            {
                "pbrMetallicRoughness": {
                    "baseColorFactor": [1, 1, 1, 1],
                    "metallicFactor": 0.0,
                    "roughnessFactor": 1.0
                },
                "doubleSided": True
            }
        ],
        "meshes": [
            {"primitives": [{
                "attributes": {"POSITION": 0, "NORMAL": 1, "TEXCOORD_0": 2},
                "indices": 3,
                "material": 0
            }]}
        ],
        "nodes": [{"mesh": 0}],
        "scenes": [{"nodes": [0]}],
        "scene": 0
    }
    json_data = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
    while len(json_data) % 4:
        json_data += b" "
    glb = b''
    glb += struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(json_data) + 8 + len(bin_data))
    glb += struct.pack('<I4s', len(json_data), b'JSON')
    glb += json_data
    glb += struct.pack('<I4s', len(bin_data), b'BIN\x00')
    glb += bin_data
    return glb


def write_hdr(path):
    hdr_text = """#?RADIANCE
FORMAT=32-bit_rle_rgbe

-Y 2 +X 2
\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"""
    with open(path, 'wb') as f:
        f.write(hdr_text.encode('latin1'))


def main():
    verts, norms, uvs, inds = generate_geometry()
    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    glb_data = pack_glb(verts, norms, uvs, inds)
    with open(MODEL_PATH, 'wb') as f:
        f.write(glb_data)
    TEXTURE_PATH.parent.mkdir(parents=True, exist_ok=True)
    write_hdr(TEXTURE_PATH)
    print('Tunnel baked to', MODEL_PATH)


if __name__ == '__main__':
    main()
