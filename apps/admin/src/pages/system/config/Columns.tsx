import { ConfigModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';

const Columns: CrudColumnsType<ConfigModel>[] = [
  // {
  //   title: '参数编号',
  //   dataIndex: 'configId',
  //   search: false,
  // },
  {
    title: '参数名称',
    dataIndex: 'configName',
    align: 'center',
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '参数键名',
    dataIndex: 'configKey',
    align: 'center',
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '参数键值',
    dataIndex: 'configValue',
    align: 'center',
    search: false,
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  statusColumn,
  statusInForm,
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'center',
    search: false,
    ellipsis: false,
    valueType: 'textarea',
  },
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
