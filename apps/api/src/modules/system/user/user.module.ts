import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@/modules/system/config/config.module';
import { DeptModule } from '@/modules/system/dept/dept.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { RoleModule } from '@/modules/system/role/role.module';

import { SysUserPost } from './entities/sys-user-post.entity';
import { SysUserRole } from './entities/sys-user-role.entity';
import { SysUser } from './entities/sys-user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

/**
 * 用户模块
 * @description 提供用户相关功能
 * @description 用户模块依赖于菜单模块、角色模块、配置模块
 */
@Module({
  imports: [
    MenuModule,
    DeptModule,
    RoleModule,
    ConfigModule,
    TypeOrmModule.forFeature([SysUser, SysUserRole, SysUserPost]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
