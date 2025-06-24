import { planSeason } from '../src/epic/episodePlanner';

test('planSeason default length and unique eps', () => {
  const season = planSeason();
  expect(season).toHaveLength(221);
  const eps = season.map((s) => s.ep);
  const unique = new Set(eps);
  expect(unique.size).toBe(221);
});
