/*
 * 系统设置-用户管理-API
 */
import type { PageResponse } from '@/utils/types';
import { httpRequest } from '@/utils/umiRequest';
import { User, UserSearchParams, UserStatusProps } from './types';

const baseURL = '/system/user';

/**
 * @description:  获取用户列表
 */
export async function getUserList(options?: UserSearchParams) {
  return httpRequest.get<PageResponse<User>>(`${baseURL}`, options);
}

/**
 * @description: 新增用户数据
 */
export async function createUser(options: User) {
  return httpRequest.post<User>(`${baseURL}`, options);
}

/**
 * @description: 更新用户数据
 */
export async function updateUser({ userId, ...options }: Partial<User>) {
  return httpRequest.put<number[]>(`${baseURL}/${userId}`, options);
}

/**
 * @description: 删除用户数据
 */
export async function delUser(userId: string) {
  return httpRequest.delete<number>(`${baseURL}/${userId}`);
}

/**
 * @description: 设置角色状态
 * @param {Data} options
 */
export async function setUserStatus({ userId, status }: UserStatusProps) {
  return httpRequest.patch<number[]>(`${baseURL}/${userId}`, { status });
}
