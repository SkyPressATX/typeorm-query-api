import { describe, expect, it } from 'vitest';
import { parseComparator } from './parseComparator';
import { FindOperator } from 'typeorm';

describe('parseComparator', () => {
  it('should handle a greater than comparator', () => {
    const result = parseComparator('gt::a');
    expect(result).toBeInstanceOf(FindOperator);
    expect(result.value).toEqual('a');
    expect(result.type).toEqual('moreThan');
  });

  it('should handle a greater than or equal to comparator', () => {
    const result = parseComparator('gte::a');
    expect(result).toBeInstanceOf(FindOperator);
    expect(result.value).toEqual('a');
    expect(result.type).toEqual('moreThanOrEqual');
  });

  it('should handle a less than comparator', () => {
    const result = parseComparator('lt::a');
    expect(result).toBeInstanceOf(FindOperator);
    expect(result.value).toEqual('a');
    expect(result.type).toEqual('lessThan');
  });

  it('should handle a less than or equal to comparator', () => {
    const result = parseComparator('lte::a');
    expect(result).toBeInstanceOf(FindOperator);
    expect(result.value).toEqual('a');
    expect(result.type).toEqual('lessThanOrEqual');
  });

  it('should handle a not equal to comparator', () => {
    const result = parseComparator('ne::a');
    expect(result).toBeInstanceOf(FindOperator);
    expect(result.value).toEqual('a');
    expect(result.type).toEqual('not');
  });

  it('should handle a default comparator', () => {
    const result = parseComparator('a::b');
    expect(result).toEqual('b');
  });
});
