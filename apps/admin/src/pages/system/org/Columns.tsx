import {
  CrudColumnsType,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  sortColumn,
  statusColumn,
} from '@/components/Crud';
import { ORG_TYPE } from '@/utils';
import { getUserList } from '../user/services';
import { getOrgList } from './services';
import { Org, OrgTypes } from './types';

/**
 * @description: 组织类型
 */
export const OrgTypeEnum: Record<OrgTypes, string> = {
  [ORG_TYPE.GROUP]: 'group',
  [ORG_TYPE.COMPANY]: 'company',
  [ORG_TYPE.UNIT]: 'unit',
  [ORG_TYPE.DEPT]: 'dept',
};

const Columns: CrudColumnsType<Org>[] = [
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
        label: 'orgName',
        value: 'orgId',
      },
    },
    request: async () => {
      const { data } = await getOrgList();
      return data;
    },
  },
  {
    title: '组织名称',
    dataIndex: 'orgName',
    ellipsis: true,
    // align: 'center',
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入组织名称' }],
    },
  },
  {
    title: '组织编码',
    dataIndex: 'orgCode',
    ellipsis: true,
    align: 'center',
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入组织编码' }],
    },
  },
  {
    title: '组织类型',
    dataIndex: 'orgType',
    filters: true,
    onFilter: true,
    width: 100,
    align: 'center',
    valueEnum: OrgTypeEnum,
    formItemProps: {
      rules: [{ required: true, message: '请选择组织类型' }],
    },
  },
  {
    title: '组织LOGO',
    dataIndex: 'orgLogo',
    align: 'center',
    hideInSearch: true,
    valueType: {
      type: 'image',
      width: 40,
    },
    // renderFormItem: (reocrd, form, action) => {
    //   return (
    //     <UploadImage
    //       max={1}
    //       fieldProps={{
    //         accept: 'image/jpeg',
    //         listType: 'picture-card',
    //       }}
    //       value={form.value}
    //     />
    //   );
    // },
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
      const { data } = await getUserList({ page: 1, limit: 9999 });
      return data.items;
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
  /* 描述 */
  describeColumn,
];

export default Columns;
