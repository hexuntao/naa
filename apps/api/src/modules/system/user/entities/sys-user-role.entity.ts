import { Column, Entity } from 'typeorm';

import { BaseTimeEntity } from '@/modules/core';

/**
 * 用户和角色关联表 用户1-N角色
 */
@Entity({ name: 'sys_user_role' })
export class SysUserRole extends BaseTimeEntity {
  @Column({
    name: 'user_id',
    type: 'bigint',
    primary: true,
    comment: '用户ID',
  })
  userId: number;

  @Column({
    name: 'role_id',
    type: 'bigint',
    primary: true,
    comment: '角色ID',
  })
  roleId: number;
}
