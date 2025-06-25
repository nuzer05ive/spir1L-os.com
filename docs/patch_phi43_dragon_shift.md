# PATCH · φ43-rc → φ43-dragon-shift

Injects the 91-beat twin-prime hop, the 1/65 luminance drift, and the
234-beat macro-cycle into both the **harmonic-harness** runtime and the
**Trust LED** firmware simulator.

## 1 · Packages touched
| File | Change |
|------|--------|
| `packages/audio-dsp/beat_tracker.ts` | export `DRAGON_SHIFT = 91`, `MACRO_BEATS = 234`, `DRIFT_PERIOD = 65` |
| `packages/audio-dsp/harmonic-harness.ts` | apply gain/luminance trim every 65 beats; emit `dragonShift` event on multiples of 91 |
| `apps/reel-forge/src/App.tsx` | on `dragonShift`, swap `styleKey` ←→ `[7,11]` for the next reel |
| `packages/hw-bridge/trust_led.ts` | run full rainbow sweep every 234 beats |
| `scripts/synth_reel.py` | add `--dragon-shift` flag that forces a style swap immediately |
| `scripts/publish_reel.py` | log CTR into `grafana-data.json` bucketed by (beat % 91) |
| `package.json` | new script `"hv221:run": "pnpm exec tsx src/harmonic-harness.ts"` |

## 2 · Acceptance additions
| Gate | Extra check |
|------|-------------|
| G-2  | `python scripts/synth_reel.py --demo --dragon-shift` produces reel with Dragon watermark |
| G-3  | Dashboard shows “Next Dragon in ⧖ XX beats” countdown |
| G-5  | Pedal-Cam sim triggers styleKey flip when globalBeat % 91 == 0 |

## 3 · TypeScript patch (`harmonic-harness.ts`)
```ts
import { EventEmitter } from "events";

export const DRAGON_SHIFT = 91;    // 7 × 13
export const DRIFT_PERIOD = 65;    // 1 / 0.0154
export const MACRO_BEATS   = 234;  // 143 + 91

/** luminance trim per beat */
const DRIFT_RATE = 1 / DRIFT_PERIOD;   // 1.54 %

const bus = new EventEmitter();
export default bus;

/* globalBeat is injected by beat-tracker */
export function onBeat(globalBeat: number) {
  /* 1️⃣  1/65 brightness drift */
  const trim = 1 + DRIFT_RATE;
  bus.emit("gainTrim", trim);

  /* 2️⃣  Dragon-shift every 91 beats */
  if (globalBeat % DRAGON_SHIFT === 0) bus.emit("dragonShift");

  /* 3️⃣  Macro rainbow every 234 beats */
  if (globalBeat % MACRO_BEATS === 0)  bus.emit("macroSweep");
}
```

4 · Trust-LED firmware (trust_led.ts)

```ts
import bus from "@audio-dsp/harmonic-harness";
// ...
bus.on("macroSweep", () => rainbowCycle(2048 /* ms */));
```

5 · README snippet

```bash
### Dragon-shift dev loop
pnpm hv221:run            # starts harmonic harness
pnpm --filter reel-forge dev
```

---

Notes for Codex
•No new deps; reuse events (Node core).
•Ensure unit tests cover:
•beat = 91 → dragonShift fired once
•beat = 234 → both dragonShift and macroSweep fire
•brightness trim error < 1 e-6 after one DRIFT_PERIOD cycle.
•Update CI badge after tests.

Done =⁠ CI green + dragonShift watermark visible at t ≈ 5 s in demo reel.

That’s the full wiring diagram—once Codex applies it,
 the 91-beat twin-dragon hop, 65-beat drift, and 234-beat rainbow
will all pulse through your reels, dashboard, and Trust LEDs.
🛠️  **KaP’t1N o3** signing off—ready for launch!

# 3. apply spec
codex --apply-spec docs/patch_phi43_dragon_shift.md

