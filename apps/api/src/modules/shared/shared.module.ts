import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { OperLogModule } from '@/modules/system/oper-log/oper-log.module';

import { SysLogInterceptor } from './interceptors/log.interceptor';

/**
 * 共享模块
 * @description 提供全局共享功能
 */
@Global()
@Module({
  imports: [OperLogModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SysLogInterceptor,
    },
  ],
})
export class SharedModule {}
