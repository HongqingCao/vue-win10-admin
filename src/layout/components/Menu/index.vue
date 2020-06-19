<template>
  <div class="menu-warrper"  :style="{bottom: showMenu==true ?'40px':'-480px'}">
    <div class="start-list">
      <start-list></start-list>
    </div>
    <div class="menu-list">
      <menu-list></menu-list>
    </div>
    <div class="menu-blocks">
      <menu-blocks></menu-blocks>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
let MenuList = () => import(/* webpackChunkName: 'menu-list' */ './MenuList.vue');
let StartList = () => import(/* webpackChunkName: 'start-list' */ './StartList.vue');
let MenuBlocks = () => import(/* webpackChunkName: 'menu-blocks' */ './MenuBlocks.vue');


export default {
  components: {
    MenuList,
    StartList,
    MenuBlocks
  },
  computed: {
    ...mapGetters([
      'showMenu'
    ])
 },
}
</script>

<style lang="scss">
.menu-warrper {
  width: 840px;
  height: 480px;
  position: fixed;
  bottom: -480px;
  left: 0;
  color: white;
  background-color: rgba(19, 23, 28, 0.8);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 9990;
  transition: all 0.5s;
  .start-list{
    float: left;
    width: 50px;
    height: 100%;
  }
  .menu-list {
    float: left;
    width: 210px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: 12px;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background:#7f858b;
    }
    
    &::-webkit-scrollbar-track {
      border-radius: 0;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius: 0;
      background-color: rgba(95,95,95,.4);
      transition: all .2s;
      border-radius: 2px;
    
      &:hover {
        background-color: rgba(95,95,95, .7);
      }
    }
  }

  .menu-blocks {
    float: left;
    max-width: 770px;
    width: calc(100% - 260px);
    height: 100%;
    padding-top: 20px;
    padding-bottom: 30px;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
  }
}
</style>