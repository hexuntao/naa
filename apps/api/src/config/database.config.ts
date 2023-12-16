import { toNumber } from 'lodash';

import { env } from './env';

export const database = {
  type: 'mysql',
  port: env('DB_PORT', (v) => toNumber(v), 3306),
  host: env('DB_HOST', '127.0.0.1'),
  username: env('DB_USER', 'root'),
  password: env('DB_PASSWORD', '123456'),
  database: env('DB_NAME', 'naa'),
  /** 可以在开发环境下同步entity的数据结构到数据库,生产环境建议不开启 */
  synchronize: env('DB_SYNCHRONIZE', (v) => JSON.parse(v), process.env.NODE_ENV === 'development'),
  /** 自动加载模块中注册的entity */
  autoLoadEntities: true,
  bigNumberStrings: false,
  supportBigNumbers: true,
};

export type DatabaseConfig = typeof database;
