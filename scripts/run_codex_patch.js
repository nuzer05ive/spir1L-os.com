#!/usr/bin/env node
const { spawnSync } = require('child_process');

const file = process.argv[2];
const key = process.env.SPIRAL_CODEX_KEY || process.env.CODEX_API_KEY;
if (!key) {
  console.log('Codex disabled: missing SPIRAL_CODEX_KEY');
  process.exit(0);
}

const result = spawnSync('npx', ['codex', '--apply-spec', file], { stdio: 'inherit' });
if (result.error) {
  console.error(result.error);
  process.exit(1);
}
spawnSync('git', ['fetch'], { stdio: 'inherit' });
