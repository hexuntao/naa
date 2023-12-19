import { toNumber } from 'lodash';

import { env } from './env';

export const redis = {
  port: env('REIDS_PORT', (v) => toNumber(v), 6379),
  host: env('REDIS_HOST', '127.0.0.1'),
  username: env('REDIS_USER', undefined),
  password: env('REDIS_PASSWORD', undefined),
};

export type RedisConfig = typeof redis;
