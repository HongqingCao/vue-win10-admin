import Vue from 'vue'
import VueRouter from 'vue-router'
//import Login from '../views/login/index.vue'
import Layout from '@/layout/index.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

export default router
