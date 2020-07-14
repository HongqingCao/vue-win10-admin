<template>
  <div class="window-wrapper"
       :style="{
          width: (!fullScreen ?  winWidth : size.width) + 'px',
          height: (!fullScreen ? winHeight : size.height) + 'px',
          left: !fullScreen ? 0 : (position.left + 'px'),
          top: !fullScreen ? 0 : (position.top + 'px'),
        }"
  >
    <div class="window-header">
      <div class="window-title" 
           :class="{move: fullScreen}"
           @mousedown="mousedown($event, 'move')">
        {{windowData.meta.title}}
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
          @click="handleClose"
        ></task-btn>
      </div>
    </div>
    <div class="window-content">
      <div class="content-left" v-if="windowData.children">
        <div class="list" 
             v-for="(item) in windowData.children"
             :key="item.name" 
             :class="{'active': (windowData.path + '/' + item.path)===key }"
             @click="handleMenu(item)"
             >{{item.meta.title}}</div>
      </div>
      <div class="content-right">
        <div class="nav-title">{{navTitle}}</div>
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
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
    ...mapGetters([
      'navTitle',
      'nowWin',
    ]),
    winHeight: function () {
      return document.body.clientHeight - 40;
    },
    winWidth: function () {
      return document.body.clientWidth;
    },
    key() {
      return this.$route.path
    },
    noChildrenTitle() {
      return this.windowData.children ? (this.windowData.meta.title + ' / ' + this.windowData.children[0].meta.title) :this.windowData.meta.title
    },
    title() {
      return this.navTitle ? this.navTitle : this.noChildrenTitle
    }
  },
  data() {
    return {
      size: {
        width: document.body.clientWidth - 300,
        height: document.body.clientHeight -240
      },
      position: {
        left: 150,
        top: 100
      },
      oldSize: {
        width: document.body.clientWidth,
        height: document.body.clientHeight - 40
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
            left = that.position.left + (e.clientX - clientX)
            top = that.position.top + (e.clientY - clientY)
            if(left < 0) {
              that.position.left = 0
            } else if (left > (this.winWidth - that.size.width)) {
               that.position.left = this.winWidth - that.size.width
            } else {
              that.position.left = left
            }
            if(top < 0) {
              that.position.top = 0
            } else if (top > (this.winHeight - that.size.height)) {
               that.position.top = this.winHeight - that.size.height
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
    },
    handleMax() {
      this.$el.style.transition = 'all 0.3s'
      if (this.fullScreen === true) {
        this.position.left = this.oldPosition.left
        this.position.top = this.oldPosition.top
        this.size.width = this.oldSize.width
        this.size.height = this.oldSize.height
      } else {
        this.oldPosition.left = this.position.left== 0 ? 150 :this.position.left
        this.oldPosition.top = this.position.top== 0 ? 100 :this.position.top
        this.oldSize.width = this.size.width== this.winWidth ? (this.winWidth - 300) :this.size.width
        this.oldSize.height = this.size.height == this.winHeight ? (this.winHeight -240) :this.size.height
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
    },
    handleClose() {
      this.$store.dispatch('app/delWindow', this.windowData);
    },
    handleMenu(item) {
      let path = this.windowData.children ? (this.windowData.path + '/' + item.path) : item.path
      if(this.$route.path != path){
        // let navTitle =  this.windowData.meta.title + ' / ' + item.meta.title
        // this.$store.dispatch('app/changeNavTitle', navTitle);
        this.$router.push(path)
        // 记忆之前路由
        // let changeRouterWin = Object.assign({}, this.nowWin)
        //     changeRouterWin.route = path
        // this.$store.dispatch('app/changeWin', changeRouterWin)
        }
    }
  }
}
</script>

<style lang="scss">
.window-wrapper {
  position: absolute;
  min-width: 1280px;
  z-index: 9;
  .window-header {
    height: 40px;
    line-height: 40px;
    background-color:#08d;
    display: flex;

    .window-title {
      flex: 1;
      padding-left: 10px;
      user-select: none;
      color: #fff;

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
    display: flex;
    .content-left{
      width: 220px;
      height: 100%;
      color: hsla(0,0%,100%,.65);
      background-color:#001529;
      float: left;
      .list {
        height: 40px;
        line-height: 40px;
        padding: 0 10px 0 20px;
        font-size: 14px;
        &:hover {
          cursor: pointer;
          color: #fff;
          transition: color .3s cubic-bezier(.645,.045,.355,1),
                      border-color .3s cubic-bezier(.645,.045,.355,1),
                      background .3s cubic-bezier(.645,.045,.355,1),
                      padding .15s cubic-bezier(.645,.045,.355,1)
        }
        &.active{
          color: #fff;
          background-color: rgba(106, 105, 100, 0.4);
        }
      }
    }
    .content-right{
      flex: 1;
      height: 100%;
      width: calc(100% - 220px);
      padding: 24px 12px 24px 24px;
      background: #f0f2f5;
      overflow:scroll;
      .nav-title {
        color: rgba(0,0,0,.45);
        padding-bottom: 15px;
      }
    }
  }
}
</style>