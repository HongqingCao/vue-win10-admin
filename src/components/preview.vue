<!--
 * @Author: codercao
 * @Date: 2020-07-19 10:45:18
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 20:10:42
 * @Description: 预览组件
 * @FilePath: \vue-win10-admin\src\components\preview.vue
--> 
<template>
  <div class="preview-wrapper">
    <h1 class="title">预览</h1>
    <div class="content-wrapper" 
         :style="{ background: 'url('+bgSrc+')'}"
    >
      <div class="start">
        <div class="menu-list">
          <div class="list" v-for="item in list" :key="item"><i class="icon"></i> <span class="text"></span></div>
        </div>
        <div class="blocks-list">
          <div style="width:59px;height:59px;margin-right:1px;margin-bottom:1px;"></div>
          <div style="width:29px;height:29px;margin-bottom:1px;"></div>
          <div style="width:29px;height:29px;margin-bottom:1px;"></div>

          <div style="width:29px;height:29px;margin-bottom:1px;margin-right:1px;"></div>
          <div style="width:59px;height:29px;margin-bottom:1px;"></div>

          <div style="width:59px;height:29px;margin-bottom:1px;margin-right:1px;"></div>
          <div style="width:14px;height:14px;margin-bottom:1px;margin-right:1px;"></div>
          <div style="width:14px;height:14px;margin-bottom:1px;"></div>
          <div style="width:14px;height:14px;margin-bottom:1px;margin-right:1px;"></div>
          <div style="width:14px;height:14px;margin-bottom:1px;"></div>

          <div style="width:29px;height:29px;margin-bottom:1px;margin-right:1px;"></div>
          <div style="width:29px;height:29px;margin-bottom:1px;margin-right:1px;"></div>
          <div style="width:29px;height:29px;margin-bottom:1px;"></div>
        </div>
      </div>
      <div class="window">
        <div class="title">
          <div class="name"></div>
        </div>
        <div class="content">示例文本</div>
      </div>
      <div class="task-bar"></div>
    </div>
  </div>
</template>

<script>
import { _getLocalStore } from '@/utils/storage'
import { localKey } from '@/settings'

export default {
  data() {
    return {
      showList: false,
      list:[1,2,3,4,5,6,7,8,9,10],
       bgSrc:_getLocalStore(localKey, 'JSONStr') ? _getLocalStore(localKey, 'JSONStr').bgSrc : require('@/assets/bg_01.jpg')
    }
  },
  created(){
    window.addEventListener('setItem', () => {
      let local = _getLocalStore(localKey,'JSONStr')
      this.bgSrc = local ? local.bgSrc : this.bgSrc
    })
  },
  methods: {
  }
}
</script>

<style lang="scss">

@import "~@/styles/theme-mixin.scss";
@import "@/styles/theme-variable.scss";

.preview-wrapper {
  .title{
    font-size: 24px;
    font-weight: 500;
  }
  .content-wrapper{
    width: 415px;
    height: 235px;
    background: no-repeat;
    background-size: 100% 100% !important;
    transition: all .5s;
    position: relative;

    .start {
      position: absolute;
      bottom: 15px;
      height: 170px;
      width: 174px;
      @include background-color($background-color-theme1);
      transition: all .5s;
      .menu-list{
        position: absolute;
        left: 10px;
        width: 34px;
        top: 34px;
        .list {
          height: 11px;
          .icon {
            height: 9px;
            width: 9px;
            background-color: var(--tile-color,#0063B1);
            transition: all .5s;
            float: left;
            margin-top: 1px;
          }
          .text{
            position: relative;
            display: block;
            height: 4px;
            width: 22px;
            margin-left: 12px;
            background-color: #CCD9E3;
            top: 3px;
          }
        } 
      }
      .blocks-list{
        position: absolute;
        right: 10px;
        top: 34px;
        width: 91px;
        div {
          background-color: var(--tile-color,#0063B1);
          transition: all .5s;
          float: left;
          overflow-y: hidden;
        }
      }
    }
    .window {
      position: absolute;
      width: 150px;
      height: 130px;
      right: 30px;
      top: 45px;
      box-sizing: border-box;
      background-color: #fff;
      .title {
        width: 100%;
        height: 15px;
        @include background-color($background-color-theme1);
        .name{
          background-color: #fff;
          height: 2px;
          width: 26px;
          position: relative;
          top: 6px;
          left: 10px;
        }
      }
      .content {
        color: #000;
        font-size: 12px;
        padding: 8px;
      }
      
      
    }
    .task-bar {
      position: absolute;
      bottom: 0;
      height: 15px;
      width: 100%;
      background-color: #002D4F !important;
    }
  }
}

</style>