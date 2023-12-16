/**
 * 全局环境变量
 */

import { toNumber } from 'lodash';
import { env } from './env';

export const APP_URL = env('APP_URL', '/');

export const API_HOST = env('API_HOST', '127.0.0.1');

export const API_PORT = env('API_PORT', (v) => toNumber(v), 6010);

export const API_PREFIX = env('API_PREFIX', 'api');

export const ADMIN_BASE_PREFIX = `/${env('ADMIN_PREFIX', 'admin')}/`;

export const API_URL_PREFIX = `/${API_PREFIX}`;

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? API_URL_PREFIX
    : APP_URL === '/'
      ? APP_URL
      : APP_URL + API_URL_PREFIX;

export const PROXY_API_URL = `http://${API_HOST}:${API_PORT}${API_URL_PREFIX}`;
