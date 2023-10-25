import {
  CrudColumnsType,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
} from '@/components/Crud';
import { getTree } from './services';
import { Categorie } from './types';

const Columns: CrudColumnsType<Categorie>[] = [
  {
    title: '上级',
    dataIndex: 'parent',
    hideInTable: true,
    hideInSearch: true,
    tooltip: '不选默认为顶级',
    valueType: 'treeSelect',
    fieldProps: {
      multiple: false,
      treeCheckable: false,
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
    request: async () => {
      const { data } = await getTree();
      return data;
    },
  },
  {
    title: '分类名称',
    dataIndex: 'name',
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入分类名称' }],
    },
  },
  /* 状态 */
  // statusColumn,
  /* 排序 */
  // sortColumn,
  /* 创建时间 */
  createTimeColumn,
  /* 创建时间-搜索 */
  createTimeInSearch,
  /* 描述 */
  describeColumn,
];

export default Columns;
