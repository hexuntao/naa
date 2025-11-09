import {
  RoleInfoResult,
  RoleModel,
  CreateRoleParams,
  ListRoleParams,
  UpdateRoleParams,
  UpdateDataScopeParams,
} from './model';
import { httpRequest } from '@/utils/request';
import { PageResponse } from '@/components/Crud';

/**
 * 查询列表
 */
export function getPageList(params?: ListRoleParams) {
  return httpRequest.get<PageResponse<RoleModel>>('/roles', params);
}

/**
 * 查询列表
 */
export function getList() {
  return httpRequest.get<RoleModel[]>('/roles/options');
}

/**
 * 查询详情
 */
export function getDetail(roleId: React.Key) {
  return httpRequest.get<RoleInfoResult>(`/roles/${roleId}`);
}

/**
 * 添加
 */
export function add(params: CreateRoleParams) {
  return httpRequest.post('/roles', params);
}

/**
 * 更新
 */
export function update(roleId: number, params: UpdateRoleParams) {
  return httpRequest.put(`/roles/${roleId}`, params);
}

/**
 * 删除
 */
export function deletes(roleIds: React.Key) {
  return httpRequest.delete(`/roles/${roleIds}`);
}

/**
 * 更新数据权限
 */
export function updateDataScope(roleId: number, params: UpdateDataScopeParams) {
  return httpRequest.put(`/roles/${roleId}/data-scope`, params);
}
