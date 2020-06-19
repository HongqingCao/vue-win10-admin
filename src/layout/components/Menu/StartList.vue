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
        title="Administrator"
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
      ></start-btn>
      <start-btn
        icon="iconguanji"
        title="退出"
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
      'showUnfold'
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
    }
  }
}
</script>

<style lang="scss">
.startlist-warrper {
   position: fixed;
   z-index: 99999;
   height: 480px;
   transition: all 0.3s;
   background-color: #1f1f1f;

   .list {
     position: absolute;
     bottom: 0px;
   }
}
</style>