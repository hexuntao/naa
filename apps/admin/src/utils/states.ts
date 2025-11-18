import type { Settings as LayoutSettings, ProLayoutProps } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { getUserInfo } from '@/apis/auth/login';
import { PageEnum } from '@/enums/pageEnum';
import { getToken, removeToken } from '@/utils/auth';
import { getThemeSetting } from '@/utils/setting';

const loginPath = `${PageEnum.BASE_LOGIN.replace('/', '')}`;

export interface InitialState {
  settings?: Partial<LayoutSettings & { token: ProLayoutProps['token'] }>;
  token?: string;
  roles?: string[];
  permissions?: string[];
  userInfo?: UserInfo;
  fetchUserInfo?: () => Promise<
    | {
        roles?: string[];
        permissions?: string[];
        userInfo?: UserInfo;
      }
    | undefined
  >;
}

/**
 * @name InitialState 全局初始化数据配置用于 Layout 用户信息和权限初始化
 * @doc https://umijs.org/docs/api/runtime-config#getinitialstate
 */
export async function getInitialState(): Promise<InitialState> {
  const token = getToken();
  const location = history.location;
  const defaultSettings = getThemeSetting();
  const fetchUserInfo = async () => {
    try {
      const { roles, permissions, sysUser } = await getUserInfo();
      return {
        roles,
        permissions,
        userInfo: sysUser,
      };
    } catch (error) {
      removeToken();
      history.push(PageEnum.BASE_LOGIN);
      throw error;
    }
  };

  if (token && location.pathname !== loginPath) {
    const userInfo = await fetchUserInfo();
    return {
      fetchUserInfo,
      ...userInfo,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  } else {
    if (token && location.pathname === loginPath) {
      history.push('/');
    } else if (location.pathname !== loginPath) {
      removeToken();
      history.push(PageEnum.BASE_LOGIN);
    }
  }

  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}
