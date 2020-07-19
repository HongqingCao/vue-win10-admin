<!--
 * @Author: codercao
 * @Date: 2020-07-04 15:12:59
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 20:10:59
 * @Description: 
 * @FilePath: \vue-win10-admin\src\layout\index.vue
--> 
<template>
  <div
    class="win10-warrper"
    @click="handleClick">
    <div class="desktop-warrper">
      <short-cut></short-cut>
    </div>
    <div v-if="nowWin">
      <window :windowData="nowWin"></window>
    </div>
    <task-bar></task-bar>
    <win10-menu></win10-menu>
    <win10-message></win10-message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 
import { getClassName } from '@/utils/dom'

import shortCut from './components/ShortCutMenu/index.vue'
import taskBar from './components/TaskBar/index.vue'
import win10Menu from './components/StartMenu/index.vue'
import win10Message from './components/Message/index.vue'
import window from './components/Window/index.vue'
export default {
  components: {
    shortCut,
    taskBar,
    win10Menu,
    win10Message,
    window
  },
  computed: {
    ...mapGetters([
      'showMenu',
      'showMessage',
      'nowWin'
    ])
 },
 data() {
   return {
     winArr: [],
     bgSrc:require('@/assets/bg_01.jpg')
   }
 },
  methods: {
    handleClick(e) {
      let isMenu = getClassName(e.target, 'menu-warrper')
     // let isStart = getClassName(e.target, 'start-button')
      let isBtnMenu = getClassName(e.target, 'task-button task-btn-menu')
      let isBtnMessage = getClassName(e.target, 'task-button task-btn-message')

      // 控制菜单和消息展示隐藏
      if ((isMenu === false) && (isBtnMenu === false) && (isBtnMessage === false)) {
        if (this.showMenu === true) {
          this.$store.dispatch('app/toggleMenu');
        }
        if (this.showMessage === true) {
           this.$store.dispatch('app/toggleMessage');
        }
      }
    }
  }
}
</script>

<style lang="scss">
.win10-warrper {
  width: 100%;
  height: 100%;
  //background: #000 url(../assets/main.jpg) no-repeat fixed;
  background-size: 100% 100%;
  .desktop-warrper {
    width: 100%;
    height: calc(100% - 40px);
    position: absolute;
  }
}
</style>