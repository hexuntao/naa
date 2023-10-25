import Crud from '@/components/Crud';
import React from 'react';
import Columns from './Columns';
import { create, deletes, getList, update } from './services';
import { Post, PostSearchParams } from './types';

const PostsPage: React.FC = () => {
  return (
    <Crud<Post, PostSearchParams>
      columns={Columns}
      formProps={{
        layoutType: 'DrawerForm',
      }}
      fieldsRecord={(record) => {
        console.log(record);
        return {
          category: record.category?.id,
          tags: record.tags?.map((e) => e.id),
        };
      }}
      api={{ list: getList, create: create, update: update, delete: deletes }}
    />
  );
};

export default PostsPage;
