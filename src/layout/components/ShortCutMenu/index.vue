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
import {mapGetters} from 'vuex'
import appIcon from '@/components/Icon.vue'
//import routes from '@/router/constantRoutes'
export default {
  components: {
    appIcon
  },
  computed:{
    ...mapGetters([
      'nowWin',
      'routers'
    ]),
    iconList: function () {
      //return routes.filter(item => { return !(item.path =="/") });
      console.log("22222222")
      console.log(this.routers)
      return this.routers
    }
  },
  data() {
    return {
    }
  },
  methods: {
    iconClick(iconData) {
      iconData.route = this.$route.path
      console.log(iconData)
      this.$store.dispatch('app/changeWin', iconData)
      // 路径判断,如果相同的就不切换路由
      let path = iconData.children ? (iconData.path + '/' + iconData.children[0].path) : iconData.path
      if(this.$route.path != path) {
        // 切换navtitle
        let navTitle =  iconData.children ? (iconData.meta.title + '/' + iconData.children[0].meta.title) : iconData.meta.title
        this.$router.push(path)
        this.$store.dispatch('app/changeNavTitle', navTitle);
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