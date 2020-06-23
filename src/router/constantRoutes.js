import Layout from '@/layout/index.vue'
export default [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: () => import('@/views/error-page/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    alwaysShow: false,
    name: '/',
    meta: {
      title: '首页',
      icon: ''
    },
  },
  {
    path: '/dashboard',
    component: Layout,
    alwaysShow: true,
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      icon: 'iconziyuan'
    },
  },
  {
    path: '/config',
    component: Layout,
    alwaysShow: true,
    name: 'config',
    meta: {
      title: '平台管理',
      icon: 'iconhoutaiguanli'
    },
  },
  {
    path: '/systemSetting',
    component: Layout,
    alwaysShow: true,
    name: 'systemSetting',
    meta: {
      title: '系统设置',
      icon: 'iconyunliankeji_gongyinglianfuben'
    },
    children: [
      {
        path: 'authority',
        component: () => import('@/views/authority'),
        alwaysShow: true,
        name: 'authority',
        meta: { title: '权限设置' }
      },
      {
        path: 'role',
        component: () => import('@/views/role'),
        alwaysShow: true,
        name: 'role',
        meta: { title: '角色管理' }
      },
      {
        path: 'log',
        component: () => import('@/views/log'),
        alwaysShow: true,
        name: 'log',
        meta: { title: '系统日志' }
      },
    ]
  }
]