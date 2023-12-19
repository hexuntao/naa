import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GenTableColumn } from './gen/entities/gen-table-column.entity';
import { GenTable } from './gen/entities/gen-table.entity';
import { GenController } from './gen/gen.controller';
import { GenMapper } from './gen/gen.mapper';
import { GenService } from './gen/gen.service';

/**
 * 代码生成模块
 * @description 提供代码生成相关功能
 */
@Module({
  imports: [TypeOrmModule.forFeature([GenTable, GenTableColumn])],
  controllers: [GenController],
  providers: [GenMapper, GenService],
})
export class GenModule {}
