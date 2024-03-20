import { escape, isEmpty, trim } from 'lodash';
import { IQuery } from './types';
import { explode } from './explode';
import { generateWhereOptions } from './generateWhereOptions';
import { pruneObject } from './pruneObject';

type T = Record<string, any>;

export function newQuery(query?: IQuery): IQuery | undefined {
  if (isEmpty(query)) {
    return undefined;
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
    take: limit,
    skip,
    withDeleted: deleted,
    where: generateWhereOptions(where),
  };

  if (sort) {
    queryOptions.order = { [trim(escape(sort))]: desc ? 'DESC' : 'ASC' };
  }

  if (select) {
    const selectObj: T = {};
    const selectArray = explode(select);

    if (selectArray) {
      selectArray.forEach((x) => (selectObj[x] = true));
      queryOptions.select = selectObj;
    }
  }

  if (load) {
    const loadObj: T = {};
    const loadArray = explode(load);

    if (loadArray) {
      loadArray.forEach((x) => (loadObj[x] = true));
      queryOptions.relations = loadObj;
    }
  }

  return pruneObject(queryOptions);
}
