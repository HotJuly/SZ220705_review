import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

Vue.use(ElementUI);

Vue.config.productionTip = false
/*
  需求:在每个组件挂载结束之后,打印当前组件的名称
  解决方案:
    1.使用全局混合,给每个组件都注入mounted钩子函数,然后在内部打印name即可


  混合分为两种
    1.全局混合
    2.局部混合

    注意:
      1.如果一个组件同时具有全局混合,局部混合,组件内置的生命周期
        三者的生命周期钩子函数会共存,执行顺序:全局混合优先->局部混合->组件内置
        
      2.如果一个组件同时具有全局混合,局部混合,组件内置的data,methods,props,computed,watch等
        那么三者会发生覆盖操作,优先级:组件内置最高->局部混合其次->全局混合最后
*/

// 这里相当于需要传入一个公共的配置对象
Vue.mixin({
  data(){
    return{
      a:1
    }
  },
  mounted(){
    console.log('全局混合',this.$options.name)
  }
})

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')
