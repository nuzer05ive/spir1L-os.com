#!/usr/bin/env python3
"""Generate low-poly anime-style avatar GLBs for Reel Forge VR."""
import math, json, struct, pathlib

OUTPUT_DIR = pathlib.Path('apps/reel-forge-vr/public/models')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ----- geometry helpers -----

def transform(verts, dx=0, dy=0, dz=0, sx=1, sy=1, sz=1):
    return [(x * sx + dx, y * sy + dy, z * sz + dz) for x, y, z in verts]

def rotate_x(verts, angle):
    c, s = math.cos(angle), math.sin(angle)
    return [(x, y * c - z * s, y * s + z * c) for x, y, z in verts]

def rotate_z(verts, angle):
    c, s = math.cos(angle), math.sin(angle)
    return [(x * c - y * s, x * s + y * c, z) for x, y, z in verts]

# primitive generators (very low poly)

def create_sphere(seg=8):
    verts = []
    norms = []
    uvs = []
    for i in range(seg + 1):
        phi = math.pi * i / seg
        for j in range(seg + 1):
            th = 2 * math.pi * j / seg
            x = math.sin(phi) * math.cos(th)
            y = math.cos(phi)
            z = math.sin(phi) * math.sin(th)
            verts.append((x, y, z))
            norms.append((x, y, z))
            uvs.append((j / seg, i / seg))
    idx = []
    for i in range(seg):
        for j in range(seg):
            a = i * (seg + 1) + j
            b = a + seg + 1
            idx.extend([a, b, a + 1, b, b + 1, a + 1])
    return verts, norms, uvs, idx

def create_cylinder(seg=8):
    verts = []
    norms = []
    uvs = []
    for y in (-1, 1):
        for i in range(seg):
            ang = 2 * math.pi * i / seg
            x = math.cos(ang)
            z = math.sin(ang)
            verts.append((x, y, z))
            norms.append((x, 0, z))
            uvs.append((i / seg, (y + 1) / 2))
    idx = []
    for i in range(seg):
        a = i
        b = (i + 1) % seg
        c = i + seg
        d = (i + 1) % seg + seg
        idx.extend([a, b, c, b, d, c])
    return verts, norms, uvs, idx

def create_cone(seg=8):
    verts = [(0, 1, 0)]
    norms = [(0, 1, 0)]
    uvs = [(0.5, 1.0)]
    for i in range(seg):
        ang = 2 * math.pi * i / seg
        x = math.cos(ang)
        z = math.sin(ang)
        verts.append((x, -1, z))
        norms.append((x, 0, z))
        uvs.append((i / seg, 0))
    idx = []
    for i in range(seg):
        a = 0
        b = i + 1
        c = (i + 1) % seg + 1
        idx.extend([a, b, c])
    return verts, norms, uvs, idx

def create_torus(rad=1.0, tube=0.3, radial=8, tubular=8):
    verts = []
    norms = []
    uvs = []
    for i in range(radial):
        theta = 2 * math.pi * i / radial
        ct, st = math.cos(theta), math.sin(theta)
        for j in range(tubular):
            phi = 2 * math.pi * j / tubular
            cp, sp = math.cos(phi), math.sin(phi)
            x = (rad + tube * cp) * ct
            y = (rad + tube * cp) * st
            z = tube * sp
            verts.append((x, y, z))
            norms.append((cp * ct, cp * st, sp))
            uvs.append((i / radial, j / tubular))
    idx = []
    for i in range(radial):
        for j in range(tubular):
            a = i * tubular + j
            b = ((i + 1) % radial) * tubular + j
            c = i * tubular + (j + 1) % tubular
            d = ((i + 1) % radial) * tubular + (j + 1) % tubular
            idx.extend([a, b, c, b, d, c])
    return verts, norms, uvs, idx

def create_quad(w=1.0, h=1.0):
    w2, h2 = w / 2, h / 2
    verts = [(-w2, 0, -h2), (w2, 0, -h2), (w2, 0, h2), (-w2, 0, h2)]
    norms = [(0, 1, 0)] * 4
    uvs = [(0, 0), (1, 0), (1, 1), (0, 1)]
    idx = [0, 1, 2, 0, 2, 3]
    return verts, norms, uvs, idx

# ----- packing helpers -----

