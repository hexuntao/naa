import { CommonTypes, PaginationParams, SearchTimes, TableTimes } from '@/utils';
import { Menu } from '../menu/types';

/**
 * @description: 权限菜单
 */
export type Permission = TableTimes & {
  permissionId: string; // 权限id
  roleId: string; // 角色id
} & Pick<Menu, 'menuId'>;

/**
 * @description: 角色管理
 */
export type Role = {
  roleId: string; // 角色id
  roleName: string; // 角色名称
  roleCode: string; // 角色编码
  menuPermission: Permission[]; // 菜单权限
} & TableTimes &
  Omit<CommonTypes, 'parentId' | 'leader'>;

/**
 * 头部搜索表单 Params
 */
export type RoleSearchParams = PaginationParams &
  SearchTimes &
  Partial<Pick<Role, 'roleName' | 'roleCode' | 'status'>>;

/**
 * 设置角色状态 Params
 */
export type RoleStatusParams = Pick<Role, 'roleId' | 'status'>;
