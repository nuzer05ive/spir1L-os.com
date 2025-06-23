import { simulatePortal } from '../portal-sim';

describe('κ-controller sim', () => {
  it('maintains κ_min ≥ 0.888 over 10s', () => {
    const κmin = simulatePortal({ peak: 1.2, duration: 10, jitter: 0.05 });
    expect(κmin).toBeGreaterThanOrEqual(0.888);
  });
});
