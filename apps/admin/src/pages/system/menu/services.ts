import type { MenuModel, MenuTreeResult, CreateMenuParams, UpdateMenuParams } from './model';
import { httpRequest } from '@/utils/request';

/**
 * 查询列表
 */
export function getListTree() {
  return httpRequest.get<MenuTreeResult[]>('/menus/tree');
}

/**
 * 查询树
 */
export function getOptionTree() {
  return httpRequest.get<MenuTreeResult[]>('/menus/tree-options');
}

/**
 * 查询详情
 */
export function getDetail(menuId: React.Key) {
  return httpRequest.get<MenuModel>(`/menus/${menuId}`);
}

/**
 * 添加
 */
export function add(params: CreateMenuParams) {
  return httpRequest.post('/menus', params);
}

/**
 * 更新
 */
export function update(menuId: number, params: UpdateMenuParams) {
  return httpRequest.put(`/menus/${menuId}`, params);
}

/**
 * 删除
 */
export function deletes(menuId: React.Key) {
  return httpRequest.delete(`/menus/${menuId}`);
}
