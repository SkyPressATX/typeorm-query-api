import {
  MoreThan,
  MoreThanOrEqual,
  LessThan,
  LessThanOrEqual,
  Not,
} from 'typeorm';
import { explode } from './explode';

export function parseComparator(value: string): any {
  const comparator = explode(value, '::');
  if (!comparator) return value;
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
