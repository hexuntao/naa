import { DictDataModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';
import { Link } from '@umijs/max';

const Columns: CrudColumnsType<DictDataModel>[] = [
  // {
  //   title: '字典编号',
  //   dataIndex: 'dictId',
  //   search: false,
  //   hideInSearch: true,
  //   hideInForm: true,
  // },
  {
    title: '字典名称',
    dataIndex: 'dictName',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    render: (_, record) => {
      return <Link to={`/system/dict/${record.dictType}`}>{record.dictType}</Link>;
    },
  },
  { ...sortColumn, dataIndex: 'dictSort' },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
