import { describe, expect, it } from 'vitest';
import { generateWhereOptions } from './generateWhereOptions';
import { FindOperator } from 'typeorm';

describe('generateWhereOptions', () => {
  it('should generate TypeORM Where Query', () => {
    const result = generateWhereOptions({ a: 'b' });
    expect(result).toEqual({ a: 'b' });
  });

  it('should handle undefined query', () => {
    const result = generateWhereOptions();
    expect(result).toEqual(undefined);
  });

  it('should handle an In query', () => {
    const result = generateWhereOptions({ a: 'b,c' });
    expect(result).toHaveProperty('a');
    expect(result.a).toBeInstanceOf(FindOperator);
    expect(result.a.value).toEqual(['b', 'c']);
    expect(result.a.type).toEqual('in');
  });

  it('should handle a comparator query', () => {
    const result = generateWhereOptions({ a: 'gt::b' });
    expect(result).toHaveProperty('a');
    expect(result.a).toBeInstanceOf(FindOperator);
    expect(result.a.value).toEqual('b');
    expect(result.a.type).toEqual('moreThan');
  });
});
