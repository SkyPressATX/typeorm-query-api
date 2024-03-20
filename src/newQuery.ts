import { escape, isEmpty, trim } from 'lodash';
import { IQuery } from './types';
import { explode } from './explode';
import { generateWhereOptions } from './generateWhereOptions';
import { pruneObject } from './pruneObject';
import {
  Entity,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsSelect,
} from 'typeorm';

export function newQuery<T extends typeof Entity>(
  query?: IQuery,
): FindManyOptions<T> | undefined {
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

  const queryOptions: FindManyOptions = {
    take: limit,
    skip,
    withDeleted: deleted,
    where: generateWhereOptions(where),
  };

  if (sort) {
    queryOptions.order = { [trim(escape(sort))]: desc ? 'DESC' : 'ASC' };
  }

  if (select) {
    const selectObj: Record<string | number, boolean> = {};
    const selectArray = explode(select);

    if (selectArray) {
      selectArray.forEach((x: string | number) => (selectObj[x] = true));
      queryOptions.select = selectObj as FindOptionsSelect<T>;
    }
  }

  if (load) {
    const loadObj: Record<string | number, boolean> = {};
    const loadArray = explode(load);

    if (loadArray) {
      loadArray.forEach((x: string | number) => (loadObj[x] = true));
      queryOptions.relations = loadObj as FindOptionsRelations<T>;
    }
  }

  return pruneObject(queryOptions);
}
