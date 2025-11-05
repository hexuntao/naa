import { httpRequest } from '@/utils/request';
import { CreateConfigParams, ListConfigParams, UpdateConfigParams, ConfigModel } from './model';
import { PageResponse } from '@/components/Crud';

/**
 * 查询列表
 */
export function getPageList(params?: ListConfigParams) {
  return httpRequest.get<PageResponse<ConfigModel>>('/config/list', params);
}

/**
 * 详情
 */
export function getDetail(configId: React.Key) {
  return httpRequest.get<ConfigModel>(`/config/info/${configId}`);
}

/**
 * 添加
 */
export function add(params: CreateConfigParams) {
  return httpRequest.post('/config/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateConfigParams) {
  return httpRequest.put('/config/update', params);
}

/**
 * 删除
 */
export function deletes(configIds: React.Key) {
  return httpRequest.delete(`/config/delete/${configIds}`);
}

/**
 * 查询键值
 */
export function configValue(configKey: React.Key) {
  return httpRequest.get<string>(`/config/value/${configKey}`);
}
