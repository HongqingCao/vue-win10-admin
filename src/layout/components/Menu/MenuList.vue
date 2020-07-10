<template>
  <div class="menulist-warrper" v-if="routers">
    <el-menu
      default-active="2"
      text-color="#ffffff"
      background-color="rgba(19, 23, 28, 0.8)"
      active-text-color="#6b6b6b"
      class="el-menu-vertical-demo"
      v-for="(item, index) in routers" :key="item.id"
      >
      <el-submenu  v-if="item.children" :index="index">
        <template slot="title">
          <i class="iconfont" :class="item.meta.icon"></i>
          <span class="title-span">{{item.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item 
          v-for="(children, index) in item.children" 
          :key="children.id" 
          :index="index">{{children.meta.title}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item  v-if="!item.children" :index="index">
        <i class="iconfont" :class="item.meta.icon"></i>
        <span class="title-span">{{item.meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
    ...mapGetters([
      'nowWin',
      'routers'
    ])
    },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style  lang="scss">
.menulist-warrper {
  width: 100%;
  .el-menu {
    border-right:none
  }
  .el-submenu__title{
        height: 40px !important;
    line-height: 40px !important;
    &:hover {
      color: white!important;
      background-color: rgba(106, 105, 100, 0.7)!important;
    }
  }
  .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    &.is-active {
       color: white!important;
    }
    &:hover {
      color: white!important;
      background-color: rgba(106, 105, 100, 0.7)!important;
    }
  }
     .title-span{
      padding-left: 15px;
    }
}
</style>