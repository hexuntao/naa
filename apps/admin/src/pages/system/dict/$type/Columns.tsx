import { DictTypeModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';

const Columns: CrudColumnsType<DictTypeModel>[] = [
  // {
  //   title: '数据编号',
  //   dataIndex: 'dictId',
  //   search: false,
  //   hideInSearch: true,
  //   hideInForm: true,
  // },
  {
    title: '数据标签',
    dataIndex: 'dictLabel',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '数据键值',
    dataIndex: 'dictValue',
    align: 'center',
    search: false,
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  { ...sortColumn, dataIndex: 'dictSort' },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
