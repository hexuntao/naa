import { BaseTypes, PaginationParams } from '@/utils';

/**
 * 标签
 */
export type Tag = BaseTypes & {
  name: string;
};

export type TagSearchParams = PaginationParams & {};

export type CreateTagParams = {};
