import { MenuChild } from '@/router/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Info = Record<string, any> | null;

interface UserStore {
  token?: string | null;
  /** 用户信息 */
  userInfo: Info;
  /** 菜单列表 */
  menuList: MenuChild[];
  setUserInfo: (info: Info) => void;
  /** 登录成功之后, 获取用户信息以及生成权限路由 */
  afterLogin: () => void;
}

/**
 * 用户状态
 */
const useUserStore = create<UserStore>()(
  persist(
    set => ({
      token: 'token',
      userInfo: null,
      menuList: [],
      setUserInfo: info => set(() => ({ userInfo: info })),
      afterLogin: async () => {
        try {
          // const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
          // // 生成路由
          // const generatorResult = await generatorDynamicRouter(menus);
          // this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu);
          // return { menus, perms, userInfo };
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
    {
      name: 'userStore',
    }
  )
);

export default useUserStore;
