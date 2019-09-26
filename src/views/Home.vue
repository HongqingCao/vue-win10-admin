<template>
  <div class="home">
	  <div class="operation-header">
	    <img src="http://mat1.gtimg.com/bbs/static/20190906-logo2.png" class="h-title"></img>
	    <div class="h">领取你的国庆专属头像</div>
	    <div class="hh">目前已经有<span>14000万</span>人参与活动</div>
	  </div>
    <slideshow></slideshow>
  </div>
</template>

<script>
import slideshow from '../components/slideshow'
export default {
  name: "home",
  components: {
  	slideshow
  }
};
</script>

<style lang="scss">
.home{
	position: relative;
	overflow-x: hidden;
	width: 100%;
	min-height: 100vh;
	max-width: 500px;
	margin: 0 auto;
	background-image: url(../assets/bg.png);
	background-repeat: no-repeat;
	background-size: cover;
	.operation-header{
		width: 100%;
		margin-top: 1.8rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.h-title{
			margin-top: 4rem;
			width: 80%;
		}
		.h{
			color: #FFFEBB;
			font-size: 24px;
		}
		.hh{
			margin-top: 1.5rem;
			color: #fffcf7;
			font-size: medium;
			span{
				margin: 0 5px 0 5px;
				background-color: #ea4726;
				color: #ffd697;
				padding: 5px;
				border-radius: 15px;
			}
		}
	}

}
</style>