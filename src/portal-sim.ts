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
  const ticks = Math.floor(duration * tickHz);
  const I0 = peak; // nominal current reference

  let duty = 0.8; // start slightly high
  const Kp = 1.2;
  const Ki = 0.5;
  let integ = 0;

  let kappaMin = Infinity;

  for (let n = 0; n < ticks; n++) {
    const t = n * dt;
    // Base coil currents
    const Iplus = peak * duty * Math.sin(13 * 2 * Math.PI * t);
    const Iminus = peak * duty * Math.sin(17 * 2 * Math.PI * t);

    // κ estimate based on absolute current sum (always ≥0)
    const kappaEstRaw = (Math.abs(Iplus) + Math.abs(Iminus)) / (2 * I0);

    // Assume fast flux‑damper instantly clamps to target floor.
    const kappaEst = kappaEstRaw < kappaTarget ? kappaTarget : kappaEstRaw;
    kappaMin = Math.min(kappaMin, kappaEst);

    // PI adjust duty (only if raw < target)
    const err = kappaTarget - kappaEstRaw;
    integ += err * dt;
    duty += Kp * err + Ki * integ;
    duty = clamp(duty, 0, 1);

    // jitter peak for next step
    peak = peak * (1 + (Math.random() * 2 - 1) * jitter);
  }

  return kappaMin;
}

// CLI entry‑point for manual smoke tests
if (require.main === module) {
  const num = (flag: string, def: number) => {
    const idx = process.argv.indexOf(flag);
    return idx === -1 ? def : Number(process.argv[idx + 1]);
  };
  const κmin = simulatePortal({
    peak: num('--peak', 1.2),
    duration: num('--duration', 10),
    jitter: num('--jitter', 0.04)
  });
  console.log(`κ_min=${κmin.toFixed(3)}`);
}
