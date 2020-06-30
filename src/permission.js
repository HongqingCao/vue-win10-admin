import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { _getSessionStore } from '@/utils/storage'

// 免登陆可进入的页面
const whiteList = ['/login', '/401', '/404', '/retrieve']
let test = 1
// 路由前置

router.beforeEach((to, from, next) => {
  debugger
  if (_getSessionStore()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.routers.length === 0) {
        store.dispatch('permission/getMenuRouterList').then(routers => { // 获取用户权限数据
          router.addRoutes(routers) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace: true，以便导航不会留下历史记录
        }).catch((err) => {
          store.dispatch('user/resetToken')
          Message.error(err || '验证失败，请重新登录')
          next(`/login?redirect=${to.path}`)
        })
      } else {
        router.addRoutes(store.getters.routers);
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
// 路由后置
router.afterEach(() => {
})
