import {
  LAYOUT_TYPE,
  MENU_THEME,
  MENU_TYPE,
  TARGET_TYPE,
  Flag,
  EnumValues,
  TableTimes,
  SearchTimes,
  CommonTypes,
} from '@/utils';

/**
 * 菜单管理
 */
export type Menu = {
  menuId: string; // 菜单id
  name: string; // 国际化对应的name
  menuType: MenuTypes; // 菜单类型
  path?: string; // 路由url
  icon?: string; // 菜单图标
  component?: string; // 菜单对应的文件路径
  redirect?: string; // 路由重定向地址
  target?: TargetTypes; // 当path是一个url，点击新窗口打开
  permission?: string; // 菜单标识(页面按钮权限控制)
  layout?: LayoutTypes; // 是否显示layout布局
  navTheme?: MenuTheme; // 导航菜单的主题
  headerTheme?: MenuTheme; // 顶部导航的主题，mix 模式生效
  hideChildrenInMenu: Flag; // 是否隐藏子路由
  hideInMenu: Flag; // 是否隐藏菜单，包括子路由
  hideInBreadcrumb: Flag; // 是否在面包屑中隐藏
  headerRender: Flag; // 是否显示顶栏
  footerRender: Flag; // 是否显示页脚
  menuRender: Flag; // 当前路由是否展示菜单
  menuHeaderRender: Flag; // 当前路由是否展示菜单顶栏
  flatMenu: Flag; // 子项往上提，只是不展示父菜单
  fixedHeader: Flag; // 固定顶栏
  fixSiderbar: Flag; // 固定菜单
  routes?: Menu[];
  children?: Menu[];
} & TableTimes &
  Omit<CommonTypes, 'leader' | 'describe'>;

/**
 * @description: 菜单类型
 */
export type MenuTypes = EnumValues<typeof MENU_TYPE>;

/**
 * @description: 窗口打开方式
 */
export type TargetTypes = EnumValues<typeof TARGET_TYPE>;

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 */
export type LayoutTypes = EnumValues<typeof LAYOUT_TYPE>;

/**
 * @description: 主题风格
 */
export type MenuTheme = EnumValues<typeof MENU_THEME>;

/**
 * @description: 头部搜索表单 Params
 */
export type MenuSearchParams = {
  isPremission?: boolean; // 是否是角色权限
} & SearchTimes &
  Partial<Pick<Menu, 'menuType' | 'status'>>;
