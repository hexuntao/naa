import {
  RoleInfoResult,
  RoleModel,
  CreateRoleParams,
  ListRoleParams,
  UpdateRoleParams,
} from './model';
import { httpRequest } from '@/utils/request';
import { PageResponse } from '@/components/Crud';

/**
 * 查询列表
 */
export function getPageList(params?: ListRoleParams) {
  return httpRequest.get<PageResponse<RoleModel>>('/role/list', params);
}

/**
 * 查询列表
 */
export function getList() {
  return httpRequest.get<RoleModel[]>('/role/option/list');
}

/**
 * 查询详情
 */
export function getDetail(roleId: React.Key) {
  return httpRequest.get<RoleInfoResult>(`/role/info/${roleId}`);
}

/**
 * 添加
 */
export function add(params: CreateRoleParams) {
  return httpRequest.post('/role/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateRoleParams) {
  return httpRequest.put('/role/update', params);
}

/**
 * 删除
 */
export function deletes(roleIds: React.Key) {
  return httpRequest.delete(`/role/delete/${roleIds}`);
}
