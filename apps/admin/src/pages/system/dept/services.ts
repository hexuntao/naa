import type {
  CreateDeptParams,
  UpdateDeptParams,
  DeptModel,
  DeptTreeResult,
  ListDeptParams,
} from './model';
import { httpRequest } from '@/utils/request';

/**
 * 查询树
 */
export function getTreeList(params?: ListDeptParams) {
  return httpRequest.get<DeptTreeResult[]>('/depts/tree', params);
}

/**
 * 查询树选项
 */
export function getOptionTree() {
  return httpRequest.get<DeptTreeResult[]>('/depts/tree-options');
}

/**
 * 查询详情
 */
export function getDetail(deptId: React.Key) {
  return httpRequest.get<DeptModel>(`/depts/${deptId}`);
}

/**
 * 添加
 */
export function add(params: CreateDeptParams) {
  return httpRequest.post('/depts', params);
}

/**
 * 更新
 */
export function update(deptId: number, params: UpdateDeptParams) {
  return httpRequest.put(`/depts/${deptId}`, params);
}

/**
 * 删除
 */
export function deletes(deptId: React.Key) {
  return httpRequest.delete(`/depts/${deptId}`);
}
