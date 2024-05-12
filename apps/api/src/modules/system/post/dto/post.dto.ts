import { OmitType } from '@nestjs/mapped-types';

import { Allow } from 'class-validator';

import { PaginateDto } from '@/modules/core';

import { SysPost } from '../entities/sys-post.entity';

/**
 * 查询岗位
 */
export class ListPostDto extends PaginateDto {
  /** 岗位名称 */
  @Allow()
  postName?: string;

  /** 岗位编码 */
  @Allow()
  postCode?: string;

  /** 岗位状态（1正常 0停用） */
  @Allow()
  status?: string;
}

/**
 * 添加岗位
 */
export class CreatePostDto extends OmitType(SysPost, ['postId'] as const) {}

/**
 * 更新岗位
 */
export class UpdatePostDto extends OmitType(SysPost, [] as const) {}
