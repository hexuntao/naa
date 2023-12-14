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

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // plugin
    ConfigModule.forRoot({
      dir: path.join(__dirname, 'config'),
    }),

    RedisModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          config: config.get<RedisModuleOptions['config']>('redis.defalut'),
        };
      },
      inject: [ConfigService],
    }),

    MybatisModule.forRoot({
      dtsPath: path.join(__dirname, './types/mapper.d.ts'),
      patterns: path.join(__dirname, '**/*.mapper.xml'),
    }),

    TypeOrmModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          ...config.get<TypeOrmModuleOptions>('datasource.defalut'),
          logger: new TypeORMLogger({
            appName: config.get('app.name'),
            logPath: path.join(__dirname, '../logs'),
          }),
        };
      },
      inject: [ConfigService],
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

    // common
    CoreModule.forRoot(),

    ExcelModule.forRoot(),

    SharedModule,

    AuthModule,
    SystemModule,
    MonitorModule,
    GenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
