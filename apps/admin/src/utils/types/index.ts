/*
 * 全局公共 type 接口
 */
import type { Settings as LayoutSettings } from '@ant-design/pro-components';

import { FLAG, LOCALSTORAGE, REQUEST_METHODS, ROUTES, STATUS } from '@/utils/enums';
import { User } from '@/pages/system/user/types';
import { Menu } from '@/pages/system/menu/types';

/**
 * @description: 获取枚举的所有 key
 */
export type EnumKeys<T> = keyof T;

/**
 * @description: 获取枚举的所有可能值
 */
export type EnumValues<T> = T[EnumKeys<T>];

/**
 * @description: 状态
 */
export type Status = EnumValues<typeof STATUS>;

/**
 * @description: 创建和更新时间
 */
export type TableTimes = {
  createdAt: string; // 创建时间
  updatedAt: string; // 最后一次更新时间
};

/**
 * @description: 公共的类型
 */
export type CommonTypes = {
  parentId?: string; // 父级id
  status: Status; // 状态
  sort: number; // 排序
  leader: string; // 岗位负责人
  founder: string; // 创建人
  describe: string; // 描述
};

/**
 * @description: 查询时间
 */
export type SearchTimes = {
  startTime?: string; // 开始日期
  endTime?: string; // 结束日期
};

/**
 * @description: Response 返回体
 */
export type Response<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};

/**
 * @description: 分页查询
 */
export type PageResponse<T> = {
  total: number;
  list: T[];
};

/**
 * @description: 默认分页查询参数
 */
export type PaginationParams = {
  current: number; // 当前页码
  pageSize: number; // 每页条数
};

/**
 * @description: 请求方法
 */
export type RequestMethods = EnumValues<typeof REQUEST_METHODS>;

/**
 * @description: 全局状态数据流
 */
export type InitialStateTypes = {
  accessToken?: string;
  settings?: Partial<LayoutSettings>;
  userinfo?: User;
  permissions?: string[];
  routeMenus?: Menu[];
  collapsed?: boolean;
  [x: string]: any;
};

/**
 * @description: 存储在 localstorage 的值
 */
export type AppLocalCacheTypes = {
  [LOCALSTORAGE.USERINFO]?: User;
  [LOCALSTORAGE.LAYOUT]?: Partial<LayoutSettings>;
  [LOCALSTORAGE.ACCESSTOKEN]?: string;
};

/**
 * @description: 用户休眠
 */
export type LockSleepTypes = {
  lastTime: number;
  isSleep: boolean;
};

/**
 * @description: 是否
 */
export type Flag = EnumValues<typeof FLAG>;

/**
 * @description: 路由集合
 */
export type PathNames = EnumValues<typeof ROUTES>;
