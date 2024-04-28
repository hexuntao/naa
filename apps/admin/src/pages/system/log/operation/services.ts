import { PageResponse } from '@/components/Crud';
import type { OperLogModel, ListOperLogParams } from './model';
import { httpRequest } from '@/utils/request';

/**
 * 查询列表
 */
export function getPageList(params?: ListOperLogParams) {
  return httpRequest.get<PageResponse<OperLogModel>>('/oper/log/list', params);
}

/**
 * 清空操作日志
 */
export function clearOperLog() {
  return httpRequest.delete('/oper/log/clear');
}
