export function planEpisodes(count = 221) {
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

if (require.main === module) {
  const plan = planEpisodes();
  console.log(JSON.stringify(plan, null, 2));
}
