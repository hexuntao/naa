/*
 * 内容管理-文章
 */
import { PageResponse } from '@/utils';
import { httpRequest } from '@/utils/umiRequest';
import { CreatePostParams, Post, PostSearchParams } from './types';

const baseURL = '/content/posts';

/**
 * 获取
 */
export async function getList(options?: PostSearchParams) {
  return httpRequest.get<PageResponse<Post>>(`${baseURL}`, options);
}

/**
 * 获取详情
 */
export async function getDetail(id: string) {
  return httpRequest.get<Post>(`${baseURL}/${id}`);
}

/**
 * 创建
 */
export async function create(options: CreatePostParams) {
  return httpRequest.post<Post>(`${baseURL}`, options);
}

/**
 * 更新
 */
export async function update(options: Post) {
  return httpRequest.patch<Post>(`${baseURL}`, options);
}

/**
 * 删除
 */
export async function deletes(ids: string[]) {
  return httpRequest.delete<Post[]>(`${baseURL}`, { ids, trash: true });
}

/**
 * 批量恢复
 */
export async function restore(ids: string[]) {
  return httpRequest.patch<Post[]>(`${baseURL}/restore`, { ids });
}
