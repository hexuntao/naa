import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AjaxResult } from '@/modules/core';
import { Log, OperType } from '@/modules/logger';
import { RequirePermissions } from '@/modules/security';
import { ListOperLogDto } from './dto/oper-log.dto';
import { OperLogService } from './oper-log.service';

/**
 * 操作日志
 */
@ApiTags('操作日志')
@ApiBearerAuth()
@Controller('oper-logs')
export class OperLogController {
  constructor(private operLogService: OperLogService) {}

  /**
   * 操作日志列表
   * @param operLog 操作日志信息
   * @returns 操作日志列表
   */
  @Get()
  @RequirePermissions('monitor:operlog:list')
  async list(@Query() operLog: ListOperLogDto): Promise<AjaxResult> {
    return AjaxResult.success(await this.operLogService.list(operLog));
  }

  /**
   * 清空操作日志
   */
  @Delete('clear')
  @Log({ title: '操作日志', operType: OperType.CLEAN })
  @RequirePermissions('monitor:operlog:delete')
  async clear(): Promise<AjaxResult> {
    return AjaxResult.success(await this.operLogService.clear());
  }
}
