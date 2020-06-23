<!--
 * @Descripttion: 
 * @version: 
 * @Author: codercao
 * @Date: 2020-06-11 15:45:19
 * @LastEditors: codercao
 * @LastEditTime: 2020-06-19 09:48:29
--> 
<template>
  <div class="shortcut-warrper">
    <ul class="shortcut-ul">
      <li class="shortcut-li" v-for="(item, index) in iconList" :key="index">
        <app-icon
         :iconData="item"
         @iconClick="iconClick"
        ></app-icon>
      </li>
    </ul>
  </div>
</template>

<script>

import appIcon from '@/components/Icon.vue'
import routes from '@/router/constantRoutes'
export default {
  components: {
    appIcon
  },
  computed:{
    iconList: function () {
      return routes.filter(item => { return !(item.path =="/") });
    }
  },
  data() {
    return {
      // iconList:[
      //   {
      //     icon: "iconziyuan",
      //     title: "仪表盘",
      //   },
      //   {
      //     icon: "iconhoutaiguanli",
      //     title: "平台管理"
      //   },
      //   {
      //     icon: "iconyunliankeji_gongyinglianfuben",
      //     title: "系统设置"
      //   }
      // ]
    }
  },
  methods: {
    iconClick(iconData) {
      this.$store.dispatch('app/changeWin', iconData);
      console.log(this.$route.path)
      let path = iconData.children ? (iconData.path + '/' + iconData.children[0].path) : iconData.path
      if(this.$route.path != path){
          this.$router.push(path)
        }
    }
  }
}
</script>

<style lang="scss">
.shortcut-warrper {
  padding-top: 5px;
  width: 100%;
  height: 100%;

  .shortcut-ul {
    display: flex;
    flex: 1 1 0%;
    height: calc(100% - 40px);
    padding-left: 0;
    flex-flow: column wrap;
    align-content: flex-start;
    
    .shortcut-li {
      width: 76px;
      position: relative;
      flex: 0 0 101px;
      align-items: flex-start;
      justify-content: center;


    }
  }
}
</style>