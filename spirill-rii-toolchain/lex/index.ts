import { Token, t } from './token';

interface Rule {
  regex: RegExp;
  type: Token['type'] | null;      // null → skip (WS / NL)
  value?(m: RegExpExecArray): string;
}

const rules: Rule[] = [
  { regex: /⊕begin/,  type: 'B_BEGIN' },
  { regex: /⊕end/,    type: 'B_END' },
  { regex: /breath\.(in|out|pause)/,
    type: 'BREATH',
    value: m => m[0] },
  { regex: /[a-zA-Z_][a-zA-Z0-9_]*/, type: 'IDENT' },
  { regex: /\d+(\.\d+)?/,            type: 'NUMBER' },
  { regex: /\(/, type: 'LPAREN' },
  { regex: /\)/, type: 'RPAREN' },
  { regex: /,/,  type: 'COMMA' },
  { regex: /=/,  type: 'EQ' },
  { regex: /\r?\n/, type: null },   // skip newlines
  { regex: /[ \t]+/, type: null }   // skip whitespace
];

export function lex(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0, line = 1, col = 1;

  while (i < source.length) {
    let matched = false;
    const slice = source.slice(i);           // examine from cursor forward
    for (const rule of rules) {
      const m = rule.regex.exec(slice);      // match must start at 0
      if (m && m.index === 0) {
        matched = true;
        const value = rule.value ? rule.value(m) : m[0];
        if (rule.type) tokens.push(t(rule.type, value, line, col));

        const consumed = m[0].length;
        // update line / col counters
        const nl = m[0].match(/\n/g);
        if (nl) {
          line += nl.length;
          col = 1 + consumed - m[0].lastIndexOf('\n') - 1;
        } else {
          col += consumed;
        }
        i += consumed;
        break;
      }
    }
    if (!matched) throw new SyntaxError(`Unexpected char "${source[i]}" at ${line}:${col}`);
  }
  tokens.push(t('EOF', '', line, col));
  return tokens;
}

// CLI helper:  node lex.js examples/hello_spiral.rii
if (require.main === module) {
  const fs = require('fs');
  const src = fs.readFileSync(process.argv[2] || 0, 'utf8');
  console.log(JSON.stringify(lex(src), null, 2));
}
