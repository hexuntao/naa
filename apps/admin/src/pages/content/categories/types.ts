import { BaseTypes } from '@/utils';

/**
 * 内容分类
 */
export type Categorie = BaseTypes & {
  name: string;
  children?: Categorie[];
};

/**
 * 创建内容分类
 */
export type CreateCategorieParams = any;

/**
 * 搜索内容分类
 */
export type CategorieSearchParams = any;
