import { forIn } from 'lodash';
import { In } from 'typeorm';
import { explode } from './explode';
import { parseComparator } from './parseComparator';

export function generateWhereOptions(query?: any): any | undefined {
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
