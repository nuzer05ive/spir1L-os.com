import { Expr } from '../parse/expr';

export function fold(expr: Expr): number {
  if (expr.kind === 'num') return expr.value;
  const l = fold(expr.left), r = fold(expr.right);
  switch (expr.op) {
    case '+': return l + r;
    case '-': return l - r;
    case '*': return l * r;
    case '/': return l / r;
  }
}
