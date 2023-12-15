/**
 * 状态
 */
export enum STATUS {
  DISABLE, // 禁用
  NORMAL, // 正常
}

/**
 * 请求状态码
 */
export enum REQUEST_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 表示请求成功
  BADREQUEST = 400, // 表示客户端发送的请求有错误
  UNAUTHORIZED = 401, // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND = 404, // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500, // 表示服务器内部错误
}
