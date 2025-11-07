import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { MYBATIS_OPTIONS } from './mybatis.constants';
import { MybatisOptions, MybatisAsyncOptions } from './mybatis.interface';
import { MybatisService } from './mybatis.service';

/**
 * Mybatis 模块
 * @description 加载 Mapper 文件，生成 Mapper 声明文件，并提供获取 SQL 语句的方法
 */
@Global()
@Module({})
export class MybatisModule {
  static forRoot(options?: MybatisOptions): DynamicModule {
    return this.register({
      useFactory: () => options || {},
    });
  }

  static forRootAsync(options: MybatisAsyncOptions): DynamicModule {
    return this.register(options);
  }

  private static register(options: MybatisAsyncOptions): DynamicModule {
    const OptionsProvider: Provider = {
      provide: MYBATIS_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    return {
      module: MybatisModule,
      providers: [OptionsProvider, MybatisService],
      exports: [MybatisService],
    };
  }
}
