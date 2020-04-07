<template>
<div>
<h3 class="tc">Drag Directive By WRX</h3>
  <!-- 容器 -->
	<div id="container" v-drag="{multiple: true, scopeLimit: false}">
		<template v-for="(item, index) in images">
			<!-- 拖动部分 -->
			<div class="box" :key="index" :id="'box' + index">
				<!-- 拖动点 -->
				{{item}}
				<div class="coor" title="拖动缩放" :id="'coor' + index"></div>
			</div>
		</template>
	</div>
</div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
		images: [1,2,3,4,6,7],
    }
  },
  created() {
  },
}
</script>

<style scoped>
#container, .box, .coor{
	box-sizing: border-box
}
#container {
	position: relative;
	width: 600px;
	height: 600px;
	margin: 30px auto;
	background-color: #ccc
}

.box {
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
.box>img{
	width: 100%;
	height: 100%;
	transition: all .3s;
}

.coor {
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
