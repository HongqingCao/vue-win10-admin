<template>
  <div class="home">
    <div class="operation-header">
      <img
        src="http://mat1.gtimg.com/bbs/static/20190906-logo2.png"
        class="h-title"
      />
      <div class="h">领取你的国庆专属头像</div>
      <div class="hh">目前已经有<span>14000万</span>人参与活动</div>
    </div>
    <slideshow :borderImgList="borderImgList"></slideshow>
    <div class="btn-wapper">
    	<div class="btn-com upload">上传图片</div>
    	<div class="btn-com save">保存头像</div>
    </div>
  </div>
</template>

<script>
import slideshow from "../components/slideshow";
export default {
  name: "home",
  components: {
    slideshow
  },
  data() {
    return {
      borderImgList: [
        { src: require("../assets/border1.png") },
        { src: require("../assets/border2.png") },
        { src: require("../assets/border3.png") }
      ]
    };
  }
};
</script>

<style lang="scss">
.home {
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
  background-image: url(../assets/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  .operation-header {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .h-title {
      margin-top: 4rem;
      width: 80%;
    }
    .h {
      color: #fffebb;
      font-size: 22px;
    }
    .hh {
      margin-top: 1.5rem;
      color: #fffcf7;
      font-size: medium;
      span {
        margin: 0 5px 0 5px;
        background-color: #ea4726;
        color: #ffd697;
        padding: 5px;
        border-radius: 15px;
      }
    }
  }
  .btn-wapper{
  	padding: 40px;
  	.btn-com{
  		float: left;
  		margin-left: 15px;
  		height: 45px;
  		width: calc(50% - 30px);
  		border-radius: 20px;
  		text-align: center;
  		line-height: 45px;
  		font-size: 20px;
  		&.upload{
  			background: #fff;
  			color: #c45700;
  		}
  		&.save{
  			background: #fed677;
  			color: #c45700;
  		}
  	}
  }
}
</style>
