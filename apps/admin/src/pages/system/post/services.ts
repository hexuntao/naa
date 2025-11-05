import React from 'react';
import { PageResponse } from '@/components/Crud';
import { httpRequest } from '@/utils/request';
import { PostModel, ListPostParams, CreatePostParams, UpdatePostParams } from './model';

/**
 * 分页列表
 */
export function getPageList(params?: ListPostParams) {
  return httpRequest.get<PageResponse<PostModel>>('/post/list', params);
}

/**
 * 查询列表
 */
export async function getList() {
  return httpRequest.get<PostModel[]>('/post/options');
}

/**
 * 详情
 */
export async function getDetail(postId: React.Key) {
  return httpRequest.get<PostModel>(`/post/info/${postId}`);
}

/**
 * 添加
 */
export async function add(params: CreatePostParams) {
  return httpRequest.post('/post/add', params);
}

/**
 * 更新
 */
export async function update(params: UpdatePostParams) {
  return httpRequest.put('/post/update', params);
}

/**
 * 删除
 */
export async function deletes(postIds: React.Key) {
  return httpRequest.delete(`/post/delete/${postIds}`);
}
