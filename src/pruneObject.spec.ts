import { describe, it, expect } from 'vitest';
import { pruneObject } from './pruneObject';

describe('pruneObject', () => {
  it('should prune undefined values', () => {
    const obj = {
      a: 'a',
      b: undefined,
      c: '',
      d: null,
      e: 0,
      f: {},
      g: [],
    };

    expect(pruneObject(obj)).toEqual({ a: 'a', e: 0 });
  });

  it('should handle an empty object', () => {
    const obj = {};
    expect(pruneObject(obj)).toEqual({});
  });
});