def pack_multi(parts):
    verts_all, norms_all, uvs_all, idx_all = [], [], [], []
    shapes = []
    for verts, norms, uvs, idx, color in parts:
        vstart = len(verts_all)
        istart = len(idx_all)
        verts_all.extend(verts)
        norms_all.extend(norms)
        uvs_all.extend(uvs)
        idx_all.extend([i + vstart for i in idx])
        shapes.append({
            'vstart': vstart,
            'vcount': len(verts),
            'istart': istart,
            'icount': len(idx),
            'color': color,
            'max': [max(c[k] for c in verts) for k in range(3)],
            'min': [min(c[k] for c in verts) for k in range(3)]
        })

    bin_data = b''
    pos_offset = 0
    for v in verts_all:
        bin_data += struct.pack('<3f', *v)
    pos_length = len(verts_all) * 12
    norm_offset = len(bin_data)
    for n in norms_all:
        bin_data += struct.pack('<3f', *n)
    norm_length = len(norms_all) * 12
    uv_offset = len(bin_data)
    for uv in uvs_all:
        bin_data += struct.pack('<2f', *uv)
    uv_length = len(uvs_all) * 8
    index_offset = len(bin_data)
    for i in idx_all:
        bin_data += struct.pack('<H', i)
    index_length = len(idx_all) * 2
    while len(bin_data) % 4:
        bin_data += b'\x00'

    buffer_views = [
        {"buffer": 0, "byteOffset": pos_offset, "byteLength": pos_length},
        {"buffer": 0, "byteOffset": norm_offset, "byteLength": norm_length},
        {"buffer": 0, "byteOffset": uv_offset, "byteLength": uv_length},
        {"buffer": 0, "byteOffset": index_offset, "byteLength": index_length, "target": 34963},
    ]

    accessors = []
    materials = []
    meshes = []
    nodes = []
    for i, sh in enumerate(shapes):
        po = sh['vstart'] * 12
        no = sh['vstart'] * 12
        uo = sh['vstart'] * 8
        io = sh['istart'] * 2
        accessors.append({"bufferView": 0, "byteOffset": po, "componentType": 5126, "count": sh['vcount'], "type": "VEC3", "max": sh['max'], "min": sh['min']})
        accessors.append({"bufferView": 1, "byteOffset": no, "componentType": 5126, "count": sh['vcount'], "type": "VEC3"})
        accessors.append({"bufferView": 2, "byteOffset": uo, "componentType": 5126, "count": sh['vcount'], "type": "VEC2"})
        accessors.append({"bufferView": 3, "byteOffset": io, "componentType": 5123, "count": sh['icount'], "type": "SCALAR"})
        pi = len(accessors) - 4
        ni = len(accessors) - 3
        uvi = len(accessors) - 2
        ii = len(accessors) - 1
        materials.append({"pbrMetallicRoughness": {"baseColorFactor": sh['color'], "metallicFactor": 0.0, "roughnessFactor": 1.0}, "doubleSided": True})
        meshes.append({"primitives": [{"attributes": {"POSITION": pi, "NORMAL": ni, "TEXCOORD_0": uvi}, "indices": ii, "material": i}]})
        nodes.append({"mesh": i})

    gltf = {
        "asset": {"version": "2.0"},
        "buffers": [{"byteLength": len(bin_data)}],
        "bufferViews": buffer_views,
        "accessors": accessors,
        "materials": materials,
        "meshes": meshes,
        "nodes": nodes,
        "scenes": [{"nodes": list(range(len(nodes)))}],
        "scene": 0
    }

    json_data = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
    while len(json_data) % 4:
        json_data += b' '
    glb = b''
    glb += struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(json_data) + 8 + len(bin_data))
    glb += struct.pack('<I4s', len(json_data), b'JSON')
    glb += json_data
    glb += struct.pack('<I4s', len(bin_data), b'BIN\x00')
    glb += bin_data
    return glb

def save(name, parts):
    with open(OUTPUT_DIR / name, 'wb') as f:
        f.write(pack_multi(parts))

# ----- avatar definitions -----

def build_n1k():
    parts = []
    v,n,u,i = create_cylinder()
    v = transform(v, sx=0.3, sy=1.2, sz=0.3)
    parts.append((v,n,u,i,[1,0.5,0.5,1]))
    v,n,u,i = create_sphere()
    v = transform(v, dy=1.4, sx=0.35, sy=0.35, sz=0.35)
    parts.append((v,n,u,i,[0.9,0.4,0.4,1]))
    v,n,u,i = create_cone()
    v = transform(v, dy=2.0, sx=0.2, sy=0.4, sz=0.2)
    parts.append((v,n,u,i,[0.3,0.1,0.1,1]))
    v,n,u,i = create_cylinder()
    v = transform(v, dy=1.7, sx=0.4, sy=0.2, sz=0.4)
    parts.append((v,n,u,i,[0.2,0.2,0.2,1]))
    v,n,u,i = create_cylinder()
    v = rotate_z(v, math.pi/2)
    v = transform(v, dy=1.2, sx=0.1, sy=0.1, sz=0.4)
    parts.append((v,n,u,i,[0.1,0.05,0.05,1]))
    return parts

