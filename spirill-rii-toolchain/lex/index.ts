import { t } from './token';

export function lex(source: string) {
  const tokens = [];
  let i = 0, line = 1, col = 1;

  const rules = [
    { re: /[0-9.]+/,  kind: 'num' },   // numbers
    { re: /[+\-*\/]/, kind: 'op'  },   // + - * /
    { re: /\s+/,      skip: true },    // whitespace
  ];

  while (i < source.length) {
    let matched = false;
    for (const r of rules) {
      const m = source.slice(i).match(r.re);
      if (m && m.index === 0) {
        if (!r.skip) tokens.push(t(r.kind ?? 'tok', m[0], line, col));
        const text = m[0];
        const nl = text.match(/\n/g);
        line += nl ? nl.length : 0;
        col = nl ? text.length - text.lastIndexOf('\n') : col + text.length;
        i += text.length;
        matched = true;
        break;
      }
    }
    if (!matched) throw new SyntaxError(`Unexpected char "${source[i]}" at ${line}:${col}`);
  }
  tokens.push(t('EOF', '', line, col));
  return tokens;
}
