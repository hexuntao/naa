import { Module } from '@nestjs/common';

import { OnlineModule } from './online/online.module';

/**
 * 监控模块
 * @description 提供监控功能
 */
@Module({
  imports: [OnlineModule],
})
export class MonitorModule {}
