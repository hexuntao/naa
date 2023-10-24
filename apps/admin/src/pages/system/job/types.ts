import { CommonTypes, TableTimes, SearchTimes } from '@/utils';
import { Org } from '../org/types';

/**
 * @description: 岗位管理
 */
export type Job = TableTimes & {
  jobId: string; // 岗位id
  jobName: string; // 岗位名称
  children?: Job[];
} & Pick<Org, 'orgId' | 'orgName' | 'orgLogo'> &
  Omit<CommonTypes, 'status'>;

/**
 * @description: 新增岗位 Params
 */
export type CreateJobsParams = Pick<
  Job,
  'parentId' | 'jobName' | 'orgId' | 'leader' | 'sort' | 'describe'
>;

/**
 * @description: 头部搜索表单 Params
 */
export type JobSearchParams = Partial<Pick<Job, 'jobId' | 'orgId'>> & SearchTimes;
