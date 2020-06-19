<template>
  <div class="menublocks-warrpper">
    <div class="left-warrpper">
      <div class="title">创建</div>
      <div class="list-warrpper">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="list-warrpper">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </div>
    <div class="left-warrpper">
      <div class="title">创建</div>
      <div class="list-warrpper">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="list-warrpper">
        <div class="left"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.menublocks-warrpper{
  padding: 0 10px 0 10px;
  .left-warrpper {
    width: 50%;
    float: left;
    padding-right: 10px;
    
    .title {
      padding-bottom:10px;
    }
    .list-warrpper {
      margin-bottom:10px;
      overflow: hidden;
      .left {
        width: 50px;
        height: 50px;
        float: left;
        background-color: rgba(24, 144, 255, 0.65);
        margin-right: 10px;
      }
      .right {
        width: calc(100% - 60px);
        height: 50px;
        float: left;
        background-color: rgba(24, 144, 255, 0.65);
      }
    }
  }
}
</style>