/**
 * umi-Request 请求封装
 */

import 'nprogress/nprogress.css';

import { RequestConfig, RequestError, RequestOptions, history } from '@umijs/max';
import { message, Modal } from 'antd';
import { debounce } from 'lodash';
import Nprogress from 'nprogress';

import { getToken, removeToken } from '@/utils/auth';
import { PageEnum } from '@/enums/pageEnum';

const status = { isOpen: true };

/**
 * 防抖函数统一处理异常错误
 */
const debounceError = debounce((content: string, duration = 3) => {
  message.error(content, duration);
}, 300);

/**
 * @name Request 运行时请求配置
 * @doc https://umijs.org/docs/max/request
 */
const umiRequest: RequestConfig = {
  // baseURL: BASEURL.API, // 请求前缀
  timeout: 60 * 1000, // 超时时间，默认 30 s
  // 请求拦截器
  requestInterceptors: [
    [
      (config: RequestOptions) => {
        const token = getToken();
        const isToken = config.isToken === false;
        if (token && !isToken) {
          if (!config.headers) {
            config.headers = {};
          }
          config.headers.Authorization = 'Bearer ' + token;
        }
        config.url = `${BASE_URL}${config.url}`;
        Nprogress.start();
        return config;
      },
      (error: any) => {
        Nprogress.done();
        return Promise.reject(error);
      },
    ],
  ],
  // 响应拦截器
  responseInterceptors: [
    [
      (response: any) => {
        Nprogress.done();

        const code = response.data.code || 200;
        const msg = response.data.message || '系统未知错误，请反馈给管理员';
        const getResponse = response.config.getResponse;
        const skipErrorHandler = response.config.skipErrorHandler;

        // 错误判断
        if (skipErrorHandler) {
          if (code !== 200) {
            return Promise.reject(new Error(msg));
          }
        } else if (code === 401) {
          if (status.isOpen) {
            status.isOpen = false;
            Modal.confirm({
              title: '系统提示',
              content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
              cancelText: '取消',
              okText: '重新登录',
              onOk() {
                status.isOpen = true;
                removeToken();
                history.push(PageEnum.BASE_LOGIN);
              },
              onCancel() {
                status.isOpen = true;
              },
            });
          }

          return Promise.reject(new Error(msg));
        } else if (code !== 200) {
          debounceError(msg);
          return Promise.reject(new Error(msg));
        }

        return getResponse ? response : response.data;
      },
    ],
  ],
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误接收及处理
    errorHandler: (error: RequestError & any, opts: RequestOptions) => {
      Nprogress.done();
      const skipErrorHandler = error.config.skipErrorHandler;

      if (skipErrorHandler) {
        return Promise.reject(error);
      }

      debounceError('系统未知错误，请反馈给管理员');
      return Promise.reject(error);
    },
  },
};

export default umiRequest;
