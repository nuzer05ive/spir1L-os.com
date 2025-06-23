import { lex } from '../index';

describe('lexer', () => {
  it('tokenises hello_spiral example', () => {
    const src = '⊕begin\nbreath.in 1\n⊕end';
    const types = lex(src).map(t => t.type);
    expect(types).toEqual([
      'B_BEGIN', 'BREATH', 'NUMBER', 'B_END', 'EOF'
    ]);
  });
});
