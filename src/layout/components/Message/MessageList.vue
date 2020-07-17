<template>
  <div class="win10-messageList">
    <transition-group name="list" tag="p">
      <div v-for="(item) in messageList" :key="item.uuid" class="messageListItem">
        <span class="closeMessageListItem" @click="closeMsg(item)">x</span>
        <div class="messageListHeader">{{item.title}}</div>
        <div class="messageListContent" v-html="item.text"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    messageList: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  methods: {
    closeMsg (item) {
      this.messageList.forEach((msg, index) => {
        if (msg.uuid === item.uuid) {
          this.messageList.splice(index, 1)
        }
      });
    }
  }
};
</script>

<style>
  .messageListItem {
    position: relative;
    left: 1px;
    margin: 10px 0;
    padding: 10px 7px;
    font-size: 12px;
    transition: all 1s;
  }
  .messageListItem:hover {
    color: #fff;
    background-color:rgba(102,102,102,0.2);
  }
  .messageListHeader {
    margin-bottom: 5px;
    font-size: 15px;
  }
  .closeMessageListItem {
    opacity: 0;
    cursor: pointer;
    color: rgb(102,102,102);
    padding: 3px;
    font-size: 15px;
    line-height: 15px;
    font-weight: 900;
    position: absolute;
    right: 11px;
    transition: all 0.5s;
  }
  .closeMessageListItem:hover {
    color: #fff;
  }
  .messageListItem:hover .closeMessageListItem {
    opacity: 1;
  }
  .list-item {
    display: inline-block;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(360px);
  }
</style>
