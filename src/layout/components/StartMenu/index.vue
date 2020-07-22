<!--
 * @Author: your name
 * @Date: 2020-07-04 15:12:59
 * @LastEditTime: 2020-07-19 22:40:20
 * @LastEditors: codercao
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\layout\components\StartMenu\index.vue
--> 
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
@import "~@/styles/theme-mixin.scss";
@import "@/styles/theme-variable.scss";

.menu-warrper {
  width: 600px;
  height: 480px;
  position: fixed;
  bottom: -480px;
  left: 0;
  color: white;
  background-color: rgba(19, 23, 28, 0.9);
  @include startMenu-background-color($startMenu-background-color-black);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2000;
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
    background-color: #1f1f1f;
     @include startMenu-background-color($startMenu-background-color-black);
    animation-duration: 0.5s;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      //background:#7f858b;
    }
    
    &::-webkit-scrollbar-track {
      border-radius: 0;
    }
    
    &::-webkit-scrollbar-thumb {
      border-radius: 0;
     // background-color: rgba(95,95,95,.4);
      transition: all .2s;
      border-radius: 2px;
    
      &:hover {
        background-color: rgba(95,95,95, .7);
      }
    }
  }

  .menu-blocks {
    float: left;
    width: calc(100% - 260px);
    height: 100%;
    padding-top: 20px;
    padding-bottom: 30px;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
  }
}
</style>