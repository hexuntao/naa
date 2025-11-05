import { env } from './env';

export const upload = {
  file: {
    path: env('UPLOAD_FILE_PATH', '/uploads'),
    prefix: env('UPLOAD_FILE_PREFIX', '/uploads'),
  },
};

export type UploadConfig = typeof upload;
