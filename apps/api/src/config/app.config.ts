import { toNumber } from 'lodash';

import { env } from './env';

export const app = {
  name: env('npm_package_name', '@naa/api'),
  domain: env('APP_URL', ''),
  host: env('API_HOST', '127.0.0.1'),
  port: env('API_PORT', (v) => toNumber(v), 6010),
  prefix: env('API_PREFIX', 'api'),
  socket: env('API_WEBSOCKETS', (v) => JSON.parse(v), false),
};

export type AppConfig = typeof app;
