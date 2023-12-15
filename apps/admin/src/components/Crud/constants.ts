import { LabeledValue } from 'antd/es/select';

import { STATUS } from './enums';

/**
/**
 * @description: 状态
 */
export const STATUS_OPTS: LabeledValue[] = [
  {
    label: '正常',
    value: STATUS.NORMAL,
  },
  {
    label: '禁用',
    value: STATUS.DISABLE,
  },
];
