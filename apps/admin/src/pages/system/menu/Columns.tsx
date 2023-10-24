import {
  CrudColumnsType,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  sortColumn,
  statusColumn,
} from '@/components/Crud';
import { TreeSelect } from 'antd';
import { Menu, MenuTypes } from './types';
import { getMenuList } from './services';
import { MENU_TYPE } from '@/utils';

/**
 * @description: 菜单类型配置项
 */
export const MenuTypeEnum: Record<MenuTypes, string> = {
  [MENU_TYPE.DIR]: 'dir',
  [MENU_TYPE.MENU]: 'menu',
  [MENU_TYPE.BUTTON]: 'button',
};

const Columns: CrudColumnsType<Menu>[] = [
  {
    title: '上级',
    dataIndex: 'parentId',
    hideInSearch: true,
    hideInTable: true,
    valueType: 'treeSelect',
    fieldProps: {
      multiple: false,
      treeCheckable: false,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      fieldNames: {
        label: 'menuName',
        value: 'menuId',
      },
    },
    request: async () => {
      const { data } = await getMenuList({ isPremission: true });
      return data;
    },
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    valueEnum: { ...MenuTypeEnum },
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true, message: '请选择菜单类型' }],
    },
  },
  {
    title: '菜单名称',
    dataIndex: 'name',
    ellipsis: true,
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入菜单名称' }],
    },
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    ellipsis: true,
    tooltip: '权限标识是唯一的，用于做路由的权限管理',
    fieldProps: {
      showCount: true,
      maxLength: 100,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入权限标识' }],
    },
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    hideInSearch: true,
    fieldProps: {
      showCount: true,
      maxLength: 100,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入路由地址' }],
    },
  },
  {
    title: '图标',
    dataIndex: 'icon',
    hideInSearch: true,
    fieldProps: {
      showCount: true,
      maxLength: 20,
    },
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    hideInSearch: true,
    fieldProps: {
      showCount: true,
      maxLength: 200,
    },
  },
  {
    title: '重定向',
    dataIndex: 'redirect',
    hideInSearch: true,
    fieldProps: {
      showCount: true,
      maxLength: 100,
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