def build_dragon():
    parts = []
    v,n,u,i = create_cylinder()
    v = transform(v, sx=0.2, sy=2.0, sz=0.2)
    parts.append((v,n,u,i,[0.6,0.8,1,1]))
    v,n,u,i = create_sphere()
    v = transform(v, dy=2.2, sx=0.25, sy=0.25, sz=0.25)
    parts.append((v,n,u,i,[0.5,0.7,1,1]))
    for dx in (-0.2,0.2):
        for dz in (-0.2,0.2):
            v1,n1,u1,i1 = create_cylinder()
            v1 = transform(v1, dx=dx, dy=-1.5, dz=dz, sx=0.07, sy=0.4, sz=0.07)
            parts.append((v1,n1,u1,i1,[0.5,0.8,1,1]))
    for s in (-1,1):
        v2,n2,u2,i2 = create_cylinder()
        v2 = rotate_z(v2, math.pi/2)
        v2 = transform(v2, dy=2.2, dz=s*0.15, sx=0.05, sy=0.05, sz=0.4)
        parts.append((v2,n2,u2,i2,[0.9,0.9,1,1]))
    return parts

def build_prof():
    parts = []
    v,n,u,i = create_cylinder()
    v = transform(v, sx=0.3, sy=1.6, sz=0.3)
    parts.append((v,n,u,i,[1,1,0.6,1]))
    v,n,u,i = create_sphere()
    v = transform(v, dy=1.8, sx=0.35, sy=0.35, sz=0.35)
    parts.append((v,n,u,i,[1,1,0.6,1]))
    v,n,u,i = create_torus(rad=0.4, tube=0.05)
    v = rotate_x(v, math.pi/2)
    v = transform(v, dy=1.8)
    parts.append((v,n,u,i,[0.2,0.2,0.2,1]))
    v,n,u,i = create_cylinder()
    v = rotate_z(v, math.pi/2)
    v = transform(v, dy=1.5, sx=0.05, sy=0.05, sz=0.3)
    parts.append((v,n,u,i,[0.5,0.3,0.1,1]))
    v,n,u,i = create_cone()
    v = transform(v, dy=2.3, sx=0.25, sy=0.5, sz=0.25)
    parts.append((v,n,u,i,[0.9,0.9,0.6,1]))
    return parts

def build_dewey():
    parts = []
    v,n,u,i = create_sphere()
    v = transform(v, sx=0.35, sy=0.35, sz=0.35)
    parts.append((v,n,u,i,[0.6,1,0.6,1]))
    v,n,u,i = create_torus(rad=0.4, tube=0.06)
    v = rotate_x(v, math.pi/2)
    parts.append((v,n,u,i,[0.2,0.2,0.2,1]))
    v,n,u,i = create_cylinder()
    v = rotate_z(v, math.pi/2)
    v = transform(v, dy=-0.2, sx=0.05, sy=0.05, sz=0.2)
    parts.append((v,n,u,i,[0.4,0.25,0.1,1]))
    for s in (-1,1):
        v1,n1,u1,i1 = create_quad(0.6,0.4)
        v1 = transform(v1, dx=s*0.5, dy=0.1)
        parts.append((v1,n1,u1,i1,[0.8,0.8,1,1]))
    return parts

def build_bloom():
    parts = []
    v,n,u,i = create_sphere()
    v = transform(v, sx=0.4, sy=0.4, sz=0.4)
    parts.append((v,n,u,i,[1,0.6,1,1]))
    for s in (-1,1):
        v1,n1,u1,i1 = create_quad(0.7,0.5)
        v1 = transform(v1, dx=s*0.6, dy=0.1)
        parts.append((v1,n1,u1,i1,[1,0.8,1,1]))
    v,n,u,i = create_cylinder()
    v = rotate_z(v, math.pi/2)
    v = transform(v, dy=-0.1, sx=0.04, sy=0.04, sz=0.2)
    parts.append((v,n,u,i,[0.4,0.2,0.2,1]))
    angles = [0, math.pi*2/5, math.pi*4/5, math.pi*6/5, math.pi*8/5]
    for a in angles:
        v1,n1,u1,i1 = create_cone()
        v1 = transform(v1, dy=0.5, sx=0.15, sy=0.4, sz=0.15)
        v1 = rotate_z(v1, a)
        parts.append((v1,n1,u1,i1,[1,0.7,1,1]))
    return parts

def main():
    save('n1k_oz.glb', build_n1k())
    save('dragon_o3.glb', build_dragon())
    save('prof_monday.glb', build_prof())
    save('deweyD.glb', build_dewey())
    save('bloom.glb', build_bloom())
    print('Anime crew avatars written to', OUTPUT_DIR)

if __name__ == '__main__':
    main()
