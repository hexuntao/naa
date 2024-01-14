import { Module } from '@nestjs/common';

import { JobModule } from './job/job.module';
import { OnlineModule } from './online/online.module';

/**
 * 监控模块
 * @description 提供监控功能
 */
@Module({
  imports: [JobModule, OnlineModule],
})
export class MonitorModule {}
