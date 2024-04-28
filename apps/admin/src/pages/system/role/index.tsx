import { useAccess } from '@umijs/max';
import Crud from '@/components/Crud';
import Columns from './Columns';
import { RoleModel, ListRoleParams } from './model';
import { add, deletes, getDetail, getPageList, update } from './services';

const Role = () => {
  const { hasPermission } = useAccess();

  // 新增编辑提交前修改数据格式
  const onFormBefore = (values: RoleModel & ObjectLiteral) => ({
    ...values,
    menuIds: values.menuIds.map(({ value }: any) => value),
  });

  return (
    <Crud<RoleModel, ListRoleParams>
      rowKey="roleId"
      columns={Columns}
      list={{
        api: getPageList,
        postData(data) {
          return data.map((e) => ({
            ...e,
            __noShowEdit: e.roleId === 1,
            __noShowDel: e.roleId === 1,
          }));
        },
      }}
      add={{
        show: hasPermission('system:role:add'),
        api: add,
        onBefore: onFormBefore,
      }}
      update={{
        show: hasPermission('system:role:update'),
        api: update,
        onOpen: async (record) => {
          const data = await getDetail(record.roleId);
          return { ...record, menuIds: data.menuIds.map((value) => ({ value })) };
        },
        onBefore: onFormBefore,
      }}
      deletes={{
        show: hasPermission('system:role:delete'),
        api: deletes,
      }}
      rowSelection={{
        getCheckboxProps(record) {
          return {
            disabled: record.roleId === 1,
          };
        },
      }}
    />
  );
};

export default Role;
