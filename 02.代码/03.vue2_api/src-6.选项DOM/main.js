import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false

/*
  面试题:请问在Vue项目中,能影响到页面显示内容的有几个地方?
  回答:
    1.可以在el指定的元素内部书写模版
    2.在main.js的配置对象中,添加template属性可以控制
    3.在main.js的配置对象中,添加render属性可以控制

    扩展问题:以上三者的优先级
    优先级:render>template>el

*/

new Vue({
  el:"#app",
  data:{
    msg1:"我是html的内容",
    msg2:"我是template的内容"
  },
  template:"<h2>{{msg2}}</h2>",
  render: h => h(App),
})
// .$mount('#app')
