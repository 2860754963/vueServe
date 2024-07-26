let routers = [
  {
    path: '/webScoket',
    name: 'webScoket',
    component: () => import('../views/webScoket/index.vue'),
  },
  {
    path: '/stopAxios',
    name: 'stopAxios',
    component: () => import('../views/stopAxios/index.vue'),
  },
  {
    path: '/virtualList',
    name: 'virtualList',
    component: () => import('../views/virtualList/index.vue'),
  },
];

export default routers;
