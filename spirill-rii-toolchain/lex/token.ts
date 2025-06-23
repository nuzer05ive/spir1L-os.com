export type TokenType =
  | 'B_BEGIN' | 'B_END'
  | 'BREATH'  | 'IDENT' | 'NUMBER'
  | 'LPAREN'  | 'RPAREN' | 'COMMA' | 'EQ'
  | 'op' | 'OP' | 'OP' | 'OP' | 'EOF';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  col: number;
}

export function t(type: TokenType, value = '', line = 0, col = 0): Token {
  return { type, value, line, col };
}
