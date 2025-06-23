import { goldenRatio } from "../spirill-rii-toolchain/lex/constants";

export function N(n: number, S: (k: number) => number, w1 = 0.0002185, w2 = 0.0002185) {
  return (Math.abs(Math.pow(goldenRatio, n)) + w1 * S(n) + w2) % 1;
}

export function runHarness(iter = 20000) {
  let Vprev = 0;
  const S = (k: number) => (k % 2 === 0 ? 1 : -1); // stub prime‑sum resonance
  for (let n = 1; n < iter; n++) {
    const V = Math.pow(N(n, S) - N(n - 1, S), 2);
    if (V - Vprev >= 0) throw new Error("Lyapunov contraction failed at step " + n);
    Vprev = V;
  }
  console.log("HV‑221 passed → ΔV < 0 for", iter, "steps");
}

if (require.main === module) runHarness();
