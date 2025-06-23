import { parse } from '../index';

describe('parser', () => {
  it('builds AST for hello_spiral', () => {
    const src = '⊕begin\nbreath.in 1\n⊕end';
    const ast = parse(src);
    expect(ast.body.length).toBe(1);
    expect(ast.body[0]).toEqual({ kind:'BreathCall', op:'in', arg:1 });
  });
});
