import * as path from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@/modules/config';
import { CoreModule, TokenConstants } from '@/modules/core';
import { ExcelModule } from '@/modules/excel';
import { GenModule } from '@/modules/gen/gen.module';
import { LoggerModule, TypeORMLogger } from '@/modules/logger';
import { MonitorModule } from '@/modules/monitor/monitor.module';
import { MybatisModule } from '@/modules/mybatis';
import { SecurityModule } from '@/modules/security';
import { SharedModule } from '@/modules/shared/shared.module';
import { SystemModule } from '@/modules/system/system.module';

import * as configs from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      dir: path.join(__dirname, 'config'),
      data: configs,
    }),
    CoreModule.forRoot(),
    RedisModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          config: config.get<RedisModuleOptions['config']>('redis'),
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          ...config.get<TypeOrmModuleOptions>('database'),
          logger: new TypeORMLogger({
            appName: config.get('app.name'),
            logPath: path.join(__dirname, '../logs'),
          }),
        };
      },
      inject: [ConfigService],
    }),
    MybatisModule.forRoot({
      dtsPath: path.join(__dirname, './types/mapper.d.ts'),
      patterns: path.join(__dirname, '**/*.mapper.xml'),
    }),
    SecurityModule.forRootAsync({
      useFactory() {
        return {
          secret: TokenConstants.SECRET,
        };
      },
    }),
    LoggerModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          appName: config.get('app.name'),
          logPath: path.join(__dirname, '../logs'),
        };
      },
      inject: [ConfigService],
    }),
    ExcelModule.forRoot(),
    SharedModule,
    AuthModule,
    SystemModule,
    MonitorModule,
    GenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
