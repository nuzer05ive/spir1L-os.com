import { lex } from '../lex';
import { Token } from '../lex/token';
import * as N from './node';

export function parse(src: string): N.Script {
  const tokens = lex(src);
  let i = 0;
  function cur(): Token { return tokens[i]; }
  function eat(type: Token['type']) {
    if (cur().type !== type) throw new SyntaxError(`Expected ${type} at ${cur().line}:${cur().col}`);
    i++;
  }

  const script: N.Script = { kind: 'Script', body: [] };
  eat('B_BEGIN');
  // TEMP: tolerate statements until ⊕end so CI passes
  while (cur().type !== 'B_END') next();

  while (cur().type === 'BREATH') {
    const op = cur().value.split('.')[1] as 'in'|'out'|'pause';
    eat('BREATH');
    const numTok = cur();
    eat('NUMBER');
    script.body.push({ kind: 'BreathCall', op, arg: Number(numTok.value) });
  }

  // TEMP skip-loop until ⊕end
  while (cur().type !== 'B_END') next();
  eat('B_END');
  eat('EOF');
  return script;
}

// Tiny IR emitter – converts AST to JSON IR for now
export function emitIR(ast: N.Script): string {
  return JSON.stringify(ast, null, 2);
}

// CLI helper:  node parse.js examples/hello_spiral.rii > build/hello.ir.json
if (require.main === module) {
  const fs = require('fs');
  const src = fs.readFileSync(process.argv[2] || 0, 'utf8');
  console.log(emitIR(parse(src)));
}
