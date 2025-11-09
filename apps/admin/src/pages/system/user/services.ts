import { httpRequest } from '@/utils/request';
import {
  UserInfoResult,
  UserModel,
  CreateUserParams,
  ListUserParams,
  UpdateUserParams,
} from './model';
import { ContentTypeEnum } from '@/enums/httpEnum';

/**
 * 查询分页列表
 */
export function getPageList(params?: ListUserParams) {
  return httpRequest.get<Pagination<UserModel>>('/users', params);
}

/**
 * 查询详情
 */
export function getDetail(userId: React.Key) {
  return httpRequest.get<UserInfoResult>(`/users/${userId}`);
}

/**
 * 添加
 */
export function add(params: CreateUserParams) {
  return httpRequest.post('/users', params);
}

/**
 * 更新
 */
export function update(userId: number, params: UpdateUserParams) {
  return httpRequest.put(`/users/${userId}`, params);
}

/**
 * 删除用户
 */
export function deletes(userIds: React.Key) {
  return httpRequest.delete(`/users/${userIds}`);
}

/**
 * 导出列表
 */
export function exportList() {
  return httpRequest.post(
    `/users/export`,
    { getResponse: true },
    {
      responseType: 'blob',
    },
  );
}

/**
 * 导出模板
 */
export function exportTemplate() {
  return httpRequest.post(
    `/users/export-template`,
    {
      getResponse: true,
    },
    {
      responseType: 'blob',
    },
  );
}

/**
 * 导入列表
 */
export function importList(data: FormData) {
  return httpRequest.post(`/usesr/import`, data, {
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
  });
}
