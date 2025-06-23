export interface SimOptions {
  peak: number;      // amps over nominal I0
  duration: number;  // seconds
  jitter?: number;   // ± fractional noise (default 0.04)
  kappaTarget?: number; // desired κ threshold (default 0.888)
  tickHz?: number;   // controller tick (default 221)
}

// Simple helper to clamp a value between bounds
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/**
 * Simulates a dual‑coil flux core with a naive PI controller that boosts duty‑cycle
 * if κ_est drops below target. Returns the minimum κ witnessed across the run so
 * that tests can assert κ_min ≥ κ_target.
 */
export function simulatePortal({
  peak,
  duration,
  jitter = 0.04,
  kappaTarget = 0.888,
  tickHz = 221
}: SimOptions): number {
  const dt = 1 / tickHz;
  const totalTicks = Math.floor(duration * tickHz);
  const I0 = 1; // nominal coil current

  let duty = 0.5; // controller output 0..1
  const Kp = 0.9;
  const Ki = 0.3;
  let integ = 0;

  let kappaMin = 10;

  for (let tick = 0; tick < totalTicks; tick++) {
    const t = tick * dt;

    // Base dual‑helix currents (red 13‑start, blue 17‑start)
    const Iplus = peak * Math.sin(13 * 2 * Math.PI * t) * duty;
    const Iminus = peak * Math.sin(17 * 2 * Math.PI * t) * duty;

    // κ_est per spec
    const kappaEst = Math.abs(Iplus + Iminus) / (2 * I0);
    kappaMin = Math.min(kappaMin, kappaEst);

    // Simple PI controller — adjust duty so κ tracks target
    const err = kappaTarget - kappaEst;
    integ += err * dt;
    duty += Kp * err + Ki * integ;
    duty = clamp(duty, 0, 1);

    // Inject small random jitter into peak
    peak = peak * (1 + (Math.random() * 2 - 1) * jitter);
  }

  return kappaMin;
}

// CLI entry‑point for manual smoke tests
if (require.main === module) {
  const args = process.argv.slice(2);
  const num = (flag: string, def: number) => {
    const idx = args.indexOf(flag);
    return idx === -1 ? def : Number(args[idx + 1]);
  };
  const κmin = simulatePortal({
    peak: num('--peak', 1.2),
    duration: num('--duration', 10),
    jitter: num('--jitter', 0.04)
  });
  console.log(`κ_min=${κmin.toFixed(3)}`);
}
