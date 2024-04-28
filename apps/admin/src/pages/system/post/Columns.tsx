import { PostModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';

const Columns: CrudColumnsType<PostModel>[] = [
  // {
  //   title: '岗位编号',
  //   dataIndex: 'postId',
  //   hideInSearch: true,
  //   hideInForm: true,
  // },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  {
    title: '岗位编码',
    dataIndex: 'postCode',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  { ...sortColumn, dataIndex: 'postSort' },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
