import { isFunction } from 'lodash';

/**
 * 基础类型接口
 */
export type BaseType = boolean | number | string | undefined | null;

/**
 * 环境变量类型转义函数接口
 */
export type ParseType<T extends BaseType = string> = (value: string) => T;

/**
 * 获取全部环境变量
 */
export function env(): { [key: string]: string };

/**
 * 直接获取环境变量
 * @param key
 */
export function env<T extends BaseType = string>(key: string): T;

/**
 * 获取类型转义后的环境变量
 * @param key
 * @param parseTo 类型转义函数
 */
export function env<T extends BaseType = string>(key: string, parseTo: ParseType<T>): T;

/**
 * 获取环境变量,不存在则获取默认值
 * @param key
 * @param defaultValue 默认值
 */
export function env<T extends BaseType = string>(key: string, defaultValue: T): T;

/**
 * 获取类型转义后的环境变量,不存在则获取默认值
 * @param key
 * @param parseTo 类型转义函数
 * @param defaultValue 默认值
 */
export function env<T extends BaseType = string>(
  key: string,
  parseTo: ParseType<T>,
  defaultValue: T,
): T;

/**
 * 获取环境变量
 * @param key
 * @param parseTo 类型转义函数
 * @param defaultValue 默认值
 */
export function env<T extends BaseType = string>(
  key?: string,
  parseTo?: ParseType<T> | T,
  defaultValue?: T,
) {
  if (!key) return process.env;
  const value = process.env[key];
  if (value !== undefined) {
    if (parseTo && isFunction(parseTo)) {
      return parseTo(value);
    }
    return value as T;
  }
  if (parseTo === undefined && defaultValue === undefined) {
    return undefined;
  }
  if (parseTo && defaultValue === undefined) {
    return isFunction(parseTo) ? undefined : parseTo;
  }
  return defaultValue! as T;
}
