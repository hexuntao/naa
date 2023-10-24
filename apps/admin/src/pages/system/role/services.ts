/*
 * 角色管理
 */
import { PageResponse } from '@/utils';
import { Role, RoleSearchParams, RoleStatusParams } from './types';
import { httpRequest } from '@/utils/umiRequest';

export const roleBaseURL = '/system/role';

/**
 * 获取角色列表
 */
export async function getRoleList(options?: RoleSearchParams) {
  return httpRequest.get<PageResponse<Role>>(`${roleBaseURL}`, options);
}

/**
 * @description: 新增角色数据
 * @param {Role} options
 */
export async function createRole(
  options: Omit<Role, 'roleId' | 'founder' | 'createdAt' | 'updatedAt'>,
) {
  return httpRequest.post<Role>(`${roleBaseURL}`, options);
}

/**
 * @description: 更新角色数据
 * @param {Role} options
 */
export async function updateRole({ roleId, ...options }: Role) {
  return httpRequest.put<number[]>(`${roleBaseURL}/${roleId}`, options);
}

/**
 * @description: 删除角色数据
 * @param {string} role_id
 */
export async function delRole(role_id: string) {
  return httpRequest.delete<number>(`${roleBaseURL}/${role_id}`);
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 */
export async function setRoleStatus({ roleId, status }: RoleStatusParams) {
  return httpRequest.patch<number[]>(`${roleBaseURL}/${roleId}`, { status });
}
