<!--
 * @Author: codercao
 * @Date: 2020-07-17 21:48:09
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 12:55:16
 * @Description: 
 * @FilePath: \vue-win10-admin\src\views\config\colour\index.vue
--> 
<template>
  <div class="colour-wrapper">
    <preview></preview>
    <div class="set-wrapper">
      <div class="title">主题色</div>
      <div class="colour-list">
        <div v-for="index of 16" :key="index" :class="'theme-color-'+index" @click="changeTheme(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import preview from '@/components/preview.vue'
import { localKey } from '@/settings'
export default {
  components: {
    preview
  },
  computed: {
    ...mapGetters([
      'showMenu'
    ])
 },
 data() {
    return {
      colourList:[
        {
          theme:""
        }
      ]
    }
  },
 methods:{
   changeTheme(index) {
     let theme = "theme" + index
     this.setLocalStore(localKey, 'theme', theme)
   } 
 }
}
</script>

<style lang="scss" scoped>
.colour-wrapper {
  .set-wrapper {
    .title{
      padding-top: 15px;
      font-size: 15px;
    }
    .colour-list {
      padding-top: 10px;
      width: 384px;
      overflow: auto;
      div {
        float: left;
        margin-right: 2px;
        margin-bottom: 3px;
        border-radius: 4px;
        width: 46px;
        height: 46px;
        box-sizing: border-box;
        &:hover {
           border: 2px solid #000;
        }
      }
      .theme-color-1 {
        background-color: #409EFF;
      }

      .theme-color-2 {
          background-color: #0078D7;
      }

      .theme-color-3 {
          background-color: #C30052;
      }

      .theme-color-4 {
          background-color: #9A0089;
      }

      .theme-color-5 {
          background-color: #67C23A;
      }

      .theme-color-6 {
          background-color: #CA5010;
      }

      .theme-color-7 {
          background-color: #CA5010;
      }

      .theme-color-8 {
          background-color: red;
      }
      /*第二排*/
      .theme-color-9 {
          background-color: #303133;
      }

      .theme-color-10 {
          background-color: #606266;
      }

      .theme-color-11 {
          background-color: #909399;
      }

      .theme-color-12 {
          background-color: #C0C4CC;
      }

      .theme-color-13 {
          background-color: #DCDFE6;
      }

      .theme-color-14 {
          background-color: #E4E7ED;
      }

      .theme-color-15 {
          background-color: #EBEEF5;
      }

      .theme-color-16 {
          background-color: #FFFFFF;
      }

    }
  }
}
</style>