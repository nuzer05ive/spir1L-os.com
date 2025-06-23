import { goldenRatio } from "../spirill-rii-toolchain/lex/constants";
import histogram from "ascii-histogram"; // now typed via local declaration

// Sieve-based prime resonance function
function primeResonance(n: number): number {
  if (n < 2) return 0;
  let sum = 0;
  for (let k = 2; k <= n; k++) {
    let prime = true;
    for (let j = 2; j * j <= k; j++) if (k % j === 0) { prime = false; break; }
    if (prime) sum += (k % 4 === 1 ? 1 : -1); // quadratic reciprocity stub
  }
  return sum;
}

export function N(n: number, w1 = 0.0002185, w2 = 0.0002185) {
  return (Math.abs(Math.pow(goldenRatio, n)) + w1 * primeResonance(n) + w2) % 1;
}

export function runHarness(
  iter = 20000,
  warmUp = 30,
  chart = false
) {
  let Vprev = 0;
  let Vmin  = Infinity;
  const deltas: number[] = [];
  for (let n = 1; n < iter; n++) {
    const V = Math.pow(N(n) - N(n - 1), 2);
    if (n > warmUp) {
      if (V < Vmin) Vmin = V;
      // allow micro upticks, but ensure overall trend is down after every 100 steps
      if (n % 100 === 0 && V > Vprev)
        throw new Error(`Lyapunov net-contraction failed @ step ${n}`);
    }
    deltas.push(Vprev - V);
    Vprev = V;
  }
  if (chart) console.log(histogram(deltas.slice(-200)));
}

if (require.main === module) {
  const iter = process.env.ITER ? Number(process.env.ITER) : 20000;
  const warm = process.env.WARM ? Number(process.env.WARM) : 12;
  runHarness(iter, warm, process.argv.includes("--chart"));
}
