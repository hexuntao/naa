import {
  CrudColumnsType,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  sortColumn,
  statusColumn,
} from '@/components/Crud';
import { Role } from './types';
import { TreeSelect } from 'antd';
import { getMenuList } from '../menu/services';

const Columns: CrudColumnsType<Role>[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    ellipsis: true,
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入角色名称' }],
    },
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true, message: '请输入角色编码' }],
    },
  },
  {
    title: '菜单权限',
    dataIndex: 'menuPermission',
    hideInSearch: true,
    hideInTable: true,
    valueType: 'treeSelect',
    fieldProps: {
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      maxTagCount: 10,
      fieldNames: {
        label: 'menuName',
        value: 'menuId',
      },
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请选择菜单权限',
        },
      ],
    },
    request: async () => {
      const { data } = await getMenuList({ isPremission: true });
      return data;
    },
  },
  /* 状态 */
  statusColumn,
  /* 排序 */
  sortColumn,
  /* 描述 */
  describeColumn,
  /* 创建时间 */
  createTimeColumn,
  /* 创建时间-搜索 */
  createTimeInSearch,
];

export default Columns;
