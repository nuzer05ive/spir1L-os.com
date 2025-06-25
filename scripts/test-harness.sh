#!/usr/bin/env bash
set -euo pipefail
pnpm install
pnpm test
node scripts/e2e.js --scenario ci

