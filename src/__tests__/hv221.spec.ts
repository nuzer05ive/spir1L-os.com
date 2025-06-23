import { runHarness } from "../harmonic-harness";

describe('HV221 Lyapunov harness', () => {
  it('contracts for 2\u00a0000 steps after warm-up', () => {
    expect(() => runHarness(2000, 12)).not.toThrow();
  });
});
