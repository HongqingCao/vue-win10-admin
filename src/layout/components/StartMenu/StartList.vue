<!--
 * @Author: your name
 * @Date: 2020-07-04 15:12:59
 * @LastEditTime: 2020-07-12 13:57:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \home-worlkf:\github\vue-win10-admin\src\layout\components\Menu\StartList.vue
--> 
<template>
  <div class="startlist-warrper" :style="{width: showUnfold ? '250px':'50px'}">
    <div class="start">
      <start-btn
        icon="iconcaidan"
        title="展开"
        :isUnfold="showUnfold"
        @click.native="startClick"
      ></start-btn>
    </div>
    <div class="list" :style="{width: showUnfold ? '250px':'50px'}">
      <start-btn
        icon="iconyonghu"
        :title="userInfo.name"
        name="Administrator"
        :isUnfold="showUnfold"
      ></start-btn>
      <start-btn
        icon="iconwenjianjia"
        title="文档"
        :isUnfold="showUnfold"
      ></start-btn>
      <start-btn
        icon="icontupian"
        title="图片"
        :isUnfold="showUnfold"
      ></start-btn>
      <start-btn
        icon="iconyunliankeji_gongyinglianfuben"
        title="设置"
        :isUnfold="showUnfold"
        @click="setClick"
      ></start-btn>
      <start-btn
        icon="iconguanji"
        title="退出"
        @click="logOut"
        :isUnfold="showUnfold"
      ></start-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 

import startBtn from '@/components/StartBtn.vue'
export default {
  components: {
    startBtn
  },
  computed: {
    ...mapGetters([
      'showUnfold',
      'routers',
      'userInfo'
    ]),
 },
  data() {
    return {
      unfold:false
    }
  },
  methods:{
    startClick() {
      this.$store.dispatch('app/toggleUnfold');
    },
    setClick() {
      let path
      this.routers.map(item =>{
        if (item.path == '/systemSetting') {
           path = '/systemSetting/' + item.children[0].path
        }
      })
      if(this.$route.path != path) {
      this.$router.push(path)
      }
    },
    logOut() {
       this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('user/logOut').then(() => {
            this.$router.push('/')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })        
        })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/theme-mixin.scss";
@import "@/styles/theme-variable.scss";

.startlist-warrper {
   position: fixed;
   z-index: 99999;
   height: 480px;
   transition: all 0.3s;
   background-color: #1f1f1f;
  @include background-color($background-color-theme1);
   .list {
     position: absolute;
     bottom: 0px;
   }
}
</style>