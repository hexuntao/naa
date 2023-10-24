/*
 * 岗位管理-API
 */
import { httpRequest } from '@/utils/umiRequest';
import { CreateJobsParams, Job, JobSearchParams } from './types';

const baseURL = '/system/job';

/**
 * @description: 获取岗位管理列表
 */
export async function getJobList(options?: JobSearchParams) {
  return httpRequest.get<Job[]>(`${baseURL}`, options);
}

/**
 * @description: 创建岗位数据
 */
export async function createJob(options: CreateJobsParams) {
  return httpRequest.post<Job>(`${baseURL}`, options);
}

/**
 * @description: 更新岗位数据
 */

export async function updateJob({ jobId, ...options }: Job) {
  return httpRequest.put<number[]>(`${baseURL}/${jobId}`, options);
}

/**
 * @description: 删除岗位数据
 */
export async function delJob(jobId: string) {
  return httpRequest.delete<number>(`${baseURL}/${jobId}`);
}
