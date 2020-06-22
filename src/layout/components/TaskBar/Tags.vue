<template>
  <div
      class="tags-wrapper"
      :class="{'active': tagData.title==nowWin.title}"
      :style="{width: width}"
      @click="handleClick(tagData)"
  >{{tagData.title}}</div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  props: {
    tagData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'winArr',
      'nowWin'
    ]),
    width: function () {
      let per = 100 / (this.winArr.length);
      return `calc(${per}% - 1px)`;
    }
  },
  methods: {
    handleClick (tagData) {
      this.$store.dispatch('app/toggleWin', tagData);
    }
  }
};
</script>

<style lang="scss">
.tags-wrapper {
  float: left;
  color: white;
  text-align: center;
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: background-color 0.2s;
  max-width: 140px;
  border-bottom: 4px solid #707070;
  font-size: 14px;
  word-break: keep-all;
  padding: 0 6px;
  margin-right: 1px;
  &.active{
    background-color: rgba(106, 105, 100, 0.7);
  }
  &:hover {
    background-color: rgba(106, 105, 100, 0.7);
    cursor: pointer;
  }
}
</style>
