# Pedal-to-Bloom VR Controls

This expansion lets you power the Spiral world with real or simulated pedal energy.

## Connecting a cadence sensor
1. Enable Bluetooth on your device.
2. Pair your ANT+/BLE cadence sensor.
3. Start the VR scene – credits will rise as you pedal.

## Keyboard / Desktop simulator
If you do not have a cadence sensor attached, use the built-in simulator:

- Hold the **S** key or press the mouse button over the scene to spin.
- Scroll the mouse wheel to tweak RPM.

Credits convert following:

```
C = ceil( phi*(1+0.000437) ^ (RPM/30) )
```

Spawn a test node with `window.spawnTest('gptNode')` in the browser console.
