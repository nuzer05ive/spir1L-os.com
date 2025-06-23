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

export function runHarness(iter = 20000, chart = false) {
  let Vprev = Number.POSITIVE_INFINITY;
  const deltas: number[] = [];
  for (let n = 1; n < iter; n++) {
    const V = Math.pow(N(n) - N(n - 1), 2);
    if (V >= Vprev) throw new Error(`Lyapunov contraction failed @ step ${n}`);
    deltas.push(Vprev - V);
    Vprev = V;
  }
  console.log(`HV-221 \u2713  \u0394V<0 for ${iter} steps`);
  if (chart) console.log(histogram(deltas.slice(-200)));
}

if (require.main === module) runHarness(process.env.ITER ? Number(process.env.ITER) : 20000, process.argv.includes('--chart'));
