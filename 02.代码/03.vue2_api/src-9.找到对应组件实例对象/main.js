import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  data:{
    msg2:"我是Root组件"
  },
  render: h => h(App),
}).$mount('#app')
