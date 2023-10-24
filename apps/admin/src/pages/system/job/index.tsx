import Crud from '@/components/Crud';
import React from 'react';
import { Job, JobSearchParams } from './types';
import Columns from './Columns';
import { getJobList, createJob, updateJob, delJob } from './services';

const JobPage: React.FC = () => {
  return (
    <Crud<Job, JobSearchParams>
      rowKey="jobId"
      columns={Columns}
      formProps={{
        layoutType: 'DrawerForm',
      }}
      tableProps={{
        pagination: false,
      }}
      api={{
        list: getJobList,
        create: createJob,
        update: updateJob,
        delete: delJob,
      }}
    />
  );
};

export default JobPage;
