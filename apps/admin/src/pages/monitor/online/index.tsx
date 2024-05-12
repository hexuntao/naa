import { useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import Columns from './Columns';
import { ListOnlineParams, OnlineModel } from './model';
import { getPageList, logoutOnline } from './services';

const Online = () => {
  const { hasPermission } = useAccess();

  return (
    <Crud<OnlineModel, ListOnlineParams>
      rowKey="userSk"
      useRowSelection={false}
      columns={Columns}
      list={{
        api: getPageList,
      }}
      deletes={{
        show: hasPermission('monitor:online:logout'),
        api: logoutOnline,
        text: '强退',
      }}
    />
  );
};

export default Online;
