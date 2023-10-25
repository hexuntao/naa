/*
 * 内容管理-标签
 */
import { PageResponse } from '@/utils';
import { httpRequest } from '@/utils/umiRequest';
import { CreateTagParams, Tag, TagSearchParams } from './types';

const baseURL = '/content/tags';

/**
 * 获取
 */
export async function getList(options?: TagSearchParams) {
  return httpRequest.get<PageResponse<Tag>>(`${baseURL}`, options);
}

/**
 * 获取详情
 */
export async function getDetail(id: string) {
  return httpRequest.get<Tag>(`${baseURL}/${id}`);
}

/**
 * 创建
 */
export async function create(options: CreateTagParams) {
  return httpRequest.post<Tag>(`${baseURL}`, options);
}

/**
 * 更新
 */
export async function update(options: Tag) {
  return httpRequest.patch<Tag>(`${baseURL}`, options);
}

/**
 * 删除
 */
export async function deletes(ids: string[]) {
  return httpRequest.delete<Tag[]>(`${baseURL}`, { ids, trash: true });
}

/**
 * 批量恢复
 */
export async function restore(ids: string[]) {
  return httpRequest.patch<Tag[]>(`${baseURL}/restore`, { ids });
}
