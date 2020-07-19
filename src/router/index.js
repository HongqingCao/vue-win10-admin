/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:59
 * @LastEditTime: 2020-07-17 22:17:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\router\index.js
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
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
