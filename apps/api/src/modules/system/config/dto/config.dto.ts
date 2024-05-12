import { OmitType } from '@nestjs/mapped-types';

import { Allow } from 'class-validator';

import { PaginateDto } from '@/modules/core';

import { SysConfig } from '../entities/sys-config.entity';

/**
 * 查询参数配置
 */
export class ListConfigDto extends PaginateDto {
  /** 参数名称 */
  @Allow()
  configName?: string;

  /** 参数键名 */
  @Allow()
  configKey?: string;

  /** 状态（1正常 0停用） */
  @Allow()
  status?: string;
}

/**
 * 添加参数配置
 */
export class CreateConfigDto extends OmitType(SysConfig, ['configId'] as const) {}

/**
 * 更新参数配置
 */
export class UpdateConfigDto extends OmitType(SysConfig, [] as const) {}
