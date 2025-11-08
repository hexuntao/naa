import { resolve } from 'path';

import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule, RedisModuleOptions } from '@nestjs-modules/ioredis';

import { AuthModule } from '@/modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@/modules/config';
import { CoreModule } from '@/modules/core';
import { DataScopeModule } from '@/modules/datascope';
import { ExcelModule } from '@/modules/excel';
import { FileModule } from '@/modules/file/file.module';
import { GenModule } from '@/modules/gen/gen.module';
import { LoggerModule, LoggerOptions, TypeORMLogger } from '@/modules/logger';
import { MonitorModule } from '@/modules/monitor/monitor.module';
import { MybatisModule } from '@/modules/mybatis';
import { SecurityModule, SecurityOptions } from '@/modules/security';
import { SystemModule } from '@/modules/system/system.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cwd: resolve(__dirname, 'config'),
    }),
    MybatisModule.forRoot({
      cwd: __dirname,
      globs: ['**/*.mapper.xml'],
    }),
    RedisModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          config: config.get<RedisModuleOptions['config']>('redis'),
        };
        // return {type: 'single',
        //   options: config.get<RedisModuleOptions['config']>('redis'),
        // }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(config: ConfigService) {
        return {
          ...config.get<TypeOrmModuleOptions>('datasource'),
          logger: new TypeORMLogger(config.get<LoggerOptions>('logger')),
        };
      },
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory(config: ConfigService) {
        return config.get<BullModuleOptions>('bull');
      },
      inject: [ConfigService],
    }),

    CoreModule.forRoot(),
    SecurityModule.forRootAsync({
      useFactory(config: ConfigService) {
        return config.get<SecurityOptions>('security');
      },
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      useFactory(config: ConfigService) {
        return config.get<LoggerOptions>('logger');
      },
      inject: [ConfigService],
    }),
    ExcelModule.forRoot(),
    DataScopeModule.forRoot(),

    AuthModule,
    FileModule,
    MonitorModule,
    GenModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
