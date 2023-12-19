import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysUser } from '@/modules/system/user/entities/sys-user.entity';

import { DeptController } from './dept.controller';
import { DeptService } from './dept.service';
import { SysDept } from './entities/sys-dept.entity';

/**
 * 部门模块
 * @description 提供部门相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysDept, SysUser])],
  controllers: [DeptController],
  providers: [DeptService],
  exports: [DeptService],
})
export class DeptModule {}
