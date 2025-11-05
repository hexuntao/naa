export interface ConfigOptions<T = any> {
  /**
   * 配置文件环境
   * @default process.env.NODE_ENV
   */
  env?: string;
  /**
   * 配置文件目录
   * @default process.cwd()
   */
  cwd?: string;
  /**
   * 配置文件扩展名
   * @default yaml
   */
  extension?: 'yaml' | 'json';
  /**
   * 配置数据
   */
  data?: T;
}
