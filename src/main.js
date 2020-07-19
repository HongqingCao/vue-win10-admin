/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:59
 * @LastEditTime: 2020-07-19 19:22:43
 * @LastEditors: codercao
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\main.js
 */ 
import Vue from 'vue'
import 'normalize.css/normalize.css' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/iconfont/iconfont.css' 
import '@/styles/index.scss' // global css

import * as filters from './filters'
import formValid from './utils/formValid'
import { dispatchSetLocalStore } from './utils/storage'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission' 

Vue.use(ElementUI)

// 全局设置过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.formValid = formValid

Vue.prototype.setLocalStore = dispatchSetLocalStore

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
