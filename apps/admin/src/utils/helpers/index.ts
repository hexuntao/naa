import { eq, get } from 'lodash';
import {
  PageResponse,
  Response,
  REQUEST_CODE,
  getLocalStorageItem,
  LockSleepTypes,
  LOCALSTORAGE,
  removeLocalStorageItem,
  setLocalStorageItem,
  ROUTES,
} from '..';
import { RequestData } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { stringify } from 'querystring';

export * from './storage';

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code?: number): boolean => eq(code, REQUEST_CODE.SUCCESS);

/**
 * @description: 格式化请求数据
 */
export const formatResponse = <T extends any[]>(
  response: Response<T> | Response<PageResponse<T[number]>>,
): RequestData<T[number]> => {
  // 解构响应值
  const { code, data } = response;
  return {
    data: (get(data, 'list') || get(response, 'data') || []) as T[],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data, 'total', 0) as number,
  };
};

/**
 * @description: 判断是否是HTTP或HTTPS链接
 * @param {string} link
 */
export const isHttpLink = (link: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%_.~+]*)*' + // path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(link);
};

/**
 * @description: 退出登录返回到登录页
 * @Author: 白雾茫茫丶
 */
export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 lockSleep 信息
  const lockSleep = getLocalStorageItem<LockSleepTypes>(LOCALSTORAGE.LOCKSLEEP);
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 移除 token
  removeLocalStorageItem(LOCALSTORAGE.ACCESSTOKEN);
  // 取消睡眠弹窗
  if (lockSleep) {
    setLocalStorageItem(LOCALSTORAGE.LOCKSLEEP, { ...lockSleep, isSleep: false });
  }
  // 重定向地址
  if (window.location.pathname !== ROUTES.LOGIN && !redirect) {
    history.replace({
      pathname: ROUTES.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};
