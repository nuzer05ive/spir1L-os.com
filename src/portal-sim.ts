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

export function simulatePortal({ peak, duration, jitter, kappaTarget = 0.888 }: SimOptions) {
  const steps = Math.floor(duration * TICK_HZ);
  const I0 = 1;                 // normalised nominal current

  // PID coefficients (from firmware/kappa.cfg)
  const Kp = 0.42;
  const Ki = 0.0068;
  const Kd = 0.0;

  let integral = 0;
  let prevErr  = 0;
  let kappaMin = Infinity;

  const log: number[] = [];

  for (let t = 0; t < steps; t++) {
    // base sine waves (13 / 17-tooth helices)
    const basePlus  = I0 * Math.sin(2 * Math.PI * 13 * t * DT);
    const baseMinus = I0 * Math.sin(2 * Math.PI * 17 * t * DT);

    // add commanded peak offset + random jitter
    const cmd       = peak * (1 + (Math.random() * 2 - 1) * jitter);
    const iPlus     = basePlus  + cmd;
    const iMinus    = baseMinus - cmd;

    const kappaEst  = κEstimate(iPlus, iMinus, I0);
    kappaMin = Math.min(kappaMin, kappaEst);
    log.push(kappaEst);

    // PID control towards kappaTarget (simplified: modulate cmd for next tick)
    const err = kappaTarget - kappaEst;
    integral += err * DT;
    const deriv = (err - prevErr) / DT;
    prevErr = err;

    peak += Kp * err + Ki * integral + Kd * deriv;
    peak = Math.max(0, peak); // clamp
  }

  // write report for CI
  fs.writeFileSync('portal-report.json', JSON.stringify({ kappaMin, samples: log.slice(0, 5) }, null, 2));
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
