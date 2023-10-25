/*
 * 内容管理-分类
 */
import { PageResponse } from '@/utils';
import { httpRequest } from '@/utils/umiRequest';
import {
  Categorie,
  CategorieSearchParams,
  CreateCategorieParams,
} from './types';

const baseURL = '/content/categories';

/**
 * 获取-tree
 */
export async function getTree(options?: CategorieSearchParams) {
  return httpRequest.get<Categorie[]>(`${baseURL}/tree`, options);
}

/**
 * 获取
 */
export async function getList(options?: CategorieSearchParams) {
  return httpRequest.get<PageResponse<Categorie>>(`${baseURL}`, options);
}

/**
 * 获取详情
 */
export async function getDetail(id: string) {
  return httpRequest.get<Categorie>(`${baseURL}/${id}`);
}

/**
 * 创建
 */
export async function create(options: CreateCategorieParams) {
  return httpRequest.post<Categorie>(`${baseURL}`, options);
}

/**
 * 更新
 */
export async function update(options: Categorie) {
  return httpRequest.patch<Categorie>(`${baseURL}`, options);
}

/**
 * 删除
 */
export async function deletes(ids: string[]) {
  return httpRequest.delete<Categorie[]>(`${baseURL}`, { ids, trash: true });
}

/**
 * 批量恢复
 */
export async function restore(ids: string[]) {
  return httpRequest.patch<Categorie[]>(`${baseURL}/restore`, { ids });
}
