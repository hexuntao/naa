import { CommonTypes, PaginationParams, SearchTimes, TableTimes } from '@/utils';
import { Org } from '../org/types';
import { Job } from '../job/types';
import { Role } from '../role/types';

/**
 * @description: 用户管理
 */
export type User = TableTimes & {
  userId: string; // 用户id
  userName: string; // 用户名称
  workNo: string; // 用户工号
  password: string; // 密码(加密)
  confirmPassword?: string; // 确认密码
  cnName: string; // 中文名
  enName?: string; // 英文名
  age: number; // 年龄
  email: string; // 电子邮箱
  phone: string; // 电话号码
  avatarUrl: string; // 头像地址
  sex: string; // 用户性别
  token: string; // 用户令牌
  motto: string; // 座右铭
  tags: string[]; // 人物标签
  city: string[]; // 所属城市
  address: string; // 详细地址
  login_num: number; // 登录次数
  login_last_ip: string; // 最后一次登录ip
  login_last_time: Date; // 最后一次登录时间
} & Pick<Org, 'orgId' | 'orgName'> &
  Pick<Job, 'jobId' | 'jobName'> &
  Pick<Role, 'roleId' | 'roleName'> &
  Pick<CommonTypes, 'sort' | 'founder' | 'status'>;

/**
 * @description: 头部搜索表单 Params
 */
export type UserSearchParams = PaginationParams &
  SearchTimes &
  Partial<Pick<User, 'userName' | 'sex' | 'status'>>;

/**
 * @description: 设置用户状态 Props
 */
export type UserStatusProps = Pick<User, 'userId' | 'status'>;
