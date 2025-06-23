import { t, TokenType } from './token';

export function lex(source: string) {
  const tokens = [];
  let i = 0, line = 1, col = 1;

  const rules: { re: RegExp; kind?: TokenType; skip?: true }[] = [
    // ── structural glyphs ───────────────────────────
    { re: /⊕begin\b/, kind: 'B_BEGIN' },
    { re: /⊕end\b/,   kind: 'B_END'   },

    // ── keywords ────────────────────────────────────
    { re: /breath\b/, kind: 'BREATH'  },

    // ── punctuation ────────────────────────────────
    { re: /\(/, kind: 'LPAREN' },
    { re: /\)/, kind: 'RPAREN' },
    { re: /,/,  kind: 'COMMA'  },
    { re: /=/,  kind: 'EQ'     },

    // ── numbers & math operators ───────────────────
    { re: /[0-9.]+/,   kind: 'NUMBER' },
    { re: /[+\-*\/]/,  kind: 'OP'     },

    // ── identifiers ────────────────────────────────
    { re: /[A-Za-z_][A-Za-z0-9_]*/, kind: 'IDENT' },

    // ── whitespace ────────────────────────────────
    { re: /\s+/, skip: true },
  ];

  while (i < source.length) {
    let matched = false;
    for (const r of rules) {
      const m = source.slice(i).match(r.re);
      if (m && m.index === 0) {
        if (!r.skip) tokens.push(t(r.kind as TokenType, m[0], line, col));
        const text = m[0];
        const nl = text.match(/\n/g);
        line += nl ? nl.length : 0;
        col  = nl ? text.length - text.lastIndexOf('\n') : col + text.length;
        i   += text.length;
        matched = true;
        break;
      }
    }
    if (!matched) throw new SyntaxError(`Unexpected char "${source[i]}" at ${line}:${col}`);
  }
  tokens.push(t('EOF', '', line, col));
  return tokens;
}
