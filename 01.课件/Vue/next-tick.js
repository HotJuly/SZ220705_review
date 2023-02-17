/*
  ES6模块化特点
    一个文件无论被引用多少次,都只会执行一次内部的代码

*/
// 由于ES6模块化的特性,整个Vue项目会共享这里的这一个callbacks数组
const callbacks = []
let pending = false
let timerFunc;

// 只要该函数执行了,那么callbacks收集的所有回调函数都会执行
function flushCallbacks () {
  pending = false

  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// 此处在检测,当前浏览器是否支持使用Promise
if (typeof Promise !== 'undefined') {
  // 能进入这里,就说明当前环境支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
}


export function nextTick (cb,vm) {
  // 这一个callbacks数组,可以收集当前所有nextTick的回调函数
  callbacks.push(() => {
    if (cb) {
        cb.call(vm)
    }
  })

  if (!pending) {
    // 由于此处具有开关功能,所以无论调用多少次nextTick,都只会执行一次这里面的代码
    pending = true
    timerFunc()
  }
}

/*
  nextTick源码重点
    1.在项目中,调用N次nextTick,他们的回调函数都会被callbacks数组收集
    2.无论调用多少次nextTick,都只会开启一个微任务
    3.在这个nextTick专用的微任务中,Vue会遍历callbacks数组,执行内部所有的回调函数


*/
