import { DynamicModule, Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { NestGlobalContext } from './context/global';
import { NestGlobalFilters } from './exceptions-filters/global';
import { NestGlobalGuards } from './guards/global';
import { NestGlobalMiddlewares } from './middlewares/global';
import { NestGlobalPipes } from './pipes/global';

/**
 * 核心模块
 * @description 提供全局的管道、守卫、过滤器、中间件等
 */
@Global()
@Module({})
export class CoreModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ClsModule.forRoot({
          global: true,
          middleware: {
            mount: true,
            saveReq: true,
            saveRes: true,
            generateId: true,
          },
        }),
      ],
      providers: [
        ...NestGlobalPipes,
        ...NestGlobalGuards,
        ...NestGlobalFilters,
        ...NestGlobalContext,
      ],
      exports: [...NestGlobalContext],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...NestGlobalMiddlewares).forRoutes('/');
  }
}
