//参考地址： https: //www.cnblogs.com/moqiutao/p/8334780.htmlimport Vue from 'vue'
//官网地址： https://cn.vuejs.org/v2/api/#Vue-delete
import Vue from 'vue'
let container = null, 
	box = null,
	coor = null,
	dragObj = {
		move: false,
		move_target: null,
		call_size: null,
		call_position: null
	};


function removeDefaultAction(el){
	el.querySelector('img').addEventListener('mousedown',(e)=>{
		e.preventDefault()
	}) 
}

function boxAction(el) {
	box.addEventListener('mousedown', (event)=>{
		var x = event.clientX - event.target.offsetLeft - el.offsetLeft, //pageX和clientX：都是相对浏览器左上角的点为参照点，但是pagex不会随页面滚动改变参考值（document左上角），clientx：可视区左上角
			y = event.clientY - event.target.offsetTop - el.offsetTop,
			dragBox = {
				w: box.offsetWidth,
				h: box.offsetHeight,
				left: box.offsetLeft,
				top: box.offsetTop
			};
		event.posix = {x, y};
		dragObj.move = true;
		dragObj.move_target = event;
		dragObj.call_position = (event)=>{
			if (dragBox.left >= 0 && dragBox.top >= 0 && dragBox.left + dragBox.w < container.offsetWidth && dragBox.top + dragBox.h < container.offsetHeight) {
			  var top = event.pageY - container.offsetTop - y;
			  var left = event.pageX - container.offsetLeft - x;
			  box.style.top = top + 'px';
			  box.style.left = left + 'px';
			}
		}
	})
}

function coorAction(el){
	coor.addEventListener('mousedown', (event) => {
	let posix = {
	      w: box.offsetWidth,
	      h: box.offsetHeight,
	      x: event.clientX,
	      y: event.clientY
		};
		dragObj.move = true;
		dragObj.call_size = (event)=>{
			if (posix.w <= container.offsetWidth) {
			  box.style.width = event.pageX - box.offsetLeft - el.offsetLeft + 'px';
			}
			if (posix.h <= container.offsetHeight) {
			  box.style.height = event.pageY - box.offsetTop - el.offsetTop + 'px';
			}
		}
	})
}

function judgeState() { // 判断是否在容器范围内/或者超出容器
	var dragBox = {
		w: box.offsetWidth,
		h: box.offsetHeight,
		left: box.offsetLeft,
		top: box.offsetTop
	}
	if (!(dragBox.left >= 0 && dragBox.top >= 0 && dragBox.left + dragBox.w < container.offsetWidth && dragBox.top + dragBox.h < container.offsetHeight)) {
		box.style.top = 0 + 'px';
		box.style.left = 0 + 'px';
	}
	if (dragBox.w > container.offsetWidth) {
		box.style.width = container.offsetWidth + 'px';
	}
	if (dragBox.h > container.offsetHeight) {
		box.style.height = container.offsetHeight + 'px';
	}
}


export default {
	install() {
		Vue.directive('drag', {
			bind: function (el) {
				container = el;
				box = el.querySelector('#box');
				coor = el.querySelector("#coor");
				// removeDefaultAction(el);
				boxAction(el);
				coorAction(el);
				document.addEventListener('mousemove', function (event) {
					if (!!dragObj.move) {
						var callback = dragObj.call_size || dragObj.call_position;
						callback(event);
					}
				})
				document.addEventListener('mouseup', function (e) { //鼠标停止点击将所有的状态置为初始状态
					if (!!dragObj.move) {
					judgeState();
					dragObj.move = false;
					dragObj.call_size = null; 
					}
				});
			}
		})
	}
}
