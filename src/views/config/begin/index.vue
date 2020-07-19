<!--
 * @Author: codercao
 * @Date: 2020-07-17 21:48:09
 * @LastEditors: codercao
 * @LastEditTime: 2020-07-19 17:20:21
 * @Description: 
 * @FilePath: \vue-win10-admin\src\views\config\begin\index.vue
--> 
<template>
  <div class="begin-wrapper">
    <preview></preview>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import preview from '@/components/preview.vue'


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
    }
  },
 methods:{
   handleClick(item) {
     console.log(item)
   } 
 }
}
</script>

<style lang="scss" scoped>
</style>