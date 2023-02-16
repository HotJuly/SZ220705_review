import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.config.devtools = true;

/*
  需求:将所有组件的配置对象中,他们的a属性值+1操作
  解决:使用Vue的全局配置中的自定义合并策略,使用他可以一次性修改所有组件的配置对象
    可以一次性对所有人都做相同的事情
*/
// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   // console.log(parent, child, vm)
//   return child * 2
// }

/*
  面试题:请问你在开发的过程中,是如何捕获到项目中,出现的报错的
  解决:
    1.try...catch...
    2.Promise的catch方法
    3.组件的生命周期errorCaptured
      如果是当前组件自己出错,是没办法捕获的
    4.Vue.config.errorHandler方法
      可以捕获当前项目中出现的所有报错

  面试题:请问在项目上线之后,你是如何知道项目出现了哪些报错?
  解决:
    1.使用以上4种方法,捕获到用户浏览器中出现的报错
    2.在捕获到错误之后,使用ajax请求,将错误信息发送到公司指定的接口/服务器上
    3.公司会统计,汇总出现的错误,最终反馈给开发人员解决

  问题:出现BUG该怎么做?
  回答:
    1.如果是显示之类的小bug,那么就维护解决该bug,之后在上线最新版项目即可
    2.如果是与金钱相关的重大bug,那么首先回退项目版本,上线旧项目
      然后在解决当前bug之后,再重新上线
*/

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, vm, info)
// }

Vue.config.ignoredElements = [
 "About",
 /^t-/
]

new Vue({
  render: h => h(App),
}).$mount('#app')
