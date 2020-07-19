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
  analysis:{
    path: 'analysis',
    component: () => import('@/views/dashboard/analysis'),
    hidden: true,
    name: 'analysis',
    meta: { title: '分析页面' }
  },
  workplace:{
    path: 'workplace',
    component: () => import('@/views/dashboard/workplace'),
    hidden: true,
    name: 'workplace',
    meta: { title: '工作台' }
  },
  background:{
    path: 'background',
    component: () => import('@/views/config/background'),
    hidden: true,
    name: 'background',
    meta: { title: '背景' }
  },
  begin:{
    path: 'begin',
    component: () => import('@/views/config/begin'),
    hidden: true,
    name: 'begin',
    meta: { title: '开始' }
  },
  colour:{
    path: 'colour',
    component: () => import('@/views/config/colour'),
    hidden: true,
    name: 'colour',
    meta: { title: '颜色' }
  },
  personal:{
    path: 'personal',
    component: () => import('@/views/config/personal'),
    hidden: true,
    name: 'personal',
    meta: { title: '个人' }
  },
  taskbar:{
    path: 'taskbar',
    component: () => import('@/views/config/taskbar'),
    hidden: true,
    name: 'taskbar',
    meta: { title: '任务栏' }
  },
  authority:{
    path: 'authority',
    component: () => import('@/views/systemSetting/authority'),
    hidden: true,
    name: 'authority',
    meta: { title: '权限设置' }
  },
  role:{
    path: 'role',
    component: () => import('@/views/systemSetting/role'),
    hidden: true,
    name: 'role',
    meta: { title: '角色管理' }
  },
  log:{
    path: 'log',
    component: () => import('@/views/systemSetting/log'),
    hidden: true,
    name: 'log',
    meta: { title: '系统日志' }
  },
  user:{
    path: 'user',
    component: () => import('@/views/systemSetting/user'),
    hidden: true,
    name: 'user',
    meta: { title: '用户管理' }
  }
}