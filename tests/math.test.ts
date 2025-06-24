import { glyphGen } from '../src/generation/glyphGen';
import { phi43 } from '../src/math/constants';
import { describe, it, expect } from 'vitest';

describe('glyphIndex cyclic test', () => {
  it('generates glyphs deterministically', () => {
    const idx = Math.floor(phi43 % 10);
    expect(glyphGen(idx)).toBe(`glyph-${idx}`);
  });
});
