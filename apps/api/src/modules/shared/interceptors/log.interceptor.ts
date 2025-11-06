import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { LogInterceptor } from '@/modules/logger';
import { OperLogService } from '@/modules/monitor/oper-log/oper-log.service';

/**
 * 操作日志记录拦截器
 */
@Injectable()
export class SysLogInterceptor extends LogInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(reflector: Reflector, operLogService: OperLogService) {
    super(reflector, operLogService);
  }
}
