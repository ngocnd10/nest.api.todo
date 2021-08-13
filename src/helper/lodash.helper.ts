import {
  findLastIndex,
  cloneDeep,
  remove,
  union,
  findKey,
  flatten,
  mapValues,
  mapKeys,
  uniqBy,
  groupBy,
  isEmpty,
  take,
  get,
  set,
  concat,
  range,
  isNil,
  isString,
  orderBy,
  debounce,
  pick,
  countBy,
  uniq,
  toNumber,
  find,
  intersection,
  intersectionBy,
  join,
  values,
  sortBy,
  isObject,
  isArray,
  unionBy,
  keyBy,
  template,
  isEqual,
  sortedUniqBy,
  sumBy,
  xor,
  omit,
  invert,
  every,
  partition,
  unset,
  difference,
  compact,
} from 'lodash';

export class LodashHelper {
  static get(...params) {
    return get(params[0], params[1], params[2]);
  }

  static set(...params) {
    return set(params[0], params[1], params[2]);
  }

  static isEmpty(...params) {
    return isEmpty(params[0]);
  }

  static isEqual(...params) {
    return isEqual(params[0], params[1]);
  }

  static isArray(...params) {
    return isArray(params[0]);
  }

  static concat(...params) {
    return concat(params);
  }

  static range(...params) {
    return range(params[0], params[1]);
  }

  static join(...params) {
    return join(params[0], params[1]);
  }

  static isNil(param) {
    return isNil(param);
  }

  static isString(param) {
    return isString(param);
  }

  static isObject(param) {
    return isObject(param);
  }

  static orderBy(...params) {
    return orderBy(params[0], params[1], params[2]);
  }

  static debounce(...params) {
    return debounce(params[0], params[1], params[2]);
  }

  static pick(...params) {
    return pick(params[0], params[1]);
  }

  static countBy(...params) {
    return countBy(params[0], params[1]);
  }

  static groupBy(...params) {
    return groupBy(params[0], params[1]);
  }

  static uniqBy(...params) {
    return uniqBy(params[0], params[1]);
  }

  static uniq(...params) {
    return uniq(params[0]);
  }

  static mapValues(...params) {
    return mapValues(params[0], params[1]);
  }

  static mapKeys(...params) {
    return mapKeys(params[0], params[1]);
  }

  static flatten(...params) {
    return flatten(params[0]);
  }

  static findKey(...params) {
    return findKey(params[0], params[1]);
  }

  static find(...params) {
    return find(params[0], params[1]);
  }

  static union(...params) {
    return union(...params);
  }

  static unionBy(...params) {
    return unionBy(params[0], params[1], params[2]);
  }

  static remove(...params) {
    return remove(params[0], params[1]);
  }

  static cloneDeep(...params) {
    return cloneDeep(params[0]);
  }

  static findLastIndex(...params) {
    return findLastIndex(params[0], params[1], params[2]);
  }

  static toNumber(param) {
    return toNumber(param);
  }

  static intersection(...params) {
    return intersection(...params);
  }

  static take(...params) {
    return take(params[0], params[1]);
  }

  static intersectionBy(...params) {
    return intersectionBy(params[0], params[1], params[2]);
  }

  static values(param) {
    return values(param);
  }

  static invert(param) {
    return invert(param);
  }

  static sortBy(...params) {
    return sortBy(params[0], params[1]);
  }

  static keyBy(...params) {
    return keyBy(params[0], params[1]);
  }

  static template(...params) {
    return template(params[0], params[1]);
  }

  static sortedUniqBy(...params) {
    return sortedUniqBy(params[0], params[1]);
  }

  static sumBy(...params) {
    return sumBy(params[0], params[1]);
  }

  static xor(...params) {
    return xor(params[0], params[1]);
  }

  static omit(...params) {
    return omit(params[0], params[1]);
  }

  static every(...params) {
    return every(params[0], params[1]);
  }

  static partition(...params) {
    return partition(params[0], params[1]);
  }

  static unset(...params) {
    return unset(params[0], params[1]);
  }

  static difference(...params) {
    return difference(params[0], params[1]);
  }

  static compact(...params) {
    return compact(params[0]);
  }
}
