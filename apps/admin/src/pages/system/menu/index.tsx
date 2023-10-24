import Crud from '@/components/Crud';
import React from 'react';
import { Menu, MenuSearchParams } from './types';
import { getMenuList, createMenu, updateMenu, delMenu } from './services';
import Columns from './Columns';

const MenuPage: React.FC = () => {
  return (
    <Crud<Menu, MenuSearchParams>
      rowKey="menu_id"
      columns={Columns}
      formProps={{
        layoutType: 'DrawerForm',
      }}
      tableProps={{
        pagination: false,
      }}
      api={{
        list: getMenuList,
        create: createMenu,
        update: updateMenu,
        delete: delMenu,
      }}
    />
  );
};

export default MenuPage;
