import BasicLayout from '@/layout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const NotFound = lazy(() => import('@/pages/exception/404'));
const Login = lazy(() => import('@/pages/login'));
const Dashboard = lazy(() => import('@/pages/dashboard'));

export type IRoute = {
  [x: string]: any;
} & RouteObject;

export const defaultRouteList: IRoute[] = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    element: <BasicLayout />,
    meta: {
      title: '首页',
    },
    children: [],
  },
  {
    path: 'login',
    element: <Login />,
  },
];

/**
 *  默认的菜单项
 */
export const defaultMenuRoutes: IRoute[] = [
  {
    path: '/dashboard',
    key: '/dashboard',
    element: <Dashboard />,
  },
];

export const notFoundRoute = [
  {
    path: '*',
    element: <NotFound />,
  },
];

const routes: IRoute[] = [...defaultRouteList, ...notFoundRoute];

export default routes;
