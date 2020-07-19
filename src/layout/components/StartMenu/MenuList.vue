<!--
 * @Author: your name
 * @Date: 2020-07-04 15:12:59
 * @LastEditTime: 2020-07-19 22:39:29
 * @LastEditors: codercao
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\layout\components\StartMenu\MenuList.vue
--> 
<template>
  <div class="menulist-warrper" v-if="routers">
    <el-menu
      text-color="#ffffff"
      background-color="rgba(19, 23, 28, 0.2)"
      active-text-color="#6b6b6b"
      class="el-menu-vertical-demo"
      v-for="item in routers" :key="item.id"
      >
      <template v-if="item.children">
        <el-submenu  :index="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span class="title-span">{{item.meta.title}}</span>
          </template>
          <el-menu-item-group  v-for="children in item.children"  :key="children.id">
            <router-link :to="item.path+'/'+children.path">
               <el-menu-item :index="children.id">{{children.meta.title}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </template>
       <template v-else >
         <router-link :to="item.path">
            <el-menu-item  :index="item.path">
              <i class="iconfont" :class="item.meta.icon"></i>
              <span class="title-span">{{item.meta.title}}</span>
            </el-menu-item>
          </router-link>
       </template>

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