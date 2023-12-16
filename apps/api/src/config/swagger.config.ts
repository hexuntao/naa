import { env } from './env';

export const swagger = {
  // 默认生产环境不开启
  enabled: env('SWAGGER_ENABLED', (v) => JSON.parse(v), process.env.NODE_ENV === 'development'),
  title: env('SWAGGER_TITLE', 'api docs'),
  path: env('SWAGGER_PATH', 'api-docs'),
  description: env('SWAGGER_DESCRIPTION', 'naa docs'),
  contact: {
    name: env('APP_AUTHOR', 'hexuntao'),
    url: env('APP_GITHUB', 'https://github.com/hexuntao/naa'),
    email: env('APP_EMAIL', 'hexuntao@gmail.com'),
  },
  license: {
    name: env('APP_LICENSE_NAME', 'MIT'),
    url: env('APP_LICENSE_URL', 'https://github.com/hexuntao/naa/blob/main/LICENSE'),
  },
};

export type SwaggerConfig = typeof swagger;
