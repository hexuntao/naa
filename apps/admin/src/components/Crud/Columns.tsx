import { STATUS_OPTS, STATUS } from '@/utils';
import { ProColumns, ProFormColumnsType } from '@ant-design/pro-components';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import { reduce, toNumber } from 'lodash';

/**
 * 状态
 */
export const statusColumn: ProColumns & ProFormColumnsType = {
  title: '状态',
  dataIndex: 'status',
  filters: true,
  onFilter: true,
  align: 'center',
  valueEnum: {
    [STATUS.DISABLE]: {
      text: '禁用',
      status: 'Default',
    },
    [STATUS.NORMAL]: {
      text: '正常',
      status: 'Processing',
    },
  },
  fieldProps: {
    options: STATUS_OPTS,
  },
  formItemProps: {
    rules: [{ required: true }],
  },
};

/**
 * 排序
 */
export const sortColumn: ProColumns & ProFormColumnsType = {
  title: '排序',
  dataIndex: 'sort',
  ellipsis: true,
  hideInSearch: true,
  width: 100,
  sorter: true,
  align: 'center',
  valueType: 'digit',
  render: (text) => <Tag>{text}</Tag>,
  tooltip: '排序越大，位置越靠前',
  fieldProps: {
    min: 1,
    max: 9999,
    step: 1,
  },
  initialValue: 1,
  formItemProps: {},
};

export const createTimeColumn: ProColumns & ProFormColumnsType = {
  title: '创建时间',
  dataIndex: 'createdAt',
  valueType: 'dateTime',
  hideInSearch: true,
  hideInTable: true,
  sorter: true,
  align: 'center',
  hideInForm: true,
};

/**
 * @description: 创建时间-搜索
 */
export const createTimeInSearch: ProColumns & ProFormColumnsType = {
  title: '创建时间',
  dataIndex: 'createdAt',
  valueType: 'dateRange',
  hideInTable: true,
  hideInForm: true,
  search: {
    transform: (value) => {
      return {
        start_time: dayjs(value[0]._d).format('YYYY-MM-DD 00:00:00'),
        end_time: dayjs(value[1]._d).format('YYYY-MM-DD 23:59:59'),
      };
    },
  },
};

/**
 * @description: 描述
 */
export const describeColumn: ProColumns & ProFormColumnsType = {
  title: '描述',
  dataIndex: 'describe',
  valueType: 'textarea',
  ellipsis: true,
  align: 'center',
  hideInSearch: true,
};

/**
 *
 */
export const operationColumn: ProColumns = {
  title: '操作',
  valueType: 'option',
  width: 100,
  align: 'right',
  fixed: 'right',
  key: 'option',
};
/**
 * @description: 计算表格滚动长度
 */
export const columnScrollX = (columns: ProColumns[]): number =>
  reduce(columns, (sum: number, record: ProColumns) => sum + (toNumber(record.width) || 100), 0);
