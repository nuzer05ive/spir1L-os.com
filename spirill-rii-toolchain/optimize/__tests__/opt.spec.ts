import { parse } from '../../parse';
import { optimize } from '../index';

describe('optimizer', () => {
  it('prunes zero-pause & collapses', () => {
    const src = `⊕begin
breath.pause 0
breath.pause 0
breath.in 1
⊕end`;
    const opt = optimize(parse(src));
    expect(opt.body.length).toBe(1);
    expect(opt.body[0].op).toBe('in');
  });
});
