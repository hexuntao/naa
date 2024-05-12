import { OmitType } from '@nestjs/mapped-types';

import { Allow } from 'class-validator';

import { PaginateDto } from '@/modules/core';

import { JobLog } from '../entities/job-log.entity';

/**
 * 查询任务日志
 */
export class ListJobLogDto extends PaginateDto {
  /** 任务ID */
  @Allow()
  jobId?: number;

  /** 任务名称 */
  @Allow()
  jobName?: string;

  /** 任务组名 */
  @Allow()
  jobGroup?: string;

  /** 调用目标 */
  @Allow()
  invokeTarget?: string;

  /** 状态（1成功 0失败） */
  @Allow()
  status?: string;
}

/**
 * 添加任务日志
 */
export class CreateJobLogDto extends OmitType(JobLog, ['jobLogId'] as const) {}

/**
 * 更新任务日志
 */
export class UpdateJobLogDto extends OmitType(JobLog, [] as const) {}
