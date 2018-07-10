<template>
<div>
<h3 class="tc">Drag Directive By WRX</h3>
  <!-- 容器 -->
	<div id="container" v-drag>
		<!-- 拖动部分 -->
		<div id="box" v-bind:style="{backgroundImage:'url(' + imgSrc + ')'}">
			<!-- 拖动点 -->
			<div id="coor"></div>
		</div>
	</div> 
</div>
</template>
<script>
import imgSrc from '@/assets/images/1.jpg'
export default {
  name: 'HelloWorld',
  data () {
    return {
		imgSrc: imgSrc,
    }
  },
  created() {
  },
}
</script>

<style scoped>
#container, #box, #coor{
	box-sizing: border-box
}
#container {
	position: relative;
	width: 600px;
	height: 600px;
	margin: 30px auto;
	background-color: #ccc
}

#box {
	width: 200px;
	height: 100px;
	cursor: move;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #FFF;
	-webkit-box-shadow: 10px 10px 25px #ccc;
	-moz-box-shadow: 10px 10px 25px #ccc;
	box-shadow: 10px 10px 25px #ccc;
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}

#coor {
	width: 10px;
	height: 10px;
	overflow: hidden;
	cursor: se-resize;
	position: absolute;
	right: 0;
	bottom: 0;
	background-color: #09C;
}
.tc{text-align: center}
</style>
