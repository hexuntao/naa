import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictDataController } from './dict-data.controller';
import { DictDataService } from './dict-data.service';
import { DictTypeController } from './dict-type.controller';
import { DictTypeService } from './dict-type.service';
import { SysDictData } from './entities/sys-dict-data.entity';
import { SysDictType } from './entities/sys-dict-type.entity';

/**
 * 字典数据模块
 * @description 提供字典数据相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([SysDictType, SysDictData])],
  controllers: [DictTypeController, DictDataController],
  providers: [DictTypeService, DictDataService],
})
export class DictModule {}
