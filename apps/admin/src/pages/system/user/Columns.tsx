import { CrudColumnsType } from '@/components/Crud';
import { UserModel } from './model';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';
import { cache, dictMap, getDictData } from '@/models/dict';
import { DictTag } from '@/components/Dict';
import { DictTypeEnum } from '@/enums/dictEnum';
import { getOptionTree as getDeptList } from '../dept/services';
import { getList as getPostList } from '../post/services';
import { getList as getRoleList } from '../role/services';

const ageType = DictTypeEnum.SYS_USER_SEX;

const Columns: CrudColumnsType<UserModel>[] = [
  // {
  //   title: '用户编号',
  //   dataIndex: 'userId',
  //   align: 'center',
  //   search: false,
  //   hideInSearch: true,
  //   hideInForm: true,
  // },
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '用户昵称',
    dataIndex: 'nickName',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '密码',
    dataIndex: 'password',
    search: false,
    hideInSearch: true,
    hideInTable: true,
    valueType: 'password',
    initialValue: '123456',
    fieldProps: {
      max: 36,
    },
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    search: false,
    align: 'center',
    fieldProps: {
      max: 11,
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    search: false,
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    search: false,
    hideInTable: true,
    valueType: 'radio',
    initialValue: '0',
    render: (_, record, index, action, schema) => {
      const statusKey = `${schema.dataIndex || 'sex'}`;
      return dictMap[ageType] && <DictTag options={dictMap[ageType]} value={record[statusKey]} />;
    },
    request: async () => {
      if (!cache.has(ageType)) {
        cache.add(ageType);
        const data = await getDictData(ageType).catch(() => {
          cache.delete(ageType);
        });
        dictMap[ageType] = data;
        return data || [];
      }
      return dictMap[ageType] || [];
    },
  },
  {
    title: '部门',
    dataIndex: 'deptId',
    // search: false,
    // hideInTable: true,
    valueType: 'treeSelect',
    formItemProps: {},
    fieldProps: {
      fieldNames: { label: 'deptName', value: 'deptId' },
    },
    request: getDeptList,
  },
  {
    title: '角色',
    dataIndex: 'roleIds',
    search: false,
    hideInTable: true,
    valueType: 'select',
    formItemProps: {},
    fieldProps: {
      mode: 'multiple',
      fieldNames: { label: 'roleName', value: 'roleId' },
    },
    request: getRoleList,
  },
  {
    title: '岗位',
    dataIndex: 'postIds',
    search: false,
    hideInTable: true,
    valueType: 'select',
    formItemProps: {},
    fieldProps: {
      mode: 'multiple',
      fieldNames: { label: 'postName', value: 'postId' },
    },
    request: getPostList,
  },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
