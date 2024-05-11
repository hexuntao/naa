import { useParams, useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import Columns from './Columns';
import { add, deletes, getPageList, update } from './services';
import { DictDataModel, ListDictDataParams } from './model';

const DictData = () => {
  const { type: dictType } = useParams();
  const { hasPermission } = useAccess();

  return (
    <Crud<DictDataModel, ListDictDataParams>
      rowKey="dictId"
      columns={Columns}
      list={{
        api: getPageList,
        onBefore(values) {
          return {
            ...values,
            dictType: dictType,
          };
        },
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

export default DictData;
