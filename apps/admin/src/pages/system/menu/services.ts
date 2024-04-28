import type {
  MenuModel,
  MenuTreeResult,
  CreateMenuParams,
  UpdateMenuParams,
  RouterTreeResult,
} from './model';
import { httpRequest } from '@/utils/request';

/**
 * 查询列表
 */
export function getList() {
  return httpRequest.get<MenuTreeResult[]>('/menu/tree');
}

/**
 * 查询详情
 */
export function getDetail(menuId: React.Key) {
  return httpRequest.get<MenuModel>(`/menu/info/${menuId}`);
}

/**
 * 添加
 */
export function add(params: CreateMenuParams) {
  return httpRequest.get('/menu/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateMenuParams) {
  return httpRequest.put('/menu/update', params);
}

/**
 * 删除
 */
export function deletes(menuId: React.Key) {
  return httpRequest.delete(`/menu/delete/${menuId}`);
}

/**
 * 查询树
 */
export function getOptionTree() {
  return httpRequest.get<MenuTreeResult[]>('/menu/option/tree');
}

/**
 * 查询用户路由&菜单
 */
export function getUserRouters() {
  return httpRequest.get<RouterTreeResult[]>('/menu/getUserRouters', {
    skipErrorHandler: true,
  });
}
