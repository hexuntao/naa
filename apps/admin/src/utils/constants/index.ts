/*
 * 全局常量数据
 */

import { LabeledValue } from 'antd/es/select';

import { FLAG, SEX, STATUS } from '../enums';

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

/**
 * @description: 是否
 */
export const FLAG_OPTS: LabeledValue[] = [
  {
    label: '是',
    value: FLAG.YES,
  },
  {
    label: '否',
    value: FLAG.NO,
  },
];

/**
 * @description: 性别
 */
export const SEX_OPTS: LabeledValue[] = [
  {
    label: '女',
    value: SEX.FEMALE,
  },
  {
    label: '男',
    value: SEX.MALE,
  },
  {
    label: '保密',
    value: SEX.PRIVACY,
  },
];
