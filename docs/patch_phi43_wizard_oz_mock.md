YOU ARE O3-pro — please stretch the mock reel to a full “Wizard of Oz” VR
teaser (P&Q)!!

────────────────────────────────────────────────────────
# PATCH · Wizard-of-Oz VR Mock + Folded-Beat Anthem
────────────────────────────────────────────────────────

## 0 ⟡ New Assets

| path                                   | purpose                       |
|----------------------------------------|-------------------------------|
| `assets/audio/folded_oz_anthem.mp3`    | 13-sec folded-beat rock+orchestra |
| `assets/models/n1k_oz.glb`             | stylised Goku-meets-Oz avatar |
| `assets/models/dragon_o3.glb`          | white AI dragon               |
| `assets/models/yellow_brick_road.glb`  | looping road segment          |
| `assets/textures/emerald_city.hdr`     | env-map for bloom shader      |

*(Codex will autogenerate low-poly placeholders using three-js examples if real GLBs not supplied.)*

---

## 1 ⟡ Reel-Forge-VR scaffold

`apps/reel-forge-vr/`

```
src/
main.ts                # Three.js + A-Frame init
beatBus.ts             # WebAudio sine-callback with φ-beat schedule
scenes/OzScene.ts      # loads GLBs, positions camera
components/TiltCam.ts  # joystick / WASD flight + zoom
public/
mock_reel.mp4          # copied via build script
folded_oz_anthem.mp3   # soundtrack
vite.config.ts
```

### 1.1  `dev` script (package.json)

```jsonc
"scripts": {
  "dev": "vite --host",
  "build": "vite build"
}
```

### 1.2  `beatBus.ts` (excerpt)

```ts
import { Clock } from "three";
const BEATS = [1,1,3, 3,3,5, 5,8, 8,11, 13,31]; // seconds
export const clock = new Clock();
export function onBeat(cb:()=>void){
  let next = 0, acc = 0;
  const loop = ()=> {
    const t = clock.getElapsedTime();
    if (t >= acc + BEATS[next]) {
      acc += BEATS[next++];
      cb();                                 // pulse!
      next %= BEATS.length;
    }
    requestAnimationFrame(loop);
  };
  loop();
}
```

`OzScene` subscribes to `onBeat()` to **flash emerald bloom, make Dragon
O3 breathe particles, and tap the snare of the anthem’s cue track**.

---

## 2 ⟡ Folded-Beat Audio CLI

`scripts/fold_anthem.py`

* takes any WAV, applies 4-fold algorithm → returns 13-sec MP3
* default seed = sine sweep that lands on 221 Hz (Oz “home chord”)
* invoked by new npm script:

```jsonc
"make:anthem": "python3 scripts/fold_anthem.py --out assets/audio/folded_oz_anthem.mp3"
```

---

## 3 ⟡ Modified `synth_reel.py`

* If `--wizard` flag passed, copies `folded_oz_anthem.mp3` under
  `public/` so Vite streams it; drops old drawtext overlay.

---

## 4 ⟡ How to preview (one command)

```bash
pnpm run wizard   # maps to: python scripts/synth_reel.py --wizard && pnpm -F reel-forge-vr dev
```

*Opens [http://localhost:5173](http://localhost:5173)* → camera floats down yellow-brick road,
Dragon O3 coils overhead, title glyphs pulse *on every beat*.

---

## 5 ⟡ CI additions

```yaml
- name: Build wizard mock
  run: |
    pnpm run make:anthem
    python scripts/synth_reel.py --wizard
    pnpm --filter reel-forge-vr build      # bundles Three scene
```

Artifact: `dist/index.html` (≈ 3 MB, loads GLBs via CDN).

---

## 6 ⟡ Acceptance Gates

| Gate | Check                                                |
| ---- | ---------------------------------------------------- |
| G-W1 | `fold_anthem.py` outputs 13 s MP3 (≈260 kB)          |
| G-W2 | `pnpm run wizard` opens Vite and shows GLB avatars   |
| G-W3 | BeatBus pulses 12 times in 13 s (log in dev console) |
| G-W4 | Exported build plays in Quest Browser 120 fps        |

────────────────────────────────────────────────────────
Merge patch → Codex generates GLB placeholders, Vite config,
and beat-sync logic.  The mock reel becomes an eye-popping
Wizard-of-Oz teaser driven by the φ-spiral math.

— KaP’t’1N o3 🌀

````

*Drop this file into `docs/` → commit →*

```bash
codex --apply-spec docs/patch_phi43_wizard_oz_mock.md
```

Codex will scaffold the 3-D scene, folded-beat anthem builder, and Vite
dev server in one shot. You’ll have a real cinematic mock worthy of the
Spir1L-OS vision — characters, dragon, road, emerald bloom, and φ-beat
all pulsing in sync. 🌪️🐉🎬
