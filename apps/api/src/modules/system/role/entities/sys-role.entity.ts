import { IsEnum, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { BaseBusinessEntity, BaseStatusEnums } from '@/modules/core';

/**
 * 角色信息表
 */
@Entity({ name: 'sys_role' })
export class SysRole extends BaseBusinessEntity {
  @PrimaryGeneratedColumn({
    name: 'role_id',
    type: 'bigint',
    comment: '角色ID',
  })
  @IsInt()
  @IsNotEmpty()
  roleId: number;

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 50,
    comment: '角色名称',
  })
  @MaxLength(50)
  @IsNotEmpty()
  roleName: string;

  @Column({
    name: 'role_code',
    type: 'varchar',
    length: 50,
    comment: '角色编码',
  })
  @MaxLength(50)
  @IsNotEmpty()
  roleCode: string;

  @Column({
    name: 'role_sort',
    type: 'int',
    default: 0,
    comment: '显示顺序',
  })
  @IsInt()
  @IsOptional()
  roleSort: number;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
    default: '1',
    comment: '角色状态（1正常 0停用）',
  })
  @IsEnum(BaseStatusEnums)
  @IsOptional()
  status: string;
}
