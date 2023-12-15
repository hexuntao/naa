import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class LoginDto {
  /**
   * 验证码 code
   */
  @Allow()
  code?: string;

  /**
   * 验证码 uuid
   */
  @Allow()
  uuid?: string;

  /**
   * 用户名
   */
  @Allow()
  @ApiProperty({
    default: 'username',
  })
  username: string;

  /**
   * 用户密码
   */
  @Allow()
  @ApiProperty({
    default: '123456',
  })
  password: string;
}
