import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { getDictData, cache, dictMap } from './dict';
import { Tag } from 'antd';
import { DictTag } from '@/components/Dict';
import { DictTypeEnum } from '@/enums/dictEnum';

//
const statusType = DictTypeEnum.SYS_NORMAL_DISABLE;

/**
 * 状态
 */
export const statusColumn: ProColumns & ProFormColumnsType = {
  title: '状态',
  dataIndex: 'status',
  filters: true,
  onFilter: true,
  align: 'center',
  valueType: 'select',
  fieldProps: {},
  formItemProps: {
    rules: [{ required: true }],
  },
  hideInForm: true,
  render: (_, record, index, action, schema) => {
    const statusKey = `${schema.dataIndex || 'status'}`;
    return (
      dictMap[statusType] && <DictTag options={dictMap[statusType]} value={record[statusKey]} />
    );
  },
  request: async () => {
    if (!cache.has(statusType)) {
      cache.add(statusType);
      const data = await getDictData(statusType).catch(() => {
        cache.delete(statusType);
      });
      dictMap[statusType] = data;
      return data || [];
    }
    return dictMap[statusType] || [];
  },
};

/**
 * 状态 - 表单
 */
export const statusInForm: ProColumns & ProFormColumnsType = {
  ...statusColumn,
  valueType: 'radio',
  hideInTable: true,
  hideInSearch: true,
  hideInForm: false,
  fieldProps: {},
  initialValue: '1',
  formItemProps: {
    rules: [{ required: true }],
  },
  request: async () => {
    if (!dictMap[statusType]) {
      return await getDictData(statusType);
    }
    return dictMap[statusType] || [];
  },
};

/**
 * 排序
 */
export const sortColumn: ProColumns & ProFormColumnsType = {
  title: '排序',
  dataIndex: 'postSort',
  ellipsis: true,
  hideInSearch: true,
  // width: 100,
  sorter: false,
  align: 'center',
  valueType: 'digit',
  initialValue: 1,
  // tooltip: '排序越大，位置越靠前',
  fieldProps: {
    min: 0,
    max: 9999,
    step: 1,
    precision: 0,
    style: {
      width: '100%',
    },
  },
  formItemProps: {},
  render: (text) => text && <Tag>{text}</Tag>,
};

/**
 * 创建时间
 */
export const createTimeColumn: ProColumns & ProFormColumnsType = {
  title: '创建时间',
  dataIndex: 'createTime',
  valueType: 'dateTime',
  hideInSearch: true,
  hideInTable: false,
  hideInForm: true,
  sorter: false,
  align: 'center',
};

/**
 * 创建时间 - 搜索
 */
export const createTimeInSearch: ProColumns & ProFormColumnsType = {
  title: '创建时间',
  dataIndex: 'createTime',
  valueType: 'dateRange',
  hideInSearch: false,
  hideInTable: true,
  hideInForm: true,
  // search: {
  //   transform: (value) => {
  //     return {
  //       start_time: value[0],
  //       end_time: value[1]
  //     };
  //   },
  // },
};
