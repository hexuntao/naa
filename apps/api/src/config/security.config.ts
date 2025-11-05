import { env } from './env';

export const security = {
  jwt: {
    secret: env('SECURITY_JWT_SECRET', 'abcdefghijklmnopqrstuvwxyz'),
  },
};

export type SecurityConfig = typeof security;
