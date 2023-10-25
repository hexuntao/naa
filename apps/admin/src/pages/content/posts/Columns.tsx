import { CrudColumnsType } from '@/components/Crud';
import { Space, Tag } from 'antd';
import { getTree } from '../categories/services';
import { getList } from '../tags/services';
import { Post } from './types';

const Columns: CrudColumnsType<Post>[] = [
  {
    title: '文章标题',
    dataIndex: 'title',
    fieldProps: {
      showCount: true,
      maxLength: 255,
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入文章标题' }],
    },
  },
  {
    title: '文章分类',
    dataIndex: 'category',
    valueType: 'treeSelect',
    fieldProps: {
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择文章分类' }],
    },
    render: (_, record) => {
      return <>{record.category?.name}</>;
    },
    request: async () => {
      const { data } = await getTree();
      return data;
    },
  },
  {
    title: '关联标签',
    dataIndex: 'tags',
    valueType: 'select',
    fieldProps: {
      mode: 'multiple',
      fieldNames: {
        label: 'name',
        value: 'id',
      },
    },
    render: (dom, record) => {
      return (
        <Space>
          {record.tags?.map((e, index) => (
            <Tag style={{ margin: 0 }} key={index}>
              {e.name}
            </Tag>
          ))}
        </Space>
      );
    },
    // renderFormItem: () => {
    //   return <div>asd</div>;
    // },
    request: async () => {
      const { data } = await getList({ page: 1, limit: 9999 });
      return data.items;
    },
  },
  {
    title: '发布时间',
    dataIndex: 'publishedAt',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '文章内容',
    dataIndex: 'body',
    valueType: 'textarea',
    hideInSearch: true,
    hideInTable: true,
    formItemProps: {
      rules: [{ required: true, message: '请输入文章内容' }],
    },
  },
  {
    title: '文章概要',
    dataIndex: 'summary',
    valueType: 'textarea',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '关键词',
    dataIndex: 'keywords',
    hideInSearch: true,
    valueType: 'select',
    fieldProps: {
      mode: 'tags',
    },
  },
  {
    title: '排序',
    dataIndex: 'customOrder',
    valueType: 'digit',
    hideInSearch: true,
    render: (_, record) => {
      return <Tag>{record.customOrder}</Tag>;
    },
  },
];

export default Columns;
