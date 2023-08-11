import type { ReactNode } from 'react';

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
export interface MenuItem {
  path: string;
  /** 菜单唯一的key */
  key: string;
  name?: string;
  keyPath?: string[];
  auth?: boolean;
  redirect?: string;
  element?: ReactNode;
  alwaysShow?: boolean;
  children?: MenuItem[];
  meta?: {
    hidden?: boolean;
    title: string;
    icon?: string;
    noCache?: boolean;
  };
}

export type Menu = any;
