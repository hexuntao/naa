export default {
  name: '系统设置',
  path: '/system',
  component: null,
  // redirect: '/system/user',
  routes: [
    {
      path: '/system/user',
      icon: 'icon-user',
      component: './system/user',
      name: '用户管理',
    },
    {
      path: '/system/menu',
      icon: 'icon-menu',
      component: './system/menu',
      redirect: null,
      name: '菜单管理',
    },
    {
      path: '/system/role',
      icon: 'icon-role',
      component: './system/role',
      redirect: null,
      name: '角色管理',
    },
    {
      path: '/system/org',
      icon: 'icon-org',
      component: './system/org',
      redirect: null,
      name: '组织管理',
    },
    {
      path: '/system/job',
      icon: 'icon-job',
      component: './system/job',
      redirect: null,
      name: '岗位管理',
    },
  ],
};
