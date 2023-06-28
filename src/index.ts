import { escape, forIn, isEmpty, isNil, isObject, trim } from 'lodash';
import {
  In,
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Not,
} from 'typeorm';

type T = Record<string, any>;

export function newQuery(query?: T): T {
  if (isEmpty(query)) {
    return query;
  }

  const {
    deleted = false,
    desc,
    limit,
    load,
    select,
    skip,
    sort,
    ...where
  } = query;

  const queryOptions: T = {
    select: explode(select),
    relations: explode(load),
    take: limit,
    skip,
    withDeleted: deleted,
    where: generateWhereOptions(where),
  };

  if (sort) {
    queryOptions.order = { [trim(escape(sort))]: desc ? 'DESC' : 'ASC' };
  }

  return pruneObject(queryOptions);
}

function explode(
  x?: string | number,
  separator = ',',
): string[] | number[] | undefined {
  if (!x) return undefined;
  if (typeof x !== 'string') return [x];
  return x
    .split(separator)
    .map((x) => trim(x))
    .map((x) => escape(x));
}

function pruneObject(obj: T): T {
  if (isNil(obj)) return obj;
  Object.keys(obj).forEach((key) => {
    if (isNil(obj[key]) || obj[key] === '') delete obj[key];
    if (isObject(obj[key]) && isEmpty(obj[key])) delete obj[key];
  });
  return obj;
}

function generateWhereOptions(query?: any): any | undefined {
  if (!query) return undefined;
  forIn(query, (value, key, obj) => {
    if (typeof value !== 'string') return;
    if (value.includes(',')) {
      obj[key] = In(explode(value) as string[]);
    }
    if (value.includes('::')) {
      obj[key] = parseComparator(value);
    }
  });
  return query;
}

function parseComparator(value: string): any {
  const comparator = explode(value, '::');
  switch (comparator[0]) {
    case 'gt':
      return MoreThan(comparator[1]);
      break;
    case 'gte':
      return MoreThanOrEqual(comparator[1]);
      break;
    case 'lt':
      return LessThan(comparator[1]);
      break;
    case 'lte':
      return LessThanOrEqual(comparator[1]);
      break;
    case 'ne':
      return Not(comparator[1]);
      break;
    default:
      return comparator[1];
  }
}
