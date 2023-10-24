import Crud from '@/components/Crud';
import React from 'react';
import Columns from './Columns';
import { UserSearchParams, User } from './types';
import { createUser, delUser, getUserList, updateUser } from './services';

const UserPage: React.FC = () => {
  return (
    <Crud<User, UserSearchParams>
      rowKey="userId"
      formProps={{
        layoutType: 'DrawerForm',
      }}
      columns={Columns}
      api={{
        list: getUserList,
        create: createUser,
        update: updateUser,
        delete: delUser,
      }}
    />
  );
};

export default UserPage;
