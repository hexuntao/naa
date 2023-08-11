import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { FC, Suspense, useEffect, useMemo } from 'react';

import {
  IRoute,
  defaultMenuRoutes,
  defaultRouteList,
  notFoundRoute,
} from './routes';

import { useUserStore } from '@/stores';

/** 动态路由 */
const DynamicRouter = () => {
  const { token, menuList, afterLogin } = useUserStore();
  const navigate = useNavigate();
  const { pathname, state } = useLocation();

  useEffect(() => {
    console.log('logged', !!token, state);
    if (!token && pathname !== '/login') {
      return navigate(
        { pathname: 'login' },
        { replace: true, state: { from: pathname } }
      );
    }

    if (token) {
      !menuList.length && afterLogin();
      if (pathname === '/login') {
        navigate({ pathname: '/' }, { replace: true });
      }
    }
  }, [menuList, token, navigate, pathname, state, afterLogin]);

  const newRoutes = useMemo(() => {
    const routeList = cloneDeep(defaultRouteList);
    const layoutRoute = routeList.find(item => item.path === '/')?.children;
    layoutRoute?.push(
      ...cloneDeep([...defaultMenuRoutes, ...menuList]),
      ...notFoundRoute
    );
    return routeList;
  }, [menuList]);

  return <RenderRouter routerList={newRoutes} />;
};

/** 生成路由 */
const RenderRouter: FC<{ routerList: IRoute[] }> = ({ routerList }) => {
  console.log('routerList', routerList);
  const element = useRoutes(routerList);
  return <Suspense fallback={<>页面加载失败</>}>{element}</Suspense>;
};

export default DynamicRouter;
