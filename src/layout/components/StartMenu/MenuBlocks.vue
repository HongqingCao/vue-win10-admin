<!--
 * @Author: codercao
 * @Date: 2020-07-04 15:12:59
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 13:13:13
 * @Description: 
 * @FilePath: \vue-win10-admin\src\layout\components\StartMenu\MenuBlocks.vue
--> 
<template>
  <div class="menublocks-warrpper">
    <div class="left-warrpper">
      <div class="title">创建</div>
      <div class="blocks-list">
          <div style="width:220px;height:143px;margin-right:3px;margin-bottom:3px;"></div>
          <div style="width:80px;height:70px;margin-bottom:3px;"></div>
          <div style="width:80px;height:70px;margin-bottom:3px;"></div>

          <div style="width:150px;height:85px;margin-bottom:3px;margin-right:3px;"></div>
          <div style="width:150px;height:85px;margin-bottom:3px;"></div>

          <div style="width:220px;height:73px;margin-bottom:3px;margin-right:3px;"></div>
          <div style="width:40px;height:35px;margin-bottom:3px;margin-right:3px;"></div>
          <div style="width:40px;height:35px;margin-bottom:3px;"></div>
          <div style="width:40px;height:35px;margin-bottom:3px;margin-right:3px;"></div>
          <div style="width:40px;height:35px;margin-bottom:3px;"></div>

          <div style="width:100px;height:50px;margin-bottom:3px;margin-right:3px;"></div>
          <div style="width:100px;height:50px;margin-bottom:3px;margin-right:3px;"></div>
          <div style="width:100px;height:50px;margin-bottom:3px;"></div>
        </div>
    </div>
  </div>
</template>

<style lang="scss">
.menublocks-warrpper{
  padding: 0 10px 0 10px;
  .left-warrpper {
    padding-right: 10px;
    
    .title {
      padding-bottom:10px;
    }
    .blocks-list {
      margin-bottom:10px;
      overflow: hidden;
      div {
          background-color: var(--tile-color,#0063B1);
          float: left;
          overflow-y: hidden;
        }
    }
  }
}
</style>