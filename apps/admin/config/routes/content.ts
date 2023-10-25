export default {
  name: '内容管理',
  path: '/content',
  component: null,
  routes: [
    {
      name: '分类管理',
      path: '/content/categories',
      component: './content/categories',
    },
    {
      name: '标签管理',
      path: '/content/tags',
      component: './content/tags',
    },
    {
      name: '文章管理',
      path: '/content/posts',
      component: './content/posts',
    },
    {
      name: '评论管理',
      path: '/content/comments',
      component: './content/comments',
    },
  ],
};
