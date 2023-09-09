import merge from 'deepmerge';
import { ConfigEnv, UserConfig } from 'vite';

import { createPlugins } from './plugins';
import { Configure } from './types';
import { pathResolve } from './utils';

export const createConfig = (params: ConfigEnv, configure?: Configure): UserConfig => {
  const isBuild = params.command === 'build';
  return merge<UserConfig>(
    {
      resolve: {
        alias: {
          '@': pathResolve('src'),
        },
      },
      css: {
        modules: {
          localsConvention: 'camelCaseOnly',
        },
      },
      server: {
        port: 6020, // 指定服务器端口
        open: true, // 开发服务器启动时，自动在浏览器打开
        strictPort: false, // 设为 true 时，若端口已被占用会直接退出，不会尝试下一个可用端口
        https: false, // 是否开启 https 服务
        cors: true, // 允许跨域
        // 配置代理
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:6010/api', // 接口地址。
            changeOrigin: true, // 接口跨域。
            secure: false, // 启用 https 服务时需要配置。
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
      plugins: createPlugins(isBuild),
    },
    typeof configure === 'function' ? configure(params, isBuild) : {},
    {
      arrayMerge: (_d, s, _o) => Array.from(new Set([..._d, ...s])),
    },
  );
};
