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
  return httpRequest.get<Pagination<UserModel>>('/user/list', params);
}

/**
 * 查询详情
 */
export function getDetail(userId: React.Key) {
  return httpRequest.get<UserInfoResult>(`/user/info/${userId}`);
}

/**
 * 添加
 */
export function add(params: CreateUserParams) {
  return httpRequest.post('/user/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateUserParams) {
  return httpRequest.put('/user/update', params);
}

/**
 * 删除用户
 */
export function deletes(userIds: React.Key) {
  return httpRequest.delete(`/user/delete/${userIds}`);
}

/**
 * 导出列表
 */
export function exportList() {
  return httpRequest.get(
    `/user/export`,
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
  return httpRequest.get(
    `/user/export/template`,
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
  return httpRequest.post(`/user/import`, data, {
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
  });
}
