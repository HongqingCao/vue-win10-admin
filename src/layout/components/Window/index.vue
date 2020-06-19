<template>
  <div class="window-wrapper"
       :style="{
          width: (!fullScreen ?  winWidth : size.width) + '%',
          height: (!fullScreen ? winHeight : size.height) + '%',
          left: !fullScreen ? 0 : (position.left + '%'),
          top: !fullScreen ? 0 : (position.top + '%'),
        }"
  >
    <div class="window-header">
      <div class="window-title" 
           :class="{move: fullScreen}"
           @mousedown="mousedown($event, 'move')">
        {{windowData.title}}
      </div>
      <div class="window-right">
        <task-btn
          icon="iconzuixiaohua"
          title="最小化"
          class="task-btn"
          @click="handleMessageBtn"
        ></task-btn>
        <task-btn
          icon="iconzuidahua"
          title="最大化"
          class="task-btn"
          @click="handleMax"
        ></task-btn>
        <task-btn
          icon="iconguanbi"
          title="关闭"
          class="task-btn"
          @click="handleMessageBtn"
        ></task-btn>
      </div>
    </div>
    <div class="window-content">
      <div class="content-left">
        <div class="list">{{windowData.title}}</div>
        <div class="list">测试测试测试</div>
        <div class="list">测试测试测试</div>
        <div class="list">测试测试测试</div>
      </div>
      <div class="content-right">{{windowData.title}}</div>
    </div>
  </div>
</template>

<script>
let TaskBtn = () => import(/* webpackChunkName: 'task-btn' */ '@/components/TaskBtn.vue');

export default {
  components: {
   TaskBtn
  },
  props: {
    windowData: {
      type: Object,
      required: true
    }
  },
  computed: {
    winHeight: function () {
      return 100;
    },
    winWidth: function () {
      return 100;
    }
  },
  data() {
    return {
      size: {
        width: 80,
        height: 80
      },
      position: {
        left: 10,
        top: 10
      },
      oldSize: {
        width: 100,
        height: 100
      },
      oldPosition: {
        left: 0,
        top: 0
      },
      fullScreen: true
    }
  },
  methods: {
    handleMessageBtn(){

    },
    mousedown(e, direction) {
      if (this.fullScreen === true) {
        let that = this
        let clientX = e.clientX
        let clientY = e.clientY
        document.onmousemove = (e) => {
          if (direction === 'move') {
            let left = 0,top = 0
            left = that.position.left + (e.clientX - clientX) / e.clientX * 100
            top = that.position.top + (e.clientY - clientY) / e.clientY * 100
            if(left < 0) {
              that.position.left = 0
            } else if (left > (100 - that.size.width)) {
               that.position.left = 100 - that.size.width
            } else {
              that.position.left = left
            }
            if(top < 0) {
              that.position.top = 0
            } else if (top > (100 - that.size.height)) {
               that.position.top = 100 - that.size.height
            } else {
              that.position.top = top
            }
          }

          clientX = e.clientX
          clientY = e.clientY
        }
        document.onmouseup = () =>  {
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
      console.log(this.position.left)
    },
    handleMax() {
      this.$el.style.transition = 'all 0.3s'
      if (this.fullScreen === true) {
        this.position.left = this.oldPosition.left
        this.position.top = this.oldPosition.top
        this.size.width = this.oldSize.width
        this.size.height = this.oldSize.height
      } else {
        // this.position.left = 0
        // this.position.top = 0
        // this.size.width = 100
        // this.size.height = 100
        this.oldPosition.left = this.position.left== 0 ? 10 :this.position.left
        this.oldPosition.top = this.position.top== 0 ? 10 :this.position.top
        this.oldSize.width = this.size.width== 100 ? 80 :this.size.width
        this.oldSize.height = this.size.height == 100 ? 80 :this.size.height
        this.position.left = this.oldPosition.left
        this.position.top = this.oldPosition.top
        this.size.width = this.oldSize.width
        this.size.height = this.oldSize.height
      } 
      this.fullScreen = !this.fullScreen
      let that = this;
      setTimeout(function () {
        that.$el.style.transition = 'all 0s';
      }, 500);
    }
  }
}
</script>

<style lang="scss">
.window-wrapper {
  background-color: #fff;
  position: absolute;
  z-index: 9;
  .window-header {
    height: 40px;
    line-height: 40px;
    background-color:rgba(106, 105, 100, 0.7);
    display: flex;

    .window-title {
      flex: 1;
      padding-left: 10px;
      user-select: none;

      &.move {
        cursor: move;
      }
    }

    .window-right {
      .task-btn{
        float: left;
      }
    }
  }

  .window-content {
    overflow: hidden;
    height: calc(100% - 40px);

    .content-left{
      width: 220px;
      height: 100%;
      background-color:#e4e3e6;
      float: left;
      .list {
        height: 40px;
        line-height: 40px;
        padding: 0 10px 0 10px;
        font-size: 14px;

        &:hover {
          background-color: rgba(106, 105, 100, 0.4);
          cursor: pointer;
        }
      }
    }
    .content-right{
      flex: 1;
    }
  }
}
</style>