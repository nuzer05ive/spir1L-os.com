import * as N from '../parse/node';

export function optimize(ast: N.Script): N.Script {
  const body: N.BreathCall[] = [];
  for (const stmt of ast.body) {
    if (stmt.op === 'pause' && stmt.arg === 0) continue;              // prune
    if (stmt.op === 'pause' && body.at(-1)?.op === 'pause') continue; // collapse
    body.push(stmt);
  }
  return { ...ast, body };
}

export function emitIRv2(ast: N.Script) {
  return JSON.stringify(
    ast.body.map(b => ({
      op: b.op === 'in' ? 'bi' : b.op === 'out' ? 'bo' : 'bp',
      arg: b.arg
    })),
    null,
    2
  );
}
