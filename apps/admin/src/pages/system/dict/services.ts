import type {
  DictTypeModel,
  CreateDictTypeParams,
  ListDictTypeParams,
  UpdateDictTypeParams,
} from './model';
import { httpRequest } from '@/utils/request';
import { PageResponse } from '@/components/Crud';

/**
 * 分页列表
 */
export function getPageList(params?: ListDictTypeParams) {
  return httpRequest.get<PageResponse<DictTypeModel>>('/dict/type/list', params);
}

/**
 * 查询详情
 */
export function getDetail(postId: React.Key) {
  return httpRequest.get<DictTypeModel>(`/dict/type/info/${postId}`);
}

/**
 * 添加
 */
export function add(params: CreateDictTypeParams) {
  return httpRequest.post('/dict/type/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateDictTypeParams) {
  return httpRequest.put('/dict/type/update', params);
}

/**
 * 删除
 */
export function deletes(postIds: React.Key) {
  return httpRequest.delete(`/dict/type/delete/${postIds}`);
}

/**
 * 根据字典类型查询字典数据列表
 */
export function getListByType(type: string) {
  return httpRequest.get<DictTypeModel[]>(`/dict/type/option/${type}`);
}
