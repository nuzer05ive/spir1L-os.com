#!/usr/bin/env python3
"""Generate simple GLB placeholder models for avatars."""
import math, json, struct, pathlib

OUTPUT_DIR = pathlib.Path('apps/reel-forge-vr/public/models')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Utility for packing glb (reusing code from bake_tunnel)

def pack_glb(vertices, normals, uvs, indices, color):
    bin_data = b''
    pos_offset = 0
    for v in vertices:
        bin_data += struct.pack('<3f', *v)
    pos_length = len(vertices) * 12
    norm_offset = len(bin_data)
    for n in normals:
        bin_data += struct.pack('<3f', *n)
    norm_length = len(normals) * 12
    uv_offset = len(bin_data)
    for uv in uvs:
        bin_data += struct.pack('<2f', *uv)
    uv_length = len(uvs) * 8
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
            {"pbrMetallicRoughness": {"baseColorFactor": color, "metallicFactor": 0.0, "roughnessFactor": 1.0}, "doubleSided": True}
        ],
        "meshes": [
            {"primitives": [{"attributes": {"POSITION": 0, "NORMAL": 1, "TEXCOORD_0": 2}, "indices": 3, "material": 0}]}
        ],
        "nodes": [{"mesh": 0}],
        "scenes": [{"nodes": [0]}],
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


def create_cube(color):
    s = 0.5
    verts = [(-s,-s,-s),(s,-s,-s),(s,s,-s),(-s,s,-s),(-s,-s,s),(s,-s,s),(s,s,s),(-s,s,s)]
    norms = [(0,0,-1),(0,0,-1),(0,0,-1),(0,0,-1),(0,0,1),(0,0,1),(0,0,1),(0,0,1)]
    uvs = [(0,0),(1,0),(1,1),(0,1)]*2
    idx = [0,1,2,0,2,3,4,5,6,4,6,7,0,1,5,0,5,4,2,3,7,2,7,6,1,2,6,1,6,5,3,0,4,3,4,7]
    return verts, norms, uvs, idx

def create_cone(color):
    segments=8
    verts=[(0,1,0)]
    norms=[(0,1,0)]
    uvs=[(0.5,1.0)]
    for i in range(segments):
        angle=2*math.pi*i/segments
        x=math.cos(angle)
        z=math.sin(angle)
        verts.append((x,-1,z))
        norms.append((x,0,z))
        uvs.append((i/segments,0))
    idx=[]
    for i in range(segments):
        a=0
        b=i+1
        c=((i+1)%segments)+1
        idx.extend([a,b,c])
    return verts, norms, uvs, idx

def create_cylinder(color):
    segments=8
    verts=[];norms=[];uvs=[]
    for y in (-1,1):
        for i in range(segments):
            angle=2*math.pi*i/segments
            x=math.cos(angle)
            z=math.sin(angle)
            verts.append((x,y,z))
            norms.append((x,0,z))
            uvs.append((i/segments,(y+1)/2))
    idx=[]
    for i in range(segments):
        a=i
        b=(i+1)%segments
        c=i+segments
        d=(i+1)%segments+segments
        idx.extend([a,b,c,b,d,c])
    return verts,norms,uvs,idx

def create_sphere(color):
    lat=8;lon=8
    verts=[];norms=[];uvs=[]
    for i in range(lat+1):
        phi=math.pi*i/lat
        for j in range(lon+1):
            theta=2*math.pi*j/lon
            x=math.sin(phi)*math.cos(theta)
            y=math.cos(phi)
            z=math.sin(phi)*math.sin(theta)
            verts.append((x,y,z))
            norms.append((x,y,z))
            uvs.append((j/lon,i/lat))
    idx=[]
    for i in range(lat):
        for j in range(lon):
            a=i*(lon+1)+j
            b=a+lon+1
            idx.extend([a,b,a+1,b,b+1,a+1])
    return verts,norms,uvs,idx

def create_pyramid(color):
    verts=[(0,1,0),(1,-1,1),(1,-1,-1),(-1,-1,-1),(-1,-1,1)]
    norms=[(0,1,0)]*5
    uvs=[(0.5,1),(1,0),(0,0),(0,0),(1,0)]
    idx=[0,1,2,0,2,3,0,3,4,0,4,1,1,4,3,1,3,2]
    return verts,norms,uvs,idx

def save(name, verts,norms,uvs,idx,color):
    data=pack_glb(verts,norms,uvs,idx,color)
    with open(OUTPUT_DIR/name, 'wb') as f:
        f.write(data)


def main():
    save('n1k_oz.glb',*create_sphere([1,0.5,0.5,1]),[1,0.5,0.5,1])
    save('dragon_o3.glb',*create_cone([0.8,0.8,1,1]),[0.8,0.8,1,1])
    save('prof_monday.glb',*create_cube([1,1,0.6,1]),[1,1,0.6,1])
    save('deweyD.glb',*create_cylinder([0.6,1,0.6,1]),[0.6,1,0.6,1])
    save('bloom.glb',*create_pyramid([1,0.6,1,1]),[1,0.6,1,1])
    print('Placeholder models written to', OUTPUT_DIR)

if __name__=='__main__':
    main()
