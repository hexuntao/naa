import React from 'react';
import { PageResponse } from '@/components/Crud';
import { httpRequest } from '@/utils/request';
import { PostModel, ListPostParams, CreatePostParams, UpdatePostParams } from './model';

/**
 * 分页列表
 */
export function getPageList(params?: ListPostParams) {
  return httpRequest.get<PageResponse<PostModel>>('/posts', params);
}

/**
 * 查询列表
 */
export async function getList() {
  return httpRequest.get<PostModel[]>('/posts/options');
}

/**
 * 详情
 */
export async function getDetail(postId: React.Key) {
  return httpRequest.get<PostModel>(`/posts/${postId}`);
}

/**
 * 添加
 */
export async function add(params: CreatePostParams) {
  return httpRequest.post(`/posts`, params);
}

/**
 * 更新
 */
export async function update(postId: number, params: UpdatePostParams) {
  return httpRequest.put(`/posts/${postId}`, params);
}

/**
 * 删除
 */
export async function deletes(postIds: React.Key) {
  return httpRequest.delete(`/post/delete/${postIds}`);
}
