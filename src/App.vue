<!--
 * @Author: codercao
 * @Date: 2020-07-04 15:12:59
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 20:09:47
 * @Description: 
 * @FilePath: \vue-win10-admin\src\App.vue
--> 
<template>
  <div id="app"  :style="{ background: 'url('+bgSrc+')'}" :data-theme="theme">
    <router-view />
  </div>
</template>

<script>
import { _getLocalStore } from '@/utils/storage'
import { localKey } from '@/settings'
export default {
  name: 'App',
  data() {
   return {
     bgSrc: _getLocalStore(localKey, 'JSONStr') && _getLocalStore(localKey, 'JSONStr').bgSrc  ? _getLocalStore(localKey, 'JSONStr').bgSrc : require('@/assets/bg_01.jpg'),
     theme: _getLocalStore(localKey, 'JSONStr') && _getLocalStore(localKey, 'JSONStr').theme  ? _getLocalStore(localKey, 'JSONStr').theme : 'theme1'
    }
  },
  created(){
    window.addEventListener('setItem', () => {
      let local = _getLocalStore(localKey, 'JSONStr')
      this.bgSrc = local && local.bgSrc ? local.bgSrc : this.bgSrc
      this.theme = local && local.theme ? local.theme : this.theme
    })
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background:no-repeat;
  background: fixed;
  background-size: 100% 100% !important;
  transition: all .5s;
}
</style>
