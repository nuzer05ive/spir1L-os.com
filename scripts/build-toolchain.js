#!/usr/bin/env node
/**
 * Build driver:  lex → parse → optimize → emitIRv2
 * Usage:  node scripts/build-toolchain.js <src.r ii> <out.ir.json>
 */
require('ts-node/register');

const fs = require('fs');
const { parse } = require('../spirill-rii-toolchain/parse');
const { optimize, emitIRv2 } = require('../spirill-rii-toolchain/optimize');

// --- arg handling -----------------------------------------------------------
const [srcPath, outPath] = process.argv.slice(2);
if (!srcPath || !outPath) {
  console.error('Usage: build-toolchain <src.r ii> <out.ir.json>');
  process.exit(1);
}

// --- pipeline ---------------------------------------------------------------
const src   = fs.readFileSync(srcPath, 'utf8');
const ast   = parse(src);
const opt   = optimize(ast);
const irStr = emitIRv2(opt);

fs.writeFileSync(outPath, irStr);
console.log('IR written →', outPath);
