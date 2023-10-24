export default {
  path: '/account',
  name: '个人中心',
  layout: null,
  redirect: './account/info',
  routes: [
    {
      name: '基本信息',
      path: '/account/info',
      component: './account/info',
    },
    {
      name: '信息设置',
      path: '/account/setting',
      component: './account/setting',
    },
  ],
};
