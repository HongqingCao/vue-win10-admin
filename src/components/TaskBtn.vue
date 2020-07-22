<template>
  <div class="task-button" @click="handleClick" :title="title">
    <i class="iconfont" :class="icon"></i>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
};
</script>

<style lang="scss">
@import "~@/styles/theme-mixin.scss";
@import "@/styles/theme-variable.scss";

.task-button {
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: white;
  @include font-color($font-color-white);
  text-align: center;
  transition: all 0.3s;
  
  .iconfont {
    font-size: 19px;
    color: white;
    @include font-color($font-color-white);
  }

  &:hover {
  background-color: rgba(106, 105, 100, 0.7);
  cursor: pointer;
 }
}

</style>
