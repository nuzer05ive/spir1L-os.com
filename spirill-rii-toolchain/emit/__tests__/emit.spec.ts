import { encodeIR } from '../index';
test('encodes BI 3', () => {
  expect(Array.from(encodeIR([{op:'bi',arg:3}]).slice(4,6))).toEqual([1,3]);
});
