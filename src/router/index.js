import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/login/index.vue'

import routeList from './constantRoutes'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', 
  routes: routeList, 
})

export default router
