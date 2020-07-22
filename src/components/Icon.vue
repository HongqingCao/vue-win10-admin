<!--
 * @Descripttion: 
 * @version: 
 * @Author: codercao
 * @Date: 2020-06-11 16:10:03
 * @LastEditors: codercao
 * @LastEditTime: 2020-06-12 10:48:33
--> 
<template>
<div class="icon-warrper" @click="handleClick">
    <i class="iconfont" :class="iconData.meta.icon"></i>
    <span class="app-title">{{iconData.meta.title}}</span>
</div>

</template>

<script>
export default {
  props: {
    iconData: {
      type: Object
    }
  },
  data() {
    return {
      showList: false
    }
  },
  methods: {
    handleClick(){
      this.$emit('iconClick', this.iconData);
    }
  }
}
</script>

<style lang="scss">

@import "~@/styles/theme-mixin.scss";
@import "@/styles/theme-variable.scss";

.icon-warrper {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 3px;
  height: auto;
  overflow: hidden;
  z-index: 1;
  text-decoration: none;
  cursor: default;

  &::after {
    pointer-events: all;
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &:hover::after {
    pointer-events: all;
    background: rgba(151, 203, 239, 0.192156862745098);
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: inset 0px 0px 0px 1px rgba(247, 235, 250, 0.396078431372549);
  }

  .iconfont {
    font-size: 38px;
    color: #fff;
  }

  .app-title {
    margin-top: 3px;
    margin-bottom: -1px;
    z-index: 3;
    font-size: 12px;
    font-weight: 100;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 34px;
    overflow: hidden;
    text-shadow: -1px 0 2px #000,
                  0 1px 1px #000,
                  1px 0 1px #000,
                  0 -1px 2px #000,

                  2px 0 2px #000,
                  0 2px 2px #000;
    color: #fff;
    white-space: pre-wrap;
    word-break:break-all;
    word-wrap: break-word;
    line-height: 15px;
    letter-spacing: 0.01em;
  }
}

</style>