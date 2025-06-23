interface SimOptions {
  peak: number;
  duration: number;
}

export function simulatePortal({ peak, duration }: SimOptions) {
  console.log(`Simulating portal with peak ${peak} for ${duration} seconds`);
  // TODO: portal resonance simulation algorithm
}

if (require.main === module) {
  const peak = parseFloat(process.argv[process.argv.indexOf("--peak") + 1] || "1");
  const duration = parseInt(process.argv[process.argv.indexOf("--duration") + 1] || "5", 10);
  simulatePortal({ peak, duration });
}
