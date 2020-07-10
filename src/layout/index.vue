<template>
  <div class="win10-warrper" @click="handleClick">
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
import win10Menu from './components/Menu/index.vue'
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
   }
 },
  methods: {
    handleClick(e) {
      let isMessage = getClassName(e.target, 'win10-message');
      let isMenu = getClassName(e.target, 'menu-warrper');
      let isBtnMenu = getClassName(e.target, 'task-button task-btn-menu');
      let isBtnMessage = getClassName(e.target, 'task-button task-btn-message');

      // 控制菜单和消息展示隐藏
      if ((isMessage === false) && (isMenu === false) && (isBtnMenu === false) && (isBtnMessage === false)) {
        if (this.showMenu === true) {
          this.$store.dispatch('app/toggleMenu');
        }
        if (this.showMessage === true) {
           this.$store.dispatch('app/toggleMessage');
        }
      }
    }
  },
  created() {
    this.$on('global:LOADING', (value) => {
        let loading
        if (value) {
          loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        } else {
          loading.close()
        }
      })
  }

}
</script>

<style lang="scss">
.win10-warrper {
  min-width: 100vw;
  height: 100vh;
  background-image: url(../assets/main.jpg);
  background-size: 100% 100%;
  .desktop-warrper {
    width: 100%;
    height: calc(100% - 40px);
    position: absolute;
  }
}
</style>