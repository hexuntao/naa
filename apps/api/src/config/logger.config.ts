import { env } from './env';

export const logger = {
  appName: env('npm_package_name', ''),
  logPath: env('LOGGER_LOGPATH', '../logs'),
};

export type LoggerConfig = typeof logger;
