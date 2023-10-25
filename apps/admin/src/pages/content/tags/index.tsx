import Crud from '@/components/Crud';
import React from 'react';
import Columns from './Columns';
import { create, deletes, getList, update } from './services';
import { Tag, TagSearchParams } from './types';

const TagsPage: React.FC = () => {
  return (
    <Crud<Tag, TagSearchParams>
      columns={Columns}
      api={{
        list: getList,
        create: create,
        update: update,
        delete: deletes,
      }}
    />
  );
};

export default TagsPage;
