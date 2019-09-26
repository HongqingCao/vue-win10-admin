<template>
  <div class="slideshow-warpper">
  	<div class="img-warpper">
  	  <div class="border-img"></div>
  	  <div class="head-img"></div>
  	</div>
  	<a class="btn"></a>
  	<a class="btn next"></a>
  </div>
</template>

<script>
export default {
  name: "slideshow",
  props: []
};
</script>

<style lang="scss">
  .slideshow-warpper{
  	padding: 32px;
  	position: relative;
  	.btn{
  		position:absolute;
  		top: 50%;
  		left: 0;
  	}
  }
</style>
