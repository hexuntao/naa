import Crud from '@/components/Crud';
import React from 'react';
import Columns from './Columns';
import { create, deletes, getTree, update } from './services';
import { Categorie, CategorieSearchParams } from './types';

const CategoricesPage: React.FC = () => {
  return (
    <Crud<Categorie, CategorieSearchParams>
      columns={Columns}
      tableProps={{
        pagination: false,
      }}
      api={{
        list: getTree,
        create: create,
        update: update,
        delete: deletes,
      }}
    />
  );
};

export default CategoricesPage;
