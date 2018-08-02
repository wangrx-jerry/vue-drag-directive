# vue自定义指令
功能：
> 通过指令参数可以配置：
- 指定容器中拖动（scopeLimit: true）
- 指定容器中缩放（scopeLimit: true）
- 拖动范围和大小控制（scopeLimit: true）

> 可以拖动和缩放多张图片
multiple: true

- 如果你不想给一个区域限制图片拖动，可以将：scopeLimit设置为false
- 如果你不需要在一个范围内显示多张图片，可以将multiple设置为false
# 预览
[预览](https://wangrx-jerry.github.io/vue-drag-directive/dist/index.html)
# 启动
1. npm i
2. npm run dev 
# 使用
- 需要一个容器(container)：限定可拖拽范围
- 一个存放img的容器(box)
- 一个缩放的控制器（coor）

例如：
```html 
<!-- 容器 -->
	<div id="container">
		<template v-for="(item, index) in images">
			<!-- 拖动部分 -->
			<div class="box" :key="index" :id="'box' + index">
				<img :src="item.src" alt="" :id="'img'+index">
				<!-- 拖动点 -->
				<div class="coor" title="拖动缩放" :id="'coor' + index"></div>
			</div>
		</template>
	</div>
</div>
```
然后在容器上增加指令：v-drag，即可使用：
```html
<div id="container" v-drag="{multiple: true, scopeLimit: false}">
		<template v-for="(item, index) in images">
			<!-- 拖动部分 -->
			<div class="box" :key="index" :id="'box' + index">
				<img :src="item.src" alt="" :id="'img'+index">
				<!-- 拖动点 -->
				<div class="coor" title="拖动缩放" :id="'coor' + index"></div>
			</div>
		</template>
	</div>
</div>
```

# 具体细节
之前写了一个简单的demo，在其基础上改造了成指令，可参考
[参考地址](https://github.com/wangrx-jerry/resize-img)
