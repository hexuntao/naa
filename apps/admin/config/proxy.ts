import { API_URL_PREFIX, PROXY_API_URL } from './constants';

/**
 * 代理配置, 生产环境不生效
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  [API_URL_PREFIX]: {
    target: PROXY_API_URL,
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
