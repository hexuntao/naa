import { DeptModel } from './model';
import { CrudColumnsType } from '@/components/Crud';
import {
  createTimeColumn,
  createTimeInSearch,
  sortColumn,
  statusColumn,
  statusInForm,
} from '@/models/columns';
import { getOptionTree } from './services';

const Columns: CrudColumnsType<DeptModel>[] = [
  {
    title: '上级部门',
    dataIndex: 'parentId',
    valueType: 'treeSelect',
    search: false,
    hideInTable: true,
    fieldProps: {
      fieldNames: { label: 'deptName', value: 'deptId' },
    },
    request: getOptionTree,
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    align: 'center',
    formItemProps: {
      rules: [{ required: true }],
    },
  },
  { ...sortColumn, dataIndex: 'deptSort' },
  statusColumn,
  statusInForm,
  createTimeColumn,
  createTimeInSearch,
];

export default Columns;
