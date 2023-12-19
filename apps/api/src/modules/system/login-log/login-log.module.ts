import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysLoginLog } from './entities/sys-login-log.entity';
import { LoginLogController } from './login-log.controller';
import { LoginLogService } from './login-log.service';

/**
 * 登录日志模块
 * @description 提供登录日志相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysLoginLog])],
  controllers: [LoginLogController],
  providers: [LoginLogService],
  exports: [LoginLogService],
})
export class LoginLogModule {}
