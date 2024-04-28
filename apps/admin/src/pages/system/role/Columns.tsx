import { CrudColumnsType } from '@/components/Crud';
import { RoleModel } from './model';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';
import { TreeSelect } from 'antd';
import { getOptionTree } from '../menu/services';

const Columns: CrudColumnsType<RoleModel>[] = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
    align: 'center',
    search: false,
    hideInForm: true,
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '权限字符',
    dataIndex: 'roleCode',
    align: 'center',
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  { ...sortColumn, dataIndex: 'roleSort' },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
  {
    title: '菜单权限',
    dataIndex: 'menuIds',
    valueType: 'treeSelect',
    search: false,
    hideInSearch: true,
    hideInTable: true,
    fieldProps: {
      fieldNames: { label: 'menuName', value: 'menuId' },
      maxTagCount: 3,
      treeCheckable: true,
      treeCheckStrictly: true,
      showCheckedStrategy: TreeSelect.SHOW_ALL,
    },
    request: getOptionTree,
  },
];

export default Columns;
