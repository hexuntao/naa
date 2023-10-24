import { ORG_TYPE, EnumValues, CommonTypes, SearchTimes, TableTimes } from '@/utils';

/**
 * @description: 组织管理
 */
export type Org = {
  orgId: string; // 组织id
  orgName: string; // 组织名称
  orgCode: string; // 组织编码
  orgType: OrgTypes; // 组织类型
  orgLogo?: string; // 组织 logo
  children?: Org[];
} & TableTimes &
  CommonTypes;

// 组织类型
export type OrgTypes = EnumValues<typeof ORG_TYPE>;

/**
 * @description: 新增组织 Params
 */
export type CreateOrgParams = Pick<
  Org,
  | 'parentId'
  | 'orgName'
  | 'orgCode'
  | 'orgType'
  | 'orgLogo'
  | 'leader'
  | 'status'
  | 'sort'
  | 'describe'
>;

/**
 * @description: 头部搜索表单 Params
 */
export type OrgSearchParams = Partial<Pick<Org, 'orgName' | 'orgCode' | 'orgType' | 'status'>> &
  SearchTimes;
