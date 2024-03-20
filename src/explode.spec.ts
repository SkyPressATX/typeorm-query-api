import { describe, it, expect } from 'vitest';
import { explode } from './explode';

describe('explode', () => {
  it('should properly explode a string', () => {
    const result = explode('a,b,c');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('should wrap a number as an array', () => {
    const result = explode(1);
    expect(result).toEqual([1]);
  });

  it('should handle an undefined input', () => {
    const result = explode(undefined);
    expect(result).toBeUndefined();
  });

  it('should handle an empty input', () => {
    const result = explode('');
    expect(result).toBeUndefined();
  });

  it('should handle a wonky formatted string', () => {
    const result = explode(' a, b ,c');
    expect(result).toEqual(['a', 'b', 'c']);
  });
});
