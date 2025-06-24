import { RankDB, reward, ReelMetrics } from '../src/ml/socialRank';

test('top reward', () => {
  const db = new RankDB();
  const a: ReelMetrics = { likes: 10, watch: 100, shares: 1 };
  const b: ReelMetrics = { likes: 5, watch: 50, shares: 10 };
  const c: ReelMetrics = { likes: 2, watch: 20, shares: 0 };
  db.add([1], a);
  db.add([2], b);
  db.add([3], c);
  expect(db.top(1)[0]).toEqual([2]);
});
