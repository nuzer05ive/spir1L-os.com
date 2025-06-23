import { runHarness } from "../harmonic-harness";

describe('HV221 Lyapunov harness', () => {
  it('net-contracts for 2\u00a0000 steps', () => {
    expect(() => runHarness(2000, 30)).not.toThrow();
  });
});
