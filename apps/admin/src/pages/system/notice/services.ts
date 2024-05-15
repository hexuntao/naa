import { CreateNoticeParams, ListNoticeParams, UpdateNoticeParams, NoticeModel } from './model';
import { httpRequest } from '@/utils/request';
import { PageResponse } from '@/components/Crud';

/**
 * 查询分页列表
 */
export function getPageList(params?: ListNoticeParams) {
  return httpRequest.get<PageResponse<NoticeModel>>('/notice/list', params);
}

/**
 * 查询详情
 */
export function getDetail(noticeId: React.Key) {
  return httpRequest.get<NoticeModel>(`/notice/info/${noticeId}`);
}

/**
 * 添加
 */
export function add(params: CreateNoticeParams) {
  return httpRequest.post('/notice/add', params);
}

/**
 * 更新
 */
export function update(params: UpdateNoticeParams) {
  return httpRequest.put('/notice/update', params);
}

/**
 * 删除
 */
export function deletes(noticeIds: React.Key) {
  return httpRequest.delete(`/notice/delete/${noticeIds}`);
}
