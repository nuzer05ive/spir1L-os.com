# Reel Forge VR

This demo uses procedurally generated models for the spiral tunnel and simple anime-style avatars.
The binary assets are not committed to the repository. Before launching the dev server,
run the generation scripts from the repo root:

```bash
python scripts/gen_anime_avatars.py
python scripts/bake_tunnel.py
```

To tweak the avatars or introduce new characters, edit `scripts/gen_anime_avatars.py`
and rerun the script. You may also drop custom `.glb` models into
`public/models/` to replace the procedurally generated versions.

This will create the `.glb` models and HDR texture under `public/` for local use.
