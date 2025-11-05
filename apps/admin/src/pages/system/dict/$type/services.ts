import type {
  DictDataModel,
  CreateDictDataParams,
  ListDictDataParams,
  UpdateDictDataParams,
} from './model';
import { httpRequest } from '@/utils/request';
import { PageResponse } from '@/components/Crud';

/**
 * 分页列表
 */
export function getPageList(params?: ListDictDataParams) {
  return httpRequest.get<PageResponse<DictDataModel>>('/dict/data/list', params);
}

/**
 * 查询详情
 */
export function getDetail(postId: React.Key) {
  return httpRequest.get<DictDataModel>(`/dict/data/info/${postId}`);
}

/**
 * 添加
 */
export function add(params: CreateDictDataParams) {
  return httpRequest.post('/dict/data/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateDictDataParams) {
  return httpRequest.put('/dict/data/update', params);
}

/**
 * 删除
 */
export function deletes(postIds: React.Key) {
  return httpRequest.delete(`/dict/data/delete/${postIds}`);
}

/**
 * 根据字典类型查询字典数据列表
 */
export function dictDataOptions(type: string) {
  return httpRequest.get<DictDataModel[]>(`/dict/data/options/${type}`);
}
