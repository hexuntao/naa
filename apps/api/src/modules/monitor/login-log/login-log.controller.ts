import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AjaxResult } from '@/modules/core';
import { Log, OperType } from '@/modules/logger';
import { RequirePermissions } from '@/modules/security';

import { ListLoginLogDto } from './dto/login-log.dto';
import { LoginLogService } from './login-log.service';

/**
 * 登录日志
 */
@ApiTags('登录日志')
@ApiBearerAuth()
@Controller('login-logs')
export class LoginLogController {
  constructor(private loginLogService: LoginLogService) {}

  /**
   * 查询登录日志列表
   * @param loginLog 登录日志信息
   * @returns 登录日志列表
   */
  @Get()
  @RequirePermissions('monitor:loginlog:list')
  async list(@Query() loginLog: ListLoginLogDto): Promise<AjaxResult> {
    return AjaxResult.success(await this.loginLogService.list(loginLog));
  }

  /**
   * 清空登录日志
   */
  @Delete('clear')
  @Log({ title: '登录日志', operType: OperType.CLEAN })
  @RequirePermissions('monitor:loginlog:delete')
  async clear(): Promise<AjaxResult> {
    return AjaxResult.success(await this.loginLogService.clear());
  }
}
