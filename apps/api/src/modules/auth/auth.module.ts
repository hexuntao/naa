import { Module } from '@nestjs/common';

import { LoginModule } from './login/login.module';

/**
 * 认证模块
 * @description 提供认证功能
 */
@Module({
  imports: [LoginModule],
})
export class AuthModule {}
