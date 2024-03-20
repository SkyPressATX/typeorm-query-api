import { describe, expect, it } from 'vitest';
import { newQuery } from './newQuery';

describe('newQuery', () => {
  it('should return undefined for an empty query', () => {
    const result = newQuery({});
    expect(result).toEqual(undefined);
  });

  it('should handle a populated query', () => {
    const result = newQuery({
      deleted: true,
      desc: 'true',
      limit: 10,
      load: 'a,b,c',
      select: 'd,e,f',
      skip: 5,
      sort: 'g',
      a: 'b',
    });
    expect(result).toEqual({
      take: 10,
      skip: 5,
      withDeleted: true,
      where: { a: 'b' },
      order: { g: 'DESC' },
      select: { d: true, e: true, f: true },
      relations: { a: true, b: true, c: true },
    });
  });

  it('should handle a query with no sort', () => {
    const result = newQuery({ a: 'b' });
    expect(result).toEqual({ where: { a: 'b' }, withDeleted: false });
  });

  it('should handle a query with no select', () => {
    const result = newQuery({ a: 'b', load: 'c' });
    expect(result).toEqual({
      where: { a: 'b' },
      relations: { c: true },
      withDeleted: false,
    });
  });

  it('should handle a query with no load', () => {
    const result = newQuery({ a: 'b', select: 'c' });
    expect(result).toEqual({
      where: { a: 'b' },
      select: { c: true },
      withDeleted: false,
    });
  });

  it('should handle a query with no limit', () => {
    const result = newQuery({ a: 'b', limit: 0 });
    expect(result).toEqual({ take: 0, where: { a: 'b' }, withDeleted: false });
  });

  it('should handle a query with no skip', () => {
    const result = newQuery({ a: 'b', skip: 0 });
    expect(result).toEqual({ skip: 0, where: { a: 'b' }, withDeleted: false });
  });

  it('should handle a query with no deleted', () => {
    const result = newQuery({ a: 'b', deleted: false });
    expect(result).toEqual({ where: { a: 'b' }, withDeleted: false });
  });

  it('should handle a query with no desc', () => {
    const result = newQuery({ a: 'b', desc: '' });
    expect(result).toEqual({ where: { a: 'b' }, withDeleted: false });
  });

  it('should handle a query with no where', () => {
    const result = newQuery({ limit: 10, skip: 5 });
    expect(result).toEqual({ take: 10, skip: 5, withDeleted: false });
  });
});
