import Columns from './Columns';
import Crud from '@/components/Crud';
import { Role, RoleSearchParams } from './types';
import { getRoleList, createRole, updateRole, delRole } from './services';

const RolePage: React.FC = () => {
  return (
    <Crud<Role, RoleSearchParams>
      rowKey="roleId"
      columns={Columns}
      api={{
        list: getRoleList,
        create: createRole,
        update: updateRole,
        delete: delRole,
      }}
    />
  );
};

export default RolePage;
