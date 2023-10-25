import { BaseTypes } from '@/utils';
import { Tag } from '../tags/types';

/**
 * 文章
 */
export type Post = BaseTypes & {
  [x: string]: any;
  tags?: Tag[];
};

export type CreatePostParams = {};

export type PostSearchParams = {};
