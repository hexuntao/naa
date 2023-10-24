import {
  CrudColumnsType,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  sortColumn,
} from '@/components/Crud';
import { TreeSelect } from 'antd';
import { Job } from './types';
import { getJobList } from './services';
import { getOrgList } from '../org/services';
import { getUserList } from '../user/services';

const Columns: CrudColumnsType<Job>[] = [
  {
    title: '上级',
    dataIndex: 'parentId',
    hideInTable: true,
    hideInSearch: true,
    tooltip: '不选默认为顶级',
    valueType: 'treeSelect',
    fieldProps: {
      multiple: false,
      treeCheckable: false,
      fieldNames: {
        label: 'jobName',
        value: 'jobId',
      },
    },
    request: async () => {
      const { data } = await getJobList();
      return data;
    },
  },
  {
    title: '岗位名称',
    dataIndex: 'jobName',
    ellipsis: true,
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入岗位名称' }],
    },
  },
  {
    title: '所属组织',
    dataIndex: 'orgId',
    valueType: 'treeSelect',
    fieldProps: {
      multiple: false,
      treeCheckable: false,
      fieldNames: {
        label: 'orgName',
        value: 'orgId',
      },
      treeNodeFilterProp: 'orgName',
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择所属组织' }],
    },
    request: async () => {
      const { data } = await getOrgList();
      return data;
    },
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    align: 'center',
    hideInSearch: true,
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true, message: '请选择负责人' }],
    },
    valueType: 'select',
    fieldProps: {
      fieldNames: {
        label: 'cnName',
        value: 'userId',
      },
    },
    request: async () => {
      const { data } = await getUserList({ current: 1, pageSize: 9999 });
      return data.list;
    },
  },
  /* 状态 */
  // statusColumn,
  /* 排序 */
  sortColumn,
  /* 创建时间 */
  createTimeColumn,
  /* 创建时间-搜索 */
  createTimeInSearch,
  /* 描述 */
  describeColumn,
];

export default Columns;
