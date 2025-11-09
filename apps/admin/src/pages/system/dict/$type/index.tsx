import { useParams, useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import Columns from './Columns';
import { add, deletes, getPageList, update } from './services';
import { DictTypeModel, ListDictTypeParams } from './model';

const DictData = () => {
  const { type: dictType } = useParams();
  const { hasPermission } = useAccess();

  return (
    <Crud<DictTypeModel, ListDictTypeParams>
      rowKey="dictId"
      columns={Columns}
      list={{
        api: getPageList,
        params: {
          dictType,
        },
      }}
      add={{
        show: hasPermission('system:dict:add'),
        api: add,
        onBefore(values) {
          return { ...values, dictType: dictType || '' };
        },
      }}
      update={{
        show: hasPermission('system:dict:update'),
        api: update,
        onBefore(values) {
          return { ...values, dictType: dictType || '' };
        },
      }}
      deletes={{
        show: hasPermission('system:dict:delete'),
        api: deletes,
      }}
    />
  );
};

export default DictData;
