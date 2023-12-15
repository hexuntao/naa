import { eq, get } from 'lodash';
import { REQUEST_CODE } from './enums';
import { Response, PageResponse } from './types';
import { RequestData } from '@ant-design/pro-components';

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
    data: (get(data, 'items') || get(response, 'data') || []) as T[],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data, 'meta.totalItems', 0) as number,
  };
};
