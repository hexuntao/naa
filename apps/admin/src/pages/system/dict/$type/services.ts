import type {
  DictTypeModel,
  CreateDictTypeParams,
  UpdateDictTypeParams,
  ListDictTypeParams,
} from './model';
import { httpRequest } from '@/utils/request';
import { PageResponse } from '@/components/Crud';

/**
 * 分页列表
 */
export function getPageList(params?: ListDictTypeParams) {
  return httpRequest.get<PageResponse<DictTypeModel>>('/dict/types', params);
}

/**
 * 查询详情
 */
export function getDetail(postId: React.Key) {
  return httpRequest.get<DictTypeModel>(`/dict/types/${postId}`);
}

/**
 * 添加
 */
export function add(params: CreateDictTypeParams) {
  return httpRequest.post('/dict/types', params);
}

/**
 * 更新
 */
export function update(dictId: number, params: UpdateDictTypeParams) {
  return httpRequest.put(`/dict/types/${dictId}`, params);
}

/**
 * 删除
 */
export function deletes(dictIds: number | string | React.Key) {
  return httpRequest.delete(`/dict/types/${dictIds}`);
}

/**
 * 根据字典类型查询字典数据列表
 */
export function getListByType(type: string) {
  return httpRequest.get<DictTypeModel[]>(`/dict/types/option/${type}`);
}

/**
 * 刷新字典缓存
 */
export function refreshDictCache() {
  return httpRequest.delete<DictTypeModel[]>(`/dict/types/refresh-cache`);
}
