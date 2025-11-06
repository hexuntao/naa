import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AjaxResult, UserId } from '@/modules/core';
import { LoginType } from '@/modules/logger';
import { Public, TokenService } from '@/modules/security';

import { LoginDto } from './dto/login.dto';
import { LogService } from './log.service';
import { LoginService } from './login.service';

/**
 * 登录管理
 */
@ApiTags('登录管理')
@ApiBearerAuth()
@Controller('auth')
export class LoginController {
  constructor(
    private logService: LogService,
    private loginService: LoginService,
    private tokenService: TokenService,
  ) {}

  /**
   * 用户登录
   * @param form 登录账户信息
   */
  @Post('login')
  @Public()
  async login(@Body() form: LoginDto): Promise<AjaxResult> {
    try {
      const isEnableCaptcha = await this.loginService.isEnableImageCaptcha();
      isEnableCaptcha && (await this.loginService.verifyImageCaptcha(form));

      const user = await this.loginService.login(form);
      const token = await this.tokenService.createToken(user);

      this.logService.ok(LoginType.ACCOUNT_PASSWORD, form.username, '登录成功');
      return AjaxResult.success(token, '登录成功');
    } catch (error: any) {
      this.logService.fail(LoginType.ACCOUNT_PASSWORD, form.username, error?.message);
      throw error;
    }
  }

  /**
   * 用户退出
   */
  @Post('logout')
  async logout(): Promise<AjaxResult> {
    const token = this.tokenService.getToken();
    if (token) {
      await this.tokenService.delLoginUser(token);
    }
    return AjaxResult.success(null, '退出成功');
  }

  /**
   * 刷新 Token
   */
  @Post('refresh')
  async refresh(): Promise<AjaxResult> {
    const token = this.tokenService.getToken();
    if (token) {
      const loginUser = await this.tokenService.getLoginUser(token);
      if (loginUser) {
        await this.tokenService.refreshToken(loginUser);
      }
    }
    return AjaxResult.success(null, '刷新成功');
  }

  /**
   * 获取图片验证码
   */
  @Get('captchaImage')
  @Public()
  async captchaImage(): Promise<AjaxResult> {
    const isEnableCaptcha = await this.loginService.isEnableImageCaptcha();
    if (isEnableCaptcha) {
      return AjaxResult.success(await this.loginService.createImageCaptcha());
    }
    return AjaxResult.success();
  }

  /**
   * 查询用户缓存信息
   */
  @Get('userInfo')
  async getUserInfo(): Promise<AjaxResult> {
    const token = this.tokenService.getToken();
    const loginUser = await this.tokenService.getLoginUser(token);
    return AjaxResult.success(loginUser);
  }

  /**
   * 查询用户路由信息
   * @returns 用户路由信息
   */
  @Get('userRouters')
  async getUserRouters(@UserId() userId: number): Promise<AjaxResult> {
    const routers = await this.loginService.getUserRouters(userId);
    return AjaxResult.success(routers);
  }
}
