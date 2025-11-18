/**
 * 全局环境变量
 */

import { toNumber } from 'lodash';
import { env } from './env';

export const API_PORT = env('API_PORT', (v) => toNumber(v), 6010);

export const API_PREFIX = env('API_PREFIX', 'api');

export const ADMIN_BASE_PREFIX = `/${env('ADMIN_PREFIX', 'admin')}/`;

export const API_URL_PREFIX = `/${API_PREFIX}`;

export const API_URL =
  process.env.NODE_ENV === 'development' ? API_URL_PREFIX : `${env('API_URL', API_URL_PREFIX)}`;

export const PROXY_API_URL = `http://localhost:${API_PORT}${API_URL_PREFIX}`;
