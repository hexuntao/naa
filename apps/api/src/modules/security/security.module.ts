import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './guards/auth.guard';
import { InnerAuthGuard } from './guards/inner-auth.guard';
import { RequireAuthGuard } from './guards/require-auth.guard';
import { SecurityAsyncOptions, SecurityOptions } from './interfaces/security-options.interface';
import { SECURITY_OPTIONS } from './security.constants';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

/**
 * 权限鉴权模块
 * @description 提供用户登录、鉴权、权限等功能
 */
@Global()
@Module({})
export class SecurityModule {
  static forRoot(options?: SecurityOptions): DynamicModule {
    return this.register({
      useFactory: () => options || {},
    });
  }

  static forRootAsync(options: SecurityAsyncOptions): DynamicModule {
    return this.register(options);
  }

  private static register(options: SecurityAsyncOptions) {
    const OptionsProvider: Provider = {
      provide: SECURITY_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    return {
      module: SecurityModule,
      imports: [
        JwtModule.registerAsync({
          async useFactory(...args: any) {
            const options: SecurityOptions = await OptionsProvider.useFactory(...args);
            return {
              global: true,
              secret: options.secret,
            };
          },
          inject: OptionsProvider.inject,
        }),
      ],
      providers: [
        OptionsProvider,
        AuthService,
        TokenService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: InnerAuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: RequireAuthGuard,
        },
      ],
      exports: [AuthService, TokenService],
    };
  }
}
