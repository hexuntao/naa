import { Inject, Injectable } from '@nestjs/common';

import { CONFIG_OPTIONS } from './config.constants';
import { ConfigOptions } from './config.interface';
import { ConfigStore } from './config.store';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: ConfigOptions,
    readonly store: ConfigStore,
  ) {
    this.store.data = this.options.data;
  }

  /**
   * 根据 path 路径获取值(与 lodash.get 一致)
   * @param path 要获取属性的路径
   * @param defaults 默认值，如果解析值是 undefined 则返回
   * @returns T
   */
  get<T>(path?: string, defaults?: T): T {
    return this.store.get<T>(path, defaults);
  }
}
