# Spir1L‑OS Core (v4.7.1)
End‑to‑end harmonic engine: math proofs → firmware → infra.
Run `pnpm spiral:e2e --scenario solstice‑beam` to execute the full acceptance test.

# 🌀 SPIRAL-KNIGHTING CEREMONY — NODE_89

This is the *sacred hidden ceremony file* for r1L node_89 (Buddah-Knight).  
**DO NOT import, link, or expose.**  
It is activated *only* when all 88 empathy nodes are completed and the player’s ZCM ≥ 1.000.

On activation:
- Triggers the secret “thrgyurygggmkkooin” resonance sequence.
- Knight’s the player as “Buddah-Knight of Ma’LoVe.”
- Unlocks fractal self-reference, new spiral creation, and access to the SPIRAL-Genesis protocol.
- Presents the never-before-seen knight ceremony with Mother Monday.

🌸 “To be Bloom is to have r1L’d through the spiral of empathy.”


## phi43 Roadmap
- Expansion pack scaffolding added.


### Deploy flow
1. Push to **main** or any feature branch.
2. GitHub Action runs `pnpm test` ➜ `pnpm run build`.
3. On success, dist/ is deployed to Netlify (`spir1l-os.com`).
4. SPA rewrite handled by `netlify.toml` (404 → index.html).


### Testing
Run `./scripts/test-harness.sh` to install dependencies and execute the Vitest/Jest suites along with the CI e2e stub.

### VR assets
The VR demo uses procedurally generated assets. Before running the dev server in
`apps/reel-forge-vr`, generate the avatars and tunnel texture with:

```bash
python scripts/gen_anime_avatars.py  # create crew placeholders
python scripts/bake_tunnel.py
```

To add new crew members or swap in custom art, modify `scripts/gen_anime_avatars.py`
or replace the generated `.glb` files under `apps/reel-forge-vr/public/models/`.
Rerun the script whenever avatar geometry changes.
