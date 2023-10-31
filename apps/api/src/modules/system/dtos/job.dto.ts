import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { toNumber } from 'lodash';

import { DtoValidation } from '@/modules/core/decorators';
import { SelectTrashMode } from '@/modules/database/constants';
import { IsDataExist, IsTreeUnique, IsTreeUniqueExist } from '@/modules/database/constraints';

import { JobEntity } from '../entities';

/**
 * 树形查询验证
 */
@DtoValidation({ type: 'query' })
export class QueryJobTreeDto {
  /**
   * 根据软删除状态查询
   */
  @IsEnum(SelectTrashMode)
  @IsOptional()
  trashed?: SelectTrashMode;
}

/**
 * 新增验证
 */
@DtoValidation({ groups: ['create'] })
export class CreateJobDto {
  /**
   * 名称
   */
  @IsTreeUnique(JobEntity, {
    groups: ['create'],
    message: '名称重复',
  })
  @IsTreeUniqueExist(JobEntity, {
    groups: ['update'],
    message: '名称重复',
  })
  @MaxLength(25, {
    always: true,
    message: '岗位名称长度不得超过$constraint1',
  })
  @IsNotEmpty({ groups: ['create'], message: '名称不得为空' })
  @IsOptional({ groups: ['update'] })
  name = '';

  /**
   * 父分类ID
   */
  @IsDataExist(JobEntity, { always: true, message: '父分类不存在' })
  @IsUUID(undefined, { always: true, message: '父分类ID格式不正确' })
  @ValidateIf((value) => value.parent !== null && value.parent)
  @IsOptional({ always: true })
  @Transform(({ value }) => (value === 'null' ? null : value))
  parent?: string;

  /**
   * 排序
   */
  @Transform(({ value }) => toNumber(value))
  @Min(0, { always: true, message: '排序值必须大于0' })
  @IsNumber(undefined, { always: true })
  @IsOptional({ always: true })
  sort?: number = 1;
}

/**
 * 更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdateJobDto extends PartialType(CreateJobDto) {
  /**
   * 待更新ID
   */
  @IsUUID(undefined, { groups: ['update'], message: 'ID格式错误' })
  @IsDefined({ groups: ['update'], message: 'ID必须指定' })
  id: string;
}
