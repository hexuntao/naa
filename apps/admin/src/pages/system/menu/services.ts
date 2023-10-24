/*
 * 系统设置-菜单管理-API
 */
import { httpRequest } from '@/utils/umiRequest';
import { Menu, MenuSearchParams } from './types';

const baseURL = '/system/menu';

/**
 * @description:  获取菜单列表
 */

export async function getMenuList(options?: MenuSearchParams) {
  return httpRequest.get<Menu[]>(`${baseURL}`, options);
}

/**
 * @description: 新增菜单数据
 */
export async function createMenu(options: Partial<Menu>) {
  return httpRequest.post<Menu>(`${baseURL}`, options);
}

/**
 * @description: 更新菜单数据
 */
export async function updateMenu({ menuId, ...options }: Menu) {
  return httpRequest.put<number[]>(`${baseURL}/${menuId}`, options);
}

/**
 * @description: 删除菜单数据
 */
export async function delMenu(menuId: string) {
  return httpRequest.delete<number>(`${baseURL}/${menuId}`);
}
