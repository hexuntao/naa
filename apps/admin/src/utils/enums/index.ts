/**
 * @description: 请求状态码
 */
export enum REQUEST_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 表示请求成功
  BADREQUEST = 400, // 表示客户端发送的请求有错误
  UNAUTHORIZED = 401, // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND = 404, // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500, // 表示服务器内部错误
}

/**
 * @description: 请求方式
 */
export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

/**
 * @description: 请求前缀
 */
export enum BASEURL {
  API = '/api',
}

/**
 * @description: 存储在 localstorage 的 key
 */
export enum LOCALSTORAGE {
  USERINFO = 'USERINFO', // 用户信息
  ACCESSTOKEN = 'ACCESSTOKEN', // ACCESS_TOKEN
  LAYOUT = 'LAYOUT', // 布局
  LOCKSLEEP = 'LOCKSLEEP', // 睡眠
}

/**
 * @description: 菜单路由
 */
export enum ROUTES {
  LOGIN = '/login',
}

/**
 * @description: 状态
 */
export enum STATUS {
  DISABLE, // 禁用
  NORMAL, // 正常
}

/**
 * @description: 是否
 */
export enum FLAG {
  NO, // 否
  YES, // 是
}

/**
 * @description: 性别
 */
export enum SEX {
  FEMALE = '0', // 女
  MALE = '1', // 男
  PRIVACY = '2', // 隐私
}

/**
 * @description: 消息类型
 */
export enum NOTICE_TYPE {
  NOTICE = '1', // 公告
  ACTIVITY = '2', // 活动
  MESSAGE = '3', // 消息
  NOTIFICATION = '4', // 通知
}

/**
 * @description: 组织类型
 */
export enum ORG_TYPE {
  GROUP = 'group', // 集团
  COMPANY = 'company', // 公司
  UNIT = 'unit', // 单位
  DEPT = 'dept', // 部门
}

/**
 * @description: 菜单类型
 */
export enum MENU_TYPE {
  DIR = 'dir', // 目录
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
}

/**
 * @description: 窗口打开方式
 */
export enum TARGET_TYPE {
  BLANK = '_blank',
  SELF = '_self',
  PARENT = '_parent',
  TOP = '_top',
}

/**
 * @description: 导航菜单的位置,side 为正常模式，top菜单显示在顶部，mix 两种兼有
 */
export enum LAYOUT_TYPE {
  SIDE = 'side', // 侧边菜单
  TOP = 'top', // 顶部菜单
  MIX = 'mix', // 混合菜单
}

/**
 * @description: 主题风格
 */
export enum MENU_THEME {
  DARK = 'dark', // 暗黑风格
  LIGHT = 'light', // 亮色风格
}
