import { isNil, isObject, isEmpty } from 'lodash';

export function pruneObject<T extends Record<string, any>>(obj: T): T {
  if (isNil(obj)) return obj;

  Object.keys(obj).forEach((key) => {
    if (isNil(obj[key]) || obj[key] === '') delete obj[key];
    if (isObject(obj[key]) && isEmpty(obj[key])) delete obj[key];
  });
  return obj;
}
