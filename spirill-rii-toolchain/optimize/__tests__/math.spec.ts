import { parse } from '../../parse';
import { optimize } from '../index';

describe('math folding', () => {
  it('folds 3*φ+2 to scalar', () => {
    const src = '⊕begin\nbreath.in 3*1.618+2\n⊕end';
    const opt = optimize(parse(src));
    expect(opt.body[0].arg).toBeCloseTo(6.854, 3);
  });
});
