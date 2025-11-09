import { httpRequest } from '@/utils/request';
import { CreateConfigParams, ListConfigParams, UpdateConfigParams, ConfigModel } from './model';
import { PageResponse } from '@/components/Crud';

/**
 * 查询列表
 */
export function getPageList(params?: ListConfigParams) {
  return httpRequest.get<PageResponse<ConfigModel>>('/configs', params);
}

/**
 * 详情
 */
export function getDetail(configId: React.Key) {
  return httpRequest.get<ConfigModel>(`/configs/${configId}`);
}

/**
 * 添加
 */
export function add(params: CreateConfigParams) {
  return httpRequest.post('/configs', params);
}

/**
 * 更新
 */
export function update(configId: number, params: UpdateConfigParams) {
  return httpRequest.put(`/configs/${configId}`, params);
}

/**
 * 删除
 */
export function deletes(configIds: React.Key) {
  return httpRequest.delete(`/configs/${configIds}`);
}

/**
 * 查询键值
 */
export function configValue(configKey: React.Key) {
  return httpRequest.get<string>(`/configs/${configKey}/value`);
}

/**
 * 刷新参数配置缓存
 */
export function refreshConfigCache() {
  return httpRequest.delete(`/configs/refresh-cache`);
}
