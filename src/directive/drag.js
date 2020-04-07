//参考地址： https: //www.cnblogs.com/moqiutao/p/8334780.html
//官网地址： https://cn.vuejs.org/v2/api/#Vue-delete
import Vue from 'vue'
let container = null,
	left = 0,
	top = 0,
	maxHeight = 0,
	options = {
	  multiple: false,
	  scopeLimit: false
	},
	dragObj = {
		move: false,
		move_target: null,
		call_size: null,
		call_position: null
	};


function removeDefaultAction(dom){//移除图片默认拖动行为
	if (dom) {
		dom.addEventListener('mousedown',(e)=>{
			e.preventDefault()
		})
	}
}

function boxAction(dom, el) {//移动控制器
	dom.addEventListener('mousedown', (event)=>{
		let box = dom;
		changeIndex(el, box)
		let left = event.target.offsetLeft;
		top = event.target.offsetTop;
		var x = event.pageX - left - el.offsetLeft, //pageX和clientx：都是相对浏览器左上角的点为参照点，但是pagex不会随页面滚动改变参考值（document左上角），clientx：可视区左上角
			y = event.pageY - top - el.offsetTop;
		event.posix = {x, y};
		dragObj.move = true;
		dragObj.move_target = event;
		dragObj.call_position = (event)=>{
			var top = event.pageY - container.offsetTop - y;
			var left = event.pageX - container.offsetLeft - x;
			box.style.top = top + 'px';
			box.style.left = left + 'px';
		}
	})
}

function coorAction(dom, el){//缩放控制器
	let coor = dom.querySelector('.coor');
	coor.addEventListener('mousedown', (event) => {
	let box = dom;
		dragObj.move = true;
		dragObj.call_size = (event)=>{
			box.style.width = event.pageX - box.offsetLeft - el.offsetLeft + 'px';
			box.style.height = event.pageY - box.offsetTop - el.offsetTop + 'px';
		}
	})
}

function changeIndex(el, target){//修改index，让被点击的图片在最上层
	let boxs = el.querySelectorAll('.box');
	for (const n of boxs) {
		 n.style.zIndex = 9;
	}
	target.style.zIndex = 10;
}

function judgeState(n, el, boxs, i) { // 判断是否在容器范围内/或者超出容器
	let box = n;
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
		flowDom(n, el, boxs, i);

	}
	if (dragBox.h > container.offsetHeight) {
		box.style.height = container.offsetHeight + 'px';
		flowDom(n, el, boxs, i);
	}

}

function flowDom(n, el, boxs, i){//控制多张图片的排版（待优化）
	let size = boxs.length;
	if (size <= 2) {
		n.style.width = Math.floor(el.offsetWidth / size) - 1 + 'px';
	}else if (i <= 2) {
		n.style.width = Math.floor(el.offsetWidth / 3) - 1 + 'px';
	}else{
		n.style.width = Math.floor(el.offsetWidth / (size - 3)) - 1 + 'px';
	}
	n.style.left = left + 'px';
	n.style.top = top + 'px';
	left += n.offsetWidth;
	maxHeight = Math.max(maxHeight, n.offsetHeight);
	if (i === 2) {
		left = 0;
		top = maxHeight;
	}
}
export default {
	install() {
		Vue.directive('drag', {
			inserted: function (el, binding) {
				if (binding.value) {
					options = binding.value;
				}
				container = el;

				// 如果容器内部是图片
				let images = el.querySelectorAll('img');
				for (const n of images) {
					removeDefaultAction(n);
				}

				let boxs = el.querySelectorAll('.box');
				for (let i = 0; i < boxs.length; i++) {
					let n = boxs[i];
					if (options.multiple) {
						setTimeout(() => {
							flowDom(n, el, boxs, i);
						}, 1000);
					}
					boxAction(n, el);
					coorAction(n, el);
				}

				document.addEventListener('mousemove', function (event) {
					if (!!dragObj.move) {
						var callback = dragObj.call_size || dragObj.call_position;
						callback(event);
					}
				})

				document.addEventListener('mouseup', function (e) { //鼠标停止点击将所有的状态置为初始状态
					if (!!dragObj.move) {
						if (options.scopeLimit) {
							for (let i = 0; i < boxs.length; i++) {
								let n = boxs[i];
								judgeState(n, el, boxs, i);
							}
						}
						dragObj.move = false;
						dragObj.call_size = null;
					}
				});
			}
		})
	}
}
