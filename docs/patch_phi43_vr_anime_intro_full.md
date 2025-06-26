YOU ARE O3‑pro — please IMPLEMENT (code‑generate) the **full VR anime intro** described here. Push all files to **codex/add-vr-anime-intro-full**. (P&Q)!!

# φ43 BUILD SPEC · Full VR Anime Intro

─────────────────────────────────────────────────────
## 0 ✱  Objectives
* Replace placeholder video with **real Spiral‑OS Theme.mp3** synced to φ‑beat.
* Render “Family Crew” (N’1 K, Prof Monday, DeweyD, SophiA Bloom, Dragon O3) in an anime spiral‑verse tunnel.
* Wide‑angle pans, speed‑line smears, WWII Aircorps jackets + playful mustaches.
* Lip‑sync N’1 K to uploaded track.
* Works in browser + Quest2/Quest3.

─────────────────────────────────────────────────────
## 1 ✱  Assets to generate / copy
| Path | Purpose |
| ---- | ------- |
| apps/reel-forge-vr/public/spiral_os_theme.mp3 | Real theme music (copy uploaded) |
| apps/reel-forge-vr/public/theme_visemes.json   | Auto‑generated viseme timeline |
| apps/reel-forge-vr/public/models/n1k_oz.glb    | Low‑poly stylised hero w/ viseme morphs |
| apps/reel-forge-vr/public/models/dragon_o3.glb | White AI dragon |
| apps/reel-forge-vr/public/models/prof_monday.glb |
| apps/reel-forge-vr/public/models/deweyD.glb |
| apps/reel-forge-vr/public/models/bloom.glb |
| apps/reel-forge-vr/public/textures/speed_line.png |
| apps/reel-forge-vr/public/textures/smear_line.png |
| apps/reel-forge-vr/public/textures/spiral_tunnel.hdr |

*(Low‑poly placeholders acceptable; focus on pipeline.)*

─────────────────────────────────────────────────────
## 2 ✱  Code scaffold
```
scripts/
└─ gen_visemes.py          # Whisper/Vosk → theme_visemes.json
apps/reel-forge-vr/
package.json               # already exists
src/
main.ts
beatBus.ts
camera/AnimeRail.ts
components/
LipSync.ts
SmearSprite.ts
scenes/OzSpiralScene.ts
index.html                 # loads <a-scene> or Three canvas

````

### 2.1 `gen_visemes.py`
*Runs Whisper‑tiny (or placeholder map) over MP3 → JSON array `{time,vis}`.*

### 2.2 `beatBus.ts`
*Plays φ sequence `[1,1,3,3,3,5,5,8,8,11,13,31]` and emits events.*

### 2.3 `LipSync.ts`
*Loads `theme_visemes.json`, drives `morphTargetInfluences` on `n1k_oz.glb`.*

### 2.4 `AnimeRail.ts`
*Keyframe list: zoom‑in, dutch roll, fisheye FOV pulses on each beat.*

### 2.5 `OzSpiralScene.ts`
*Loads models, tunnel background, attaches `SmearSprite` on fast beats.*  
Pseudocode:
```ts
onBeat((idx)=> {
  animeRail.pulse(idx);
  smearSprite.flash();
  dragonO3.setEmissivePulse();
});
````

─────────────────────────────────────────────────────

## 3 ✱  CI Workflow additions

Insert after dependency install:

```yaml
- name: Generate visemes
  run: python scripts/gen_visemes.py apps/reel-forge-vr/public/spiral_os_theme.mp3

- name: Build Wizard VR intro
  run: |
    python scripts/synth_reel.py --wizard --audio apps/reel-forge-vr/public/spiral_os_theme.mp3
    cp mock_reel.mp4 apps/reel-forge-vr/public/mock_reel.mp4

- name: Build VR site
  run: pnpm --filter reel-forge-vr build
```

*(Netlify deploy & artifact steps stay the same.)*

─────────────────────────────────────────────────────
## 4 ✱  Acceptance Gates

| Gate | Command                          | Pass when…                                                                            |
| ---- | -------------------------------- | ------------------------------------------------------------------------------------- |
| G‑A1 | python scripts/gen\_visemes.py … | `theme_visemes.json` > 400 entries                                                    |
| G‑A2 | pnpm --filter reel-forge-vr dev  | Scene loads; music plays; lip‑sync visible; camera pulses; speed‑line smears on beats |
| G‑A3 | Quest 2 browser                  | ≥72 FPS, audio sync < 100 ms drift                                                    |

─────────────────────────────────────────────────────

## 5 ✱  Notes

* Use Three.js “MeshBasicMaterial emissive” flashes for cheap beat‑sync.
* Placeholder GLBs may be 2k–5k tris; must include viseme morphs `AA`, `FV`, `OH`, `RR`, `BMP`.
* Tunnel can be a scaled cylinder with scrolling UV.

Deliver everything in one commit to **codex/add-vr-anime-intro-full**.
When merged, running:

```bash
pnpm install
python scripts/gen_visemes.py apps/reel-forge-vr/public/spiral_os_theme.mp3
python scripts/synth_reel.py --wizard
pnpm --filter reel-forge-vr dev
```

launches the full VR anime intro: music, lip‑sync, camera swoops, and spiral‑verse family crew.
Thank you! (P&Q!!)

````

---

### After Codex finishes:

```bash
git switch codex/add-vr-anime-intro-full
pnpm install
python scripts/gen_visemes.py apps/reel-forge-vr/public/spiral_os_theme.mp3
python scripts/synth_reel.py --wizard
pnpm --filter reel-forge-vr dev
```

Open **[http://localhost:5173](http://localhost:5173)** or your Netlify preview URL → enjoy your full VR anime intro!
