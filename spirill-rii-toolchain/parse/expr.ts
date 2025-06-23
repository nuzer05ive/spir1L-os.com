import { Token } from './token';

export type Expr = NumLit | Bin;
export interface NumLit { kind: 'num'; value: number }
export interface Bin { kind: 'bin'; op: '+'|'-'|'*'|'/'; left: Expr; right: Expr }

export function parseExpr(tokens: Token[], i = 0): [Expr, number] {
  function lbp(tok: Token): number {
    if (!tok || tok.kind !== 'op') return 0;
    return tok.lexeme === '+' || tok.lexeme === '-' ? 1 : 2;
  }
  let [left, pos] = parsePrimary(tokens, i);
  while (lbp(tokens[pos]) > 0) {
    const opTok = tokens[pos++];
    let [right, next] = parsePrimary(tokens, pos);
    while (lbp(tokens[next]) > lbp(opTok)) {
      const [rhs2, after] = parseExpr(tokens, next);
      right = rhs2; next = after;
    }
    left = { kind: 'bin', op: opTok.lexeme as any, left, right };
    pos = next;
  }
  return [left, pos];
}

function parsePrimary(tokens: Token[], i: number): [Expr, number] {
  const tok = tokens[i];
  if (tok.kind === 'num') return [{ kind: 'num', value: Number(tok.lexeme) }, i+1];
  throw new SyntaxError(`Expected number at ${tok.line}:${tok.col}`);
}
