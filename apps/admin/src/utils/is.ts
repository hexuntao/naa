import { isNull, isUndefined } from 'lodash';

export const isNullOrUndef = (val: unknown): val is null | undefined => {
  return isNull(val) || isUndefined(val);
};
