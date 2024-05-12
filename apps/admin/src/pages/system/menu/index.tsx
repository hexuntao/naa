import { useAccess } from '@umijs/max';
import { eachTree } from '@/utils/tree';
import Crud from '@/components/Crud';
import { MenuModel } from './model';
import Columns from './Columns';
import { add, deletes, getListTree, update } from './services';

const Menu = () => {
  const { hasPermission } = useAccess();

  return (
    <Crud<MenuModel>
      rowKey="menuId"
      useRowSelection={false}
      tableProps={{ search: false, pagination: false }}
      columns={Columns}
      list={{
        api: getListTree,
        postData(data) {
          eachTree(data);
          return data;
        },
      }}
      add={{
        show: hasPermission('system:menu:add'),
        api: add,
      }}
      update={{
        show: hasPermission('system:menu:update'),
        api: update,
      }}
      deletes={{
        show: hasPermission('system:menu:delete'),
        api: deletes,
      }}
    />
  );
};

export default Menu;
