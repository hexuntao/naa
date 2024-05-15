import { useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import Columns from './Columns';
import { NoticeModel, ListNoticeParams } from './model';
import { add, deletes, getPageList, update } from './services';

const Notice = () => {
  const { hasPermission } = useAccess();

  return (
    <Crud<NoticeModel, ListNoticeParams>
      rowKey="noticeId"
      columns={Columns}
      formProps={{
        width: 1000,
      }}
      list={{
        api: getPageList,
      }}
      add={{
        show: hasPermission('system:notice:add'),
        api: add,
      }}
      update={{
        show: hasPermission('system:notice:update'),
        api: update,
      }}
      deletes={{
        show: hasPermission('system:notice:delete'),
        api: deletes,
      }}
    />
  );
};

export default Notice;
