/**
 * 数据库配置
 */

import { createDbConfig } from '@/modules/database/helpers';

export const database = createDbConfig((configure) => ({
  common: {
    // synchronize: true,
  },
  connections: [
    {
      // 以下为mysql配置
      type: 'mysql',
      host: configure.env.get('DB_HOST', '127.0.0.1'),
      port: configure.env.get('DB_PORT', 3306),
      username: configure.env.get('DB_USER', 'root'),
      password: configure.env.get('DB_PASSWORD', '123456'),
      database: configure.env.get('DB_NAME', '3r-room'),
    },
    // {
    // 以下为sqlite配置
    // type: 'better-sqlite3',
    // database: resolve(__dirname, '../../database.db'),
    // },
  ],
}));
