import Vue from 'vue'
import VueRouter from 'vue-router'

import asyncRoutesMap from './asyncRoutes'
import constantRouterMap from './constantRoutes'

Vue.use(VueRouter)

const createRouter  = () => new VueRouter({
  mode: 'history', 
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

export const constantRoutes = [
  ...constantRouterMap,
]
// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
