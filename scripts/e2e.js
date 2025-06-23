#!/usr/bin/env node
// Temporary stub: always succeed in CI until real e2e harness lands.
if (process.argv.includes('--scenario') && process.argv.includes('ci')) {
  console.log('e2e stub: CI scenario passed (no tests yet).');
  process.exit(0);
}
console.error('e2e stub: unknown scenario.'); process.exit(1);
