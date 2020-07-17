import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { _getSessionStore } from '@/utils/storage'
import utils from '@/utils/utils'
// 免登陆可进入的页面
const whiteList = ['/login', '/401', '/404', '/retrieve']
// 路由前置
router.beforeEach((to, from, next) => {
  if (_getSessionStore()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.routers.length === 0) {
        store.dispatch('user/getUserInfo')
        // 获取用户权限数据
        store.dispatch('permission/getMenuRouterList').then(routers => { 
          router.addRoutes(routers) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,设置replace: true，以便导航不会留下历史记录
        }).catch((err) => {
          store.dispatch('user/resetToken')
          Message.error(err || '验证失败，请重新登录')
          next(`/login?redirect=${to.path}`)
        })
      } else {
        // 刷新记住当前页面
        if (to.path.length>1) {
          nowRoute(to.path)
        }
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
// 路由后置
router.afterEach(() => {
})

const nowRoute = (path) => {
  let nowpath = utils.splitRouter(path)
  console.log(nowpath)
  let storeRouters = store.getters.routers
  console.log(storeRouters)
  let changeRouterWin = {}
  let navTitle = ''
  storeRouters.forEach(item => {
     if(item.name == nowpath[0]) {
      changeRouterWin = item
     }
  })
  if (nowpath.length>1) {
    changeRouterWin.children.forEach(item => {
      if(item.name == nowpath[1]) {
        navTitle = item.meta.title
      }
   })
  }
  navTitle = navTitle ? (changeRouterWin.meta.title + ' / ' + navTitle) :changeRouterWin.meta.title
  store.dispatch('app/changeNavTitle', navTitle);
  changeRouterWin.route = path
  store.dispatch('app/changeWin', changeRouterWin)
}