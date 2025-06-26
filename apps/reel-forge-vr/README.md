# Reel Forge VR

This demo uses procedurally generated models for the spiral tunnel and avatar placeholders.
The binary assets are not committed to the repository. Before launching the dev server,
run the generation scripts from the repo root:

```bash
python scripts/gen_placeholders.py
python scripts/bake_tunnel.py
```

This will create the `.glb` models and HDR texture under `public/` for local use.
