# vue自定义指令
功能：

- 在指定容器中拖动
- 在指定容器中缩放
- 拖动范围和大小控制
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
  <!-- 拖动部分 -->
  <div id="box" v-bind:style="{backgroundImage:'url(' + imgSrc + ')'}">
    <!-- 拖动点 -->
    <div id="coor"></div>
  </div>
</div> 
```
然后在容器上增加指令：v-drag，即可使用：
```html
<!-- 容器 -->
<div id="container" v-drag>
  <!-- 拖动部分 -->
  <div id="box" v-bind:style="{backgroundImage:'url(' + imgSrc + ')'}">
    <!-- 拖动点 -->
    <div id="coor"></div>
  </div>
</div> 
```

# 具体细节
之前写了一个简单的demo，在其基础上改造了成指令，可参考
[参考地址](https://github.com/wangrx-jerry/resize-img)