#!/usr/bin/env node
/**
 * Simple build driver: lex → parse → emit IR
 * Usage:  node scripts/build-toolchain.js examples/hello_spiral.rii build/hello.ir.json
 */
const { parse, emitIR } = require('../spirill-rii-toolchain/parse');
const fs = require('fs');

const [srcPath, outPath] = process.argv.slice(2);
if (!srcPath || !outPath) {
  console.error('Usage: build-toolchain <src.r  ii> <out.ir.json>');
  process.exit(1);
}
const src = fs.readFileSync(srcPath, 'utf8');
const ast = parse(src);
fs.writeFileSync(outPath, emitIR(ast));
console.log('IR written →', outPath);
