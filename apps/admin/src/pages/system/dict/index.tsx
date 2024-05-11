import { useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import { DictTypeModel, ListDictTypeParams } from './model';
import Columns from './Columns';
import { add, deletes, getPageList, update } from './services';

const DictType = () => {
  const { hasPermission } = useAccess();

  return (
    <Crud<DictTypeModel, ListDictTypeParams>
      rowKey="dictId"
      columns={Columns}
      list={{
        api: getPageList,
      }}
      add={{
        show: hasPermission('system:dict:add'),
        api: add,
      }}
      update={{
        show: hasPermission('system:dict:update'),
        api: update,
      }}
      deletes={{
        show: hasPermission('system:dict:delete'),
        api: deletes,
      }}
    />
  );
};

export default DictType;
