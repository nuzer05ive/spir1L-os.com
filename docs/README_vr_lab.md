# Mobile VR Controls

This lab showcases the mobile flight and camera system used in **reel-forge-vr**.

![Demo](../assets/mobile-vr-controls.gif)

| Action | Gesture | Notes |
|--------|---------|-------|
| **Free-fly** | Thumb stick or 1‑finger drag | Expo‑in speed curve |
| **Zoom** | Pinch or two‑finger drag | Quad‑in‑out easing |
| **Strafe / Elevate** | Dual‑stick | Falls back to gyro roll |
| **Fine‑nudge** | Tap‑hold + small drag | 1 cm per 2 px |
| **Reset** | Double‑tap empty space | 300 ms fade in |

Launch with:
```bash
pnpm -F reel-forge-vr dev -- --mock on mobile browser
```
