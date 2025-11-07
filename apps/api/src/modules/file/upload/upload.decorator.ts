import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { UPLOAD_FILE_URL } from './upload.config';

/**
 * 获取单个文件地址
 */
export const UploadFileUrl = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request: any = ctx.switchToHttp().getRequest<Request>();
  return request.file?.[UPLOAD_FILE_URL];
});

/**
 * 获取多个文件地址
 */
export const UploadFileUrls = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return (request.files as Express.Multer.File[])?.map((file: any) => file[UPLOAD_FILE_URL]);
});
