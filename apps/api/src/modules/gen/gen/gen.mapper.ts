import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager } from 'typeorm';

import { MybatisService } from '@/modules/mybatis';

import { GenTableColumn } from './entities/gen-table-column.entity';
import { GenTable } from './entities/gen-table.entity';

@Injectable()
export class GenMapper {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    private mybatisService: MybatisService,
  ) {}

  /**
   * 查询数据库表列表
   * @param name 表名称
   * @param comment 表注释
   */
  async selectDbTableList(name: string, comment: string): Promise<GenTable[]> {
    const sql = this.mybatisService.getSql('gen.gen.mapper', 'selectDbTableList', {
      name: name || '',
      comment: comment || '',
    });
    return this.entityManager.query(sql);
  }

  /**
   * 根据名称查询数据库表列表
   * @param names 表名称
   */
  async selectDbTableListByNames(names: string[]): Promise<GenTable[]> {
    const sql = this.mybatisService.getSql('gen.gen.mapper', 'selectDbTableListByNames', {
      names,
    });
    return this.entityManager.query(sql);
  }

  /**
   * 根据名称查询表格列列表
   * @param name 表名称
   */
  async selectDbTableColumnsByName(name: string): Promise<GenTableColumn[]> {
    const sql = this.mybatisService.getSql('gen.gen.mapper', 'selectDbTableColumnsByName', {
      name,
    });
    return this.entityManager.query(sql);
  }
}
