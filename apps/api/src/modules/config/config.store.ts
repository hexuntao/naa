import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';
import { get, set, toPairs, mergeWith, assign, isString, isArray, isObject } from 'lodash';

/**
 * 配置结果存储
 */
@Injectable()
export class ConfigStore {
  private _data: any;

  public get data() {
    return this._data;
  }

  public set data(data: any) {
    this._data = data;
    if (isObject(this._data)) {
      for (const [key, val] of toPairs(this._data)) {
        this.compileWithEnv(key, this._data, val);
      }
    }
  }

  public get<T>(path?: string, defaults?: T): T {
    if (!path) {
      return this._data;
    }
    return get(this._data, path, defaults);
  }

  public set(path?: string, values?: any) {
    if (!path) {
      this._data = values;
    }
    set(this._data, path, values);
  }

  public merge(data: any) {
    this._data = mergeWith({}, this._data, data, (objValue, srcValue) => {
      if (isArray(objValue)) {
        return srcValue;
      }
      return objValue;
    });
  }

  public assign(data: any) {
    this._data = assign({}, this._data, data);
  }

  private compileWithEnv(key: string | number, parent: any, config: any) {
    if (isString(config)) {
      // 将 ${{ VAR || defaultValue }} 转换为 Handlebars 语法
      // 支持默认值：${{ API_PORT || 6010 }}
      let templateStr = config.replace(/\${{/g, '{{');

      // 处理 || 默认值语法：{{ VAR || defaultValue }} -> {{#if VAR}}{{VAR}}{{else}}defaultValue{{/if}}
      templateStr = templateStr.replace(
        /\{\{([^}]+)\s*\|\|\s*([^}]+)\}\}/g,
        (_match, varName, defaultValue) => {
          const trimmedVar = varName.trim();
          const trimmedDefault = defaultValue.trim();
          return `{{#if ${trimmedVar}}}{{${trimmedVar}}}{{else}}${trimmedDefault}}{{/if}}`;
        },
      );

      const template = compile(templateStr);
      const context = { ...process.env, ...this._data };
      parent[key] = template(context);
    } else if (isArray(config)) {
      config.forEach((item, index) => this.compileWithEnv(index, config, item));
    } else if (isObject(config)) {
      for (const [key, val] of toPairs(config)) {
        this.compileWithEnv(key, config, val);
      }
    }
  }
}
