import Crud from '@/components/Crud';
import Columns from './Columns';
import { ConfigModel, ListConfigParams } from './model';
import { add, deletes, getPageList, update } from './services';

const Config = () => {
  return (
    <Crud<ConfigModel, ListConfigParams>
      rowKey="configId"
      columns={Columns}
      list={{
        api: getPageList,
      }}
      add={{
        show: true,
        api: add,
      }}
      update={{
        show: true,
        api: update,
      }}
      deletes={{
        show: true,
        api: deletes,
      }}
    />
  );
};

export default Config;
