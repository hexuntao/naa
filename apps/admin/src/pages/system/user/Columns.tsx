import {
  CrudColumnsType,
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
} from '@/components/Crud';
import { TreeSelect } from 'antd';
import { User } from './types';
import { getRoleList } from '../role/services';
import { getOrgList } from '../org/services';
import { getJobList } from '../job/services';

const Columns: CrudColumnsType<User>[] = [
  {
    dataIndex: 'avatarUrl',
    title: '头像',
    valueType: 'image',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    dataIndex: 'userName',
    valueType: 'text',
    title: '用户名',
    ellipsis: true,
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
    },
  },
  {
    dataIndex: 'workNo',
    valueType: 'text',
    title: '工号',
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入工号',
        },
      ],
    },
  },
  {
    dataIndex: 'nickName',
    valueType: 'text',
    title: '姓名',
    ellipsis: true,
    hideInSearch: true,
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入昵称',
        },
      ],
    },
  },
  {
    dataIndex: 'age',
    valueType: 'digit',
    title: '年龄',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请输入年龄',
        },
      ],
    },
  },
  {
    dataIndex: 'sex',
    title: '性别',
    valueEnum: {
      0: {
        text: '女',
      },
      1: {
        text: '男',
      },
      2: {
        text: '保密',
      },
    },
    formItemProps: {
      // initialValue: '1',
      rules: [
        {
          required: true,
          message: '请选择性别',
        },
      ],
    },
  },
  {
    dataIndex: 'phone',
    title: '手机号',
    fieldProps: {
      showCount: true,
      maxLength: 11,
    },
    formItemProps: {
      rules: [
        { required: true, whitespace: true },
        {
          pattern: /^1\d{10}$/,
          message: '请输入正确手机号码',
        },
      ],
    },
  },
  {
    dataIndex: 'email',
    title: '电子邮箱',
    hideInSearch: true,
    fieldProps: {
      showCount: true,
      maxLength: 50,
    },
    formItemProps: {
      rules: [
        {
          type: 'email',
          message: '请输入电子邮箱',
          whitespace: true,
        },
      ],
    },
  },
  {
    dataIndex: 'roleId',
    title: '所属角色',
    valueType: 'select',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择所属角色',
        },
      ],
    },
    fieldProps: {
      fieldNames: { label: 'roleName', value: 'roleId' },
    },
    request: async () => {
      const { data } = await getRoleList({ current: 1, pageSize: 9999 });
      return data.list;
    },
  },
  {
    title: '所属组织',
    dataIndex: 'orgId',
    valueType: 'treeSelect',
    fieldProps: {
      multiple: false,
      treeCheckable: false,
      showCheckedStrategy: TreeSelect.SHOW_ALL,
      fieldNames: {
        label: 'orgName',
        value: 'orgId',
      },
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
    title: '所属岗位',
    dataIndex: 'jobId',
    valueType: 'treeSelect',
    fieldProps: {
      multiple: false,
      treeCheckable: false,
      showCheckedStrategy: TreeSelect.SHOW_ALL,
      fieldNames: {
        label: 'jobName',
        value: 'jobId',
      },
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择所属岗位' }],
    },
    request: async () => {
      const { data } = await getJobList();
      return data;
    },
  },
  {
    dataIndex: 'city',
    title: '所属城市',
    valueType: 'cascader',
    hideInSearch: true,
    hideInTable: true,
    fieldProps: {
      options: [],
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择所属城市' }],
    },
  },
  {
    dataIndex: 'motto',
    title: '座右铭',
    hideInSearch: true,
    hideInTable: true,
    valueType: 'textarea',
    fieldProps: {
      showCount: true,
      maxLength: 120,
    },
  },
  {
    dataIndex: 'address',
    title: '地址',
    hideInSearch: true,
    hideInTable: true,
    valueType: 'textarea',
    fieldProps: {
      showCount: true,
      maxLength: 200,
      rows: 4,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入地址' }],
    },
  },
  /* 状态 */
  statusColumn,
  /* 排序 */
  sortColumn,
  /* 创建时间 */
  createTimeColumn,
  /* 创建时间-搜索 */
  createTimeInSearch,
];

export default Columns;
