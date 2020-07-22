<!--
 * @Author: codercao
 * @Date: 2020-07-17 21:48:09
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 19:19:39
 * @Description: 
 * @FilePath: \vue-win10-admin\src\views\config\background\index.vue
--> 
<template>
  <div class="background-wrapper">
    <preview></preview>
    <div class="set-wrapper">
      <div class="title">选择图片</div>
      <div class="img-list">
        <img v-for="item in imgList"  :key="item.name" :src="item.src" @click="handleClick(item)">
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
      imgList: [
        {
          name:"bg_01",
          src:require('@/assets/bg_01.jpg')
        },
        {
          name:"bg_02",
          src:require('@/assets/bg_02.jpg')
        },
        {
          name:"bg_03",
          src:require('@/assets/bg_03.jpg')
        },
        {
          name:"bg_04",
          src:require('@/assets/bg_04.jpg')
        },
        {
          name:"bg_05",
          src:require('@/assets/bg_05.jpg')
        }
      ]
    }
  },
 methods:{
   handleClick(item) {
     this.setLocalStore(localKey, 'bgSrc', item.src)
   } 
 }
}
</script>

<style lang="scss" scoped>
.background-wrapper {
  .set-wrapper {
    .title{
      padding-top: 15px;
      font-size: 15px;
    }
    .img-list {
      padding-top: 10px;
      img {
        width: 78px;
        height: 78px;
        margin-right: 4px;
        &:active {
            box-sizing: border-box;
            border: 2px solid transparent;
        }
      }
    }
  }
}
</style>