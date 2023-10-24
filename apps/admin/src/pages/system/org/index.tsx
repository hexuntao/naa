import Crud from '@/components/Crud';
import React from 'react';
import { Org, OrgSearchParams } from './types';
import Columns from './Columns';
import { getOrgList, createOrg, updateOrg, delOrg } from './services';

const OrgPage: React.FC = () => {
  return (
    <Crud<Org, OrgSearchParams>
      rowKey="orgId"
      columns={Columns}
      formProps={{
        layoutType: 'DrawerForm',
      }}
      tableProps={{
        pagination: false,
      }}
      api={{
        list: getOrgList,
        create: createOrg,
        update: updateOrg,
        delete: delOrg,
      }}
    />
  );
};

export default OrgPage;
