import fs from 'fs';

export interface SimOptions {
  peak: number;      // amps over nominal I0
  duration: number;  // seconds
  jitter: number;    // ± fraction of peak per tick
  kappaTarget?: number; // κ_target (default 0.888)
}

const TICK_HZ = 221;           // flux-core tick rate
const DT      = 1 / TICK_HZ;

export function κEstimate(iPlus: number, iMinus: number, i0: number): number {
  return Math.abs(iPlus + iMinus) / (2 * i0);
}

export function simulatePortal(opts: SimOptions): number {
  const { peak, duration, jitter = 0.05, kappaTarget = 0.888 } = opts;
  const totalTicks = duration * TICK_HZ;
  let kappaMin = 1;

  let integral = 0;
  let errorPrev = 0;

  for (let t = 0; t < totalTicks; t++) {
    // simple sinusoidal coil currents with jitter
    const Iplus = peak * Math.sin((2 * Math.PI * t) / 13) * (1 + (Math.random() - 0.5) * jitter);
    const Iminus = peak * Math.sin((2 * Math.PI * t) / 17) * (1 + (Math.random() - 0.5) * jitter);

    const kappaEst = Math.abs(Iplus + Iminus) / (2 * peak);
    kappaMin = Math.min(kappaMin, kappaEst);

    // basic PID dampers (Kp 0.6 Ki 0.1 Kd 0.01)
    const error = kappaTarget - kappaEst;
    integral += error;
    const derivative = error - errorPrev;
    const control = 0.6 * error + 0.1 * integral + 0.01 * derivative;

    // apply control by nudging peak up/down (bounded 0.5–peak)
    const adj = Math.max(0.5 * peak, Math.min(1.5 * peak, peak + control));
    // in this stub we don’t actually feed adj back, but could
    errorPrev = error;
  }

  return kappaMin;
}

if (require.main === module) {
  const argv = process.argv;
  const peak      = parseFloat(argv[argv.indexOf('--peak') + 1] || '1.2');
  const duration  = parseFloat(argv[argv.indexOf('--duration') + 1] || '10');
  const jitter    = parseFloat(argv[argv.indexOf('--jitter') + 1] || '0.05');

  const κmin = simulatePortal({ peak, duration, jitter });
  console.log(`κ_min = ${κmin.toFixed(3)}`);
}
