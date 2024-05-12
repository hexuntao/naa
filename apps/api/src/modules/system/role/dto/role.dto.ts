import { OmitType } from '@nestjs/mapped-types';

import { Allow, IsArray, IsOptional } from 'class-validator';

import { PaginateDto } from '@/modules/core';

import { SysRole } from '../entities/sys-role.entity';

/**
 * 查询角色
 */
export class ListRoleDto extends PaginateDto {
  /** 角色名称 */
  @Allow()
  roleName?: string;

  /** 角色编码 */
  @Allow()
  roleCode?: string;

  /** 角色状态（1正常 0停用） */
  @Allow()
  status?: string;
}

/**
 * 添加角色
 */
export class CreateRoleDto extends OmitType(SysRole, ['roleId'] as const) {
  /** 菜单权限 */
  @IsArray()
  @IsOptional()
  menuIds?: number[];

  /** 部门权限 */
  @IsArray()
  @IsOptional()
  deptIds?: number[];
}

/**
 * 更新角色
 */
export class UpdateRoleDto extends OmitType(SysRole, [] as const) {
  /** 菜单权限 */
  @IsArray()
  @IsOptional()
  menuIds?: number[];

  /** 部门权限 */
  @IsArray()
  @IsOptional()
  deptIds?: number[];
}
