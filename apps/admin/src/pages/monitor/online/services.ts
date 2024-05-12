import type { OnlineInfoResult, ListOnlineParams } from './model';
import { httpRequest } from '@/utils/request';

/**
 * 获取列表
 */
export function getPageList(params?: ListOnlineParams) {
  return httpRequest.get<OnlineInfoResult[]>('/online/list', params);
}

/**
 * 强退在线用户
 */
export function logoutOnline(userSk: string) {
  return httpRequest.delete(`/online/${userSk}`);
}
