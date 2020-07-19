<template>
  <div class="start-button" @click="handleClick" :title="title">
    <i class="iconfont" :class="icon"></i>
    <span class="name" v-show="isUnfold">{{title==="展开" ? "开始" : title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: String,
    isUnfold:Boolean
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
};
</script>

<style lang="scss">
.start-button {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  color: white;
  text-align: center;
  transition: all 0.3s;
  overflow: hidden;
  .iconfont {
    font-size: 16px;
    color: white;
    float: left;
  }
  .name{
    float: left;
    padding-left: 10px;
    font-size: 15px;
  }

  &:hover {
  background-color: rgba(106, 105, 100, 0.7);
  cursor: pointer;
 }
}

</style>
