import { httpRequest } from '@/utils/request';
import type { LoginLogListResult, ListLoginLogParams } from './model';
import { PageResponse } from '@/components/Crud';

/**
 * 查询列表
 */
export function getPageList(params?: ListLoginLogParams) {
  return httpRequest.get<PageResponse<LoginLogListResult>>('/login/log/list', params);
}

/**
 * 清空登录日志
 */
export function clearLoginLog() {
  return httpRequest.delete('/login/log/clear');
}
