import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SysUserPost } from '@/modules/system/user/entities/sys-user-post.entity';
import { SysPost } from './entities/sys-post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

/**
 * 岗位模块
 * @description 提供岗位相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysPost, SysUserPost])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
