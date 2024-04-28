import { useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import { add, deletes, getPageList, update } from './services';
import Columns from './Columns';
import { ListPostParams, PostModel } from './model';

const Post = () => {
  const { hasPermission } = useAccess();

  return (
    <Crud<PostModel, ListPostParams>
      rowKey="postId"
      columns={Columns}
      list={{
        api: getPageList,
      }}
      add={{
        show: hasPermission('system:post:add'),
        api: add,
      }}
      update={{
        show: hasPermission('system:post:update'),
        api: update,
      }}
      deletes={{
        show: hasPermission('system:post:delete'),
        api: deletes,
      }}
    />
  );
};

export default Post;
