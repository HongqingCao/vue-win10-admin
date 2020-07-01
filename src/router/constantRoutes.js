import Layout from '@/layout/index.vue'
export default [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    alwaysShow: false
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    alwaysShow: false
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    alwaysShow: false
  },
  {
    path: '/',
    component: Layout,
    alwaysShow: false
  }
]