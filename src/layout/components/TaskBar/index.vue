<template>
  <div class="taskbar-warpper">
    <div class="taskbar-left">
      <task-btn
        icon="iconwindows"
        title="菜单"
        class="task-btn-menu"
        @click="handleWinBtn"
      ></task-btn>
    </div>
    <div class="taskbar-middle">
      <tags 
           v-for="item  in winArr"
           :tagData="item"
          :key="item.name"
           ></tags>
    </div>
    <div class="taskbar-right">
      <div class="taskbar-time" v-html="taskbarTime"></div>
      <task-btn
        icon="iconziyuan1"
        title="消息"
        class="task-btn-message"
        @click="handleMessageBtn"
      ></task-btn>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

let TaskBtn = () => import(/* webpackChunkName: 'task-btn' */ '@/components/TaskBtn.vue');
let Tags = () => import(/* webpackChunkName: 'tags' */ './Tags.vue');

export default {
  components: {
    TaskBtn,
    Tags
  },
  computed: {
    ...mapGetters([
      'winArr'
    ]),
    taskbarTime() {
      return this.getTime()
    }   
  },
  data () {
    return {
      time: Date.now()
    };
  },
  methods: {
    getTime() {
      let date = new Date(this.time);
      let yyyy = date.getFullYear();
      let MM = date.getMonth() + 1;
      let dd = date.getDay();
      let hh = date.getHours();
      if (hh < 10) {
        hh = '0' + hh;
      }
      let mm = date.getMinutes();
      if (mm < 10) {
        mm = '0' + mm;
      }
      return `${hh}:${mm}<br>${yyyy}/${MM}/${dd}`;
    },
    handleWinBtn () {
      this.$store.dispatch('app/toggleMenu');
    },
    handleMessageBtn () {
      this.$store.dispatch('app/toggleMessage');
    }
  }
}
</script>

<style lang="scss">
.taskbar-warpper {
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  background-color: rgba(19, 23, 28, 0.9);
  z-index: 9990;
  display: flex;
  float: left;

  .taskbar-middle{
    flex: 1;
  }
  .taskbar-right {
    display: flex;
    .taskbar-time {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>