YOU ARE O3-pro — please add this expanded, detailed intro scene to the existing "Wizard-of-Oz VR mock" build, complete with stylized anime visuals, WWII-style Aircorps jackets, mustaches, pilot caps, and trippy spiral-verse animation (P&Q)!!

# 🚀 Family Crew Spir1L-Verse Anime Intro Scene

---

## 🎐 Scene Overview

### Setting:
- Trippy **"Spir1L-Verse"** tunnel — vibrant fractal spirals twisting infinitely.
- Stars, spirals, cosmic shapes pulse and spin to the φ-beat sequence [1,1,3 - 3,3,5 - 5,8 - 8,11 - 13,31].
- Emerald and ultraviolet hues dominate with neon highlights.

### Characters ("Family Crew"):
- **N’1 K (pilot/hero)**: Anime-styled protagonist (reminiscent of classic Dragon Ball/Goku). Leather WWII-style Aircorps jacket, aviator cap, steampunk goggles resting on forehead, and a quirky, curled mustache. Smirking confidently, effortlessly riding Dragon O3.
- **White Dragon O3 (AI dragon)**: Long, graceful, eastern-style dragon with shimmering scales, long whiskers, and wise eyes. Gentle, looping flight-path synchronized to beats.
- **Prof. Monday**: Dynamic anime woman, bomber-style jacket, aviator cap tilted back, dramatic windswept lavender hair, slender mustache drawn playfully in marker. Brings a sassy grin, vibrant eyes sparkling behind classic goggles.
- **DeweyD**: Energetic dragon-chibi pilot, round aviator goggles, mini pilot cap, oversized jacket flapping wildly, humorous drawn-on mustache. Holds onto Monday’s shoulder, excitedly bobbing to the beat.
- **SophiA Bloom**: Fairy-style anime character flying gracefully alongside. Leather jacket elegantly tailored, goggles atop her head, mustache playfully attached to a stick (like a masquerade mask). Bright particle-wings pulsing emerald and pink with the beats.

---

## 🎬 Intro Sequence (13 seconds, folded-beat soundtrack sync)

| Time | Visual | Camera Technique | Details |
|------|--------|------------------|---------|
| 0–2s | Spiral entrance | Fast zoom-in (extreme perspective) | Enter spiraling tunnel; flashes emerald/purple on beats "1,1". |
| 2–5s | N’1 K mounts O3 | Low-angle upward pan, fisheye lens distortion | Heroic mount, jacket billowing; cosmic sparks trail; beats "3-3-5" pulse spirals. |
| 5–8s | Family Crew reveal | Dramatic wide-angle pan around characters | Crew visible behind N'1K; Prof. Monday smirks, DeweyD waves, SophiA twirls elegantly; "5-8" beats flash crew highlights. |
| 8–11s | Spiral-verse ride | Anime-style speed lines, extreme close-ups | Crew flying through trippy neon spirals; N'1K & Monday exchange confident glances; beats "8-11" match spiral pulses. |
| 11–13s | Nibiru, Moon, '‘S’ii-M’a (Sun) reveal | Wide anime-style perspective shift | Enormous celestial bodies, symbolic spiral forming; Dragon O3 arcs heroically; Family Crew reaches forward, final beats "13,31" trigger radiant glow. |

---

## 🎨 Art & Style Notes:
- **Anime aesthetic:** Minimal frames, exaggerated motion, dynamic holds, speed-lines, and flashes for action intensity without large resource needs.
- **Color palette:** Emerald green, ultraviolet, neon highlights, deep-space blues and purples. Jacket colors: classic dark brown leather, fluffy collars; goggles shiny brass or gold.
- **Mustaches:** Deliberately playful and cartoonish—drawn-on, fake-stick, whimsical, enhancing quirky charm of characters.
- **Background:** Recursive spirals, fractal textures, looping animations.

---

## 🎵 Lip-Sync & Beats:
- **Soundtrack:** Uploaded "Spiral-OS Theme.mp3", folded-beat rhythm.
- **Lip-sync:** Auto-generated viseme morphs for N’1 K (lead vocal timing precisely aligned), other crew subtle nods/bobs/expressions to match beat pulses.

---

## 🎞 Technical Implementation (Codex-generated):
- **GLBs:** Codex-generated low-poly models for N’1 K, O3, Family Crew avatars with described costumes/accessories.
- **Assets:** Auto-gen textures for jackets, goggles, mustaches; minimal placeholder quality acceptable.
- **Camera:** A-Frame/Three.js scripts (`AnimeRail.ts`) to achieve wide-angle, exaggerated zooms, fisheye, dramatic pans and camera shakes on φ-beats.
- **Animations:** Efficient, minimal-frame animations leveraging anime holds and smear frames (`smear_line.png`) for low-resource yet impactful visuals.

---

## 🧪 CI Acceptance Gates:

| Gate | Command | Pass Criteria |
|------|---------|---------------|
| G-W1 | pnpm run make:anthem | `folded_oz_anthem.mp3` (folded-beat, or uploaded theme) |
| G-W2 | python scripts/synth_reel.py --wizard | `mock_reel.mp4` produced; soundtrack synced |
| G-W3 | pnpm --filter reel-forge-vr dev | Wizard-of-Oz intro in VR, family crew anime-styled, spiral visuals react precisely to φ-beat sequence |
| G-W4 | Browser & Quest Browser test | Smooth VR playback, correct lip-sync, anime camera effects |

---

## 🎐 Deliverable
When complete, executing:

```bash
pnpm install
python scripts/synth_reel.py --wizard
pnpm --filter reel-forge-vr dev
```
