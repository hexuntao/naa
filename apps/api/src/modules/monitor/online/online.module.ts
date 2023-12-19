import { Module } from '@nestjs/common';

import { OnlineController } from './online.controller';
import { OnlineService } from './online.service';

/**
 * 在线用户模块
 * @description 提供在线用户相关功能
 */
@Module({
  imports: [],
  controllers: [OnlineController],
  providers: [OnlineService],
})
export class OnlineModule {}
