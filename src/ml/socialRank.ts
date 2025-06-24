export function rank(vectors: number[][]) {
  return vectors.map((vec, i) => ({ id: i, score: vec.reduce((s, v) => s + v, 0) }));
}
