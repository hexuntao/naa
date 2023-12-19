import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictDataController } from './dict-data.controller';
import { DictDataService } from './dict-data.service';
import { SysDictData } from './entities/sys-dict-data.entity';

/**
 * 字典数据模块
 * @description 提供字典数据相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysDictData])],
  controllers: [DictDataController],
  providers: [DictDataService],
})
export class DictDataModule {}
