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
  return httpRequest.get<PageResponse<DictDataModel>>('/dict/datas', params);
}

/**
 * 查询详情
 */
export function getDetail(dictId: React.Key) {
  return httpRequest.get<DictDataModel>(`/dict/datas/${dictId}`);
}

/**
 * 添加
 */
export function add(params: CreateDictDataParams) {
  return httpRequest.post('/dict/datas', params);
}

/**
 * 更新
 */
export function update(dictId: number, params: UpdateDictDataParams) {
  return httpRequest.put(`/dict/datas/${dictId}`, params);
}

/**
 * 删除
 */
export function deletes(dictIds: number | string | React.Key) {
  return httpRequest.delete(`/dict/datas/${dictIds}`);
}

/**
 * 根据字典类型查询字典数据列表
 */
export function dictDataOptions(type: string) {
  return httpRequest.get<DictDataModel[]>(`/dict/datas/options/${type}`);
}
