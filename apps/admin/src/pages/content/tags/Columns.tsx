import { CrudColumnsType } from '@/components/Crud';
import { Tag } from './types';

const Columns: CrudColumnsType<Tag>[] = [
  {
    title: '标签名称',
    dataIndex: 'name',
    fieldProps: {
      showCount: true,
      maxLength: 32,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入标签名称' }],
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    valueType: 'textarea',
    ellipsis: true,
    hideInSearch: true,
  },
];

export default Columns;
