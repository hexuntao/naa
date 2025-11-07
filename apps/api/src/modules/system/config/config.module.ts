import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { SysConfig } from './entities/sys-config.entity';
import { ConfigCacheService } from './config-cache.service';

/**
 * 系统配置模块
 * @description 提供系统配置相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysConfig])],
  controllers: [ConfigController],
  providers: [ConfigService, ConfigCacheService],
  exports: [ConfigService],
})
export class ConfigModule {}
