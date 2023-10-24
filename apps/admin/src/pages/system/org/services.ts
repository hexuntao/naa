/*
 * 智能行政-组织管理-API
 */
import { httpRequest } from '@/utils/umiRequest';
import { CreateOrgParams, Org, OrgSearchParams } from './types';

const baseURL = '/system/org';

/**
 * @description: 获取组织管理列表
 */
export async function getOrgList(options?: OrgSearchParams) {
  return httpRequest.get<Org[]>(`${baseURL}`, options);
}

/**
 * @description: 新增组织数据
 */
export async function createOrg(options: CreateOrgParams) {
  return httpRequest.post<Org>(`${baseURL}`, options);
}

/**
 * @description: 更新组织数据
 * @param {Org} options
 */
export async function updateOrg({ orgId, ...options }: Org) {
  return httpRequest.put<number[]>(`${baseURL}/${orgId}`, options);
}

/**
 * @description: 删除组织数据
 */
export async function delOrg(orgId: string) {
  return httpRequest.delete(`${baseURL}/${orgId}`);
}
