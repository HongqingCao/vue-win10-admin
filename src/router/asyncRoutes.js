/**
 * @description 路由字典，从来处理服务器返回的路由列表
 * @param 
 * @returns 
 */
import Layout from '@/layout/index.vue'
export default {
  dashboard:{
    path: '/dashboard',
    component: Layout,
    alwaysShow: true,
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      icon: 'iconziyuan'
    },
  },
  config:{
    path: '/config',
    component: Layout,
    alwaysShow: true,
    name: 'config',
    meta: {
      title: '平台管理',
      icon: 'iconhoutaiguanli'
    },
  },
  systemSetting:{
    path: '/systemSetting',
    component: Layout,
    alwaysShow: true,
    name: 'systemSetting',
    meta: {
      title: '系统设置',
      icon: 'iconyunliankeji_gongyinglianfuben'
    },
  },
  authority:{
    path: 'authority',
    component: () => import('@/views/authority'),
    hidden: true,
    name: 'authority',
    meta: { title: '权限设置' }
  },
  role:{
    path: 'role',
    component: () => import('@/views/role'),
    hidden: true,
    name: 'role',
    meta: { title: '角色管理' }
  },
  log:{
    path: 'log',
    component: () => import('@/views/log'),
    hidden: true,
    name: 'log',
    meta: { title: '系统日志' }
  }
}