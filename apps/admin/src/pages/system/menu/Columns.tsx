import { CrudColumnsType } from '@/components/Crud';
import { MenuModel } from './model';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';
import { Icon } from '@umijs/max';
import { getOptionTree } from './services';
import { cache, dictMap, getDictData } from '@/models/dict';
import { DictTag } from '@/components/Dict';
import { DictTypeEnum } from '@/enums/dictEnum';
import { IconPicker } from '@/components/Icon';
import { AppstoreOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-components';

export type MenuType = { label: string; value: 'M' | 'C' | 'F' };
export const menuTypeOptions: MenuType[] = [
  { label: '目录', value: 'M' },
  { label: '菜单', value: 'C' },
  { label: '按钮', value: 'F' },
];

const yesNoType = DictTypeEnum.SYS_YES_NO;

const iconColumn: CrudColumnsType<MenuModel> = {
  title: '菜单图标',
  dataIndex: 'icon',
  fieldProps: (formRef: ProFormInstance<MenuModel>) => {
    return {
      addonBefore: (
        <IconPicker
          onChange={(value) => {
            console.log(value, formRef);
            formRef.setFieldValue('icon', value);
          }}
        >
          <AppstoreOutlined />
        </IconPicker>
      ),
    };
  },
};

const pathColumn: CrudColumnsType<MenuModel> = {
  title: '路由地址',
  dataIndex: 'path',
  tooltip: '访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头',
  formItemProps: {
    rules: [{ max: 255 }],
  },
  search: false,
  hideInTable: true,
};

const componentColumn: CrudColumnsType<MenuModel> = {
  title: '组件路径',
  dataIndex: 'component',
  tooltip: '访问的组件路径，如：`system/user/index`，默认在`pages`目录下',
  formItemProps: {
    rules: [{ max: 255 }],
  },
};

const queryColumn: CrudColumnsType<MenuModel> = {
  title: '路由参数',
  dataIndex: 'query',
  tooltip: '访问路由的默认传递参数，如：`{"id": 1, "name": "name"}`',
  formItemProps: {
    rules: [{ max: 255 }],
  },
};

const permissionColumn: CrudColumnsType<MenuModel> = {
  title: '权限标识',
  dataIndex: 'permission',
  tooltip: "控制器中定义的权限字符，如：@RequirePermissions('system:operlog:remove')",
};

const baseYesNoColumn: CrudColumnsType<MenuModel> = {
  search: false,
  hideInTable: true,
  valueType: 'radio',
  initialValue: '0',
  formItemProps: {
    rules: [{ required: true }],
  },
  render: (_, record, index, action, schema) => {
    const key = `${schema.dataIndex || 'status'}`;
    return dictMap[yesNoType] && <DictTag options={dictMap[yesNoType]} value={key} />;
  },
  request: async () => {
    if (!cache.has(yesNoType)) {
      cache.add(yesNoType);
      const data = await getDictData(yesNoType).catch(() => {
        cache.delete(yesNoType);
      });
      dictMap[yesNoType] = data;
      return data || [];
    }
    return dictMap[yesNoType] || [];
  },
};

const isVisibleColumn: CrudColumnsType<MenuModel> = {
  title: '是否显示',
  dataIndex: 'isVisible',
  tooltip: '选择隐藏则路由将不会出现在侧边栏，但仍然可以访问',
  ...baseYesNoColumn,
  initialValue: '1',
};

const isLinkColumn: CrudColumnsType<MenuModel> = {
  title: '是否外链',
  dataIndex: 'isLink',
  tooltip: '选择是外链则路由地址需要以`http(s)://`开头',
  ...baseYesNoColumn,
};

const isFrameColumn: CrudColumnsType<MenuModel> = {
  title: '是否内嵌',
  dataIndex: 'isFrame',
  tooltip: '选择是内嵌则路由地址需要以`http(s)://`开头',
  ...baseYesNoColumn,
};

const isCacheColumn: CrudColumnsType<MenuModel> = {
  title: '是否缓存',
  dataIndex: 'isCache',
  tooltip: '选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致',
  ...baseYesNoColumn,
};

const Columns: CrudColumnsType<MenuModel>[] = [
  {
    title: '上级菜单',
    dataIndex: 'parentId',
    valueType: 'treeSelect',
    search: false,
    hideInTable: true,
    fieldProps: {
      fieldNames: { label: 'menuName', value: 'menuId' },
    },
    request: getOptionTree,
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    search: false,
    hideInTable: true,
    valueType: 'radio',
    // initialValue: 'M',
    fieldProps: {
      options: menuTypeOptions,
    },
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    ...iconColumn,
    align: 'center',
    width: 80,
    search: false,
    hideInSearch: true,
    hideInForm: true,
    render: (node, record) => {
      if (record.icon) {
        return <Icon icon={record.icon as any} />;
      } else {
        return node;
      }
    },
  },
  {
    ...permissionColumn,
    align: 'center',
    search: false,
    hideInSearch: true,
    hideInForm: true,
    tooltip: false,
  },
  {
    ...componentColumn,
    align: 'center',
    search: false,
    hideInSearch: true,
    hideInForm: true,
    tooltip: false,
  },
  {
    valueType: 'dependency',
    name: ['menuType'],
    search: false,
    hideInSearch: true,
    hideInTable: true,
    columns: (values) => {
      const { menuType } = values;
      if (menuType === 'M') {
        return [{ ...iconColumn }, { ...pathColumn }, { ...isVisibleColumn }];
      }
      if (menuType === 'C') {
        return [
          { ...iconColumn },
          { ...pathColumn },
          { ...permissionColumn },
          { ...componentColumn },
          { ...queryColumn },
          { ...isVisibleColumn },
          { ...isLinkColumn },
          { ...isFrameColumn },
          { ...isCacheColumn },
        ];
      }
      if (menuType === 'F') {
        return [{ ...permissionColumn }];
      }
      return [];
    },
  },
  { ...sortColumn, dataIndex: 'menuSort', width: 80 },
  { ...statusColumn, width: 80 },
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
