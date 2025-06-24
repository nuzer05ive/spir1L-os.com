export interface ReelMetrics {
  likes: number;
  watch: number;
  shares: number;
}

export function reward(m: ReelMetrics): number {
  return (m.likes + 2 * m.shares) / m.watch;
}

export class RankDB {
  private data: { vec: number[]; metrics: ReelMetrics }[] = [];

  add(vec: number[], r: ReelMetrics) {
    this.data.push({ vec, metrics: r });
  }

  top(n: number): number[][] {
    return [...this.data]
      .sort((a, b) => reward(b.metrics) - reward(a.metrics))
      .slice(0, n)
      .map(d => d.vec);
  }
}
