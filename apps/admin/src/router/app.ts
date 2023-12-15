import { history } from '@umijs/max';
import { RouterTreeResult, getUserRouters } from '@/apis/system/menu';
import { RuntimeConfig } from '@umijs/max';
import { buildRoutes } from './helper/route';
import { getToken, removeToken } from '@/utils/auth';
import { PageEnum } from '@/enums/pageEnum';

let dynamicRoutes: RouterTreeResult[] = [];

/**
 * @name patchClientRoutes 修改路由表
 * @doc https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
 */
export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = async ({ routes }) => {
  buildRoutes(routes, dynamicRoutes);
};

/**
 * @name render 覆写渲染函数
 * @doc https://umijs.org/docs/api/runtime-config#renderoldrender-function
 */
export const render: RuntimeConfig['render'] = (oldRender) => {
  const token = getToken();
  if (token) {
    getUserRouters()
      .then((data) => {
        dynamicRoutes = data;
      })
      .catch(() => {
        removeToken();
        history.push(PageEnum.BASE_LOGIN);
      })
      .finally(() => {
        oldRender();
      });
  } else {
    dynamicRoutes = [];
    oldRender();
  }
};
