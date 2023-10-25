import { resolve } from 'path';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { isNil } from 'lodash';
import { DataSource, ObjectLiteral, ObjectType, Repository, SelectQueryBuilder } from 'typeorm';

import { Configure } from '../config/configure';
import { createConnectionOptions } from '../config/helpers';
import { ConfigureFactory, ConfigureRegister } from '../config/types';

import { deepMerge } from '../core/helpers';

import { CUSTOM_REPOSITORY_METADATA } from './constants';
import {
  DbConfig,
  DbOptions,
  OrderQueryType,
  PaginateOptions,
  PaginateReturn,
  TypeormOption,
} from './types';

/**
 * 分页函数
 * @param qb queryBuilder实例
 * @param options 分页选项
 */
export const paginate = async <E extends ObjectLiteral>(
  qb: SelectQueryBuilder<E>,
  options: PaginateOptions,
): Promise<PaginateReturn<E>> => {
  const limit = isNil(options.limit) || options.limit < 1 ? 1 : options.limit;
  const page = isNil(options.page) || options.page < 1 ? 1 : options.page;
  const start = page >= 1 ? page - 1 : 0;
  const totalItems = await qb.getCount();
  qb.take(limit).skip(start * limit);
  const items = await qb.getMany();
  const totalPages =
    totalItems % limit === 0 ? Math.floor(totalItems / limit) : Math.floor(totalItems / limit) + 1;
  const remainder = totalItems % limit !== 0 ? totalItems % limit : limit;
  const itemCount = page < totalPages ? limit : remainder;
  return {
    items,
    meta: {
      totalItems,
      itemCount,
      perPage: limit,
      totalPages,
      currentPage: page,
    },
  };
};

/**
 * 数据手动分页函数
 * @param options 分页选项
 * @param data 数据列表
 */
export function treePaginate<E extends ObjectLiteral>(
  options: PaginateOptions,
  data: E[],
): PaginateReturn<E> {
  const { page, limit } = options;
  let items: E[] = [];
  const totalItems = data.length;
  const totalRst = totalItems / limit;
  const totalPages =
    totalRst > Math.floor(totalRst) ? Math.floor(totalRst) + 1 : Math.floor(totalRst);
  let itemCount = 0;
  if (page <= totalPages) {
    itemCount = page === totalPages ? totalItems - (totalPages - 1) * limit : limit;
    const start = (page - 1) * limit;
    items = data.slice(start, start + itemCount);
  }
  return {
    meta: {
      itemCount,
      totalItems,
      perPage: limit,
      totalPages,
      currentPage: page,
    },
    items,
  };
}

/**
 * 为查询添加排序,默认排序规则为DESC
 * @param qb 原查询
 * @param alias 别名
 * @param orderBy 查询排序
 */
export const getOrderByQuery = <E extends ObjectLiteral>(
  qb: SelectQueryBuilder<E>,
  alias: string,
  orderBy?: OrderQueryType,
) => {
  if (isNil(orderBy)) return qb;
  if (typeof orderBy === 'string') return qb.orderBy(`${alias}.${orderBy}`, 'DESC');
  if (Array.isArray(orderBy)) {
    for (const item of orderBy) {
      typeof item === 'string'
        ? qb.addOrderBy(`${alias}.${item}`, 'DESC')
        : qb.addOrderBy(`${alias}.${item.name}`, item.order);
    }
    return qb;
  }
  return qb.orderBy(`${alias}.${(orderBy as any).name}`, (orderBy as any).order);
};

/**
 * 获取自定义Repository的实例
 * @param dataSource 数据连接池
 * @param Repo repository类
 */
export const getCustomRepository = <T extends Repository<E>, E extends ObjectLiteral>(
  dataSource: DataSource,
  Repo: ClassType<T>,
): T => {
  if (isNil(Repo)) return null;
  const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo);
  if (!entity) return null;
  const base = dataSource.getRepository<ObjectType<any>>(entity);
  return new Repo(base.target, base.manager, base.queryRunner) as T;
};

/**
 * 创建数据库配置
 * @param options 自定义配置
 */
export const createDbOptions = (options: DbConfig) => {
  const newOptions: DbOptions = {
    common: deepMerge(
      {
        charset: 'utf8mb4',
        logging: ['error'],
        paths: {
          migration: resolve(__dirname, '../../database'),
        },
      },
      options.common ?? {},
      'replace',
    ),
    connections: createConnectionOptions(options.connections ?? []),
  };
  newOptions.connections = newOptions.connections.map((connection) => {
    const entities = connection.entities ?? [];
    const newOption = { ...connection, entities };
    return deepMerge(
      newOptions.common,
      {
        ...newOption,
        autoLoadEntities: false,
      } as any,
      'replace',
    ) as TypeormOption;
  });
  return newOptions;
};

/**
 * 数据库配置构造器创建
 * @param register
 */
export const createDbConfig: (
  register: ConfigureRegister<RePartial<DbConfig>>,
) => ConfigureFactory<DbConfig, DbOptions> = (register) => ({
  register,
  hook: (configure, value) => createDbOptions(value),
  defaultRegister: () => ({
    common: {
      charset: 'utf8mb4',
      logging: ['error'],
    },
    connections: [],
  }),
});

/**
 * 在模块上注册entity
 * @param configure 配置类实例
 * @param entities entity类列表
 * @param dataSource 数据连接名称,默认为default
 */
export const addEntities = async (
  configure: Configure,
  entities: EntityClassOrSchema[] = [],
  dataSource = 'default',
) => {
  const database = await configure.get<DbOptions>('database');
  if (isNil(database)) throw new Error(`Typeorm have not any config!`);
  const dbConfig = database.connections.find(({ name }) => name === dataSource);
  if (isNil(dbConfig)) throw new Error(`Database connection named ${dataSource} not exists!`);
  const oldEntities = (dbConfig.entities ?? []) as ObjectLiteral[];
  /**
   * 更新数据库配置,添加上新的模型
   */
  configure.set(
    'database.connections',
    database.connections.map((connection) =>
      connection.name === dataSource
        ? {
            ...connection,
            entities: [...entities, ...oldEntities],
          }
        : connection,
    ),
  );
  return TypeOrmModule.forFeature(entities, dataSource);
};
