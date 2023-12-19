import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysOperLog } from './entities/sys-oper-log.entity';
import { OperLogController } from './oper-log.controller';
import { OperLogService } from './oper-log.service';

/**
 * 操作日志模块
 * @description 提供操作日志相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysOperLog])],
  controllers: [OperLogController],
  providers: [OperLogService],
  exports: [OperLogService],
})
export class OperLogModule {}
