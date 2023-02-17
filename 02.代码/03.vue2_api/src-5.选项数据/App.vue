<template>
  <div id="app">
    <!-- <h1>bbb:{{bbb}}</h1> -->
    <!-- <HelloWorld :msg="a" :fn="$options.getData"/> -->
    
    <!--  -->

    <h1>a:{{a}}</h1>
    <h1>newA:{{newA}}</h1>
    <h1>newA:{{newA}}</h1>
    <h1>newA:{{newA}}</h1>
    <h1>newA:{{newA}}</h1>
    <h1>newA:{{newA}}</h1>
    <h1>newA:{{newA}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      a:'hello,我是APP的数据',
      bbb:"我是初始化数据"
    }
  },
  components: {
    HelloWorld
  },
  // getData(data){
  //   // console.log('getData',this)
  //   // this.bbb = data;
  // },
  methods:{
    getData1(data){
      // console.log('getData11111',this)
      this.bbb = data;
    }
  },
  computed:{
    newA(){
      console.log('newA')
      return this.a+"!!!!!"
    }
  },
  watch:{
    a(){
      console.log('watch')
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   this.a=777
    // },2000)
  }
  /*
    面试题:请说说对computed和watch的了解
    回答:
      1.相同点
        1.从语法上来说,两者语法几乎相同
        2.他们都可以监视某个属性,如果被监视的属性值发生变化,对应的函数都需要重新执行

      2.不同点
        1.语法细节不同
          computed中的名字是计算属性的名称,他会监视函数内部使用到的属性
          watch中的名字是需要监视的属性名

        2.返回值功能不同
          computed的返回值可以在页面上进行显示,可以在js代码中使用
          watch的返回值没人接收,所以没有用处

        3.使用场景
          computed
            我现在需要一个数据,可惜我手头没有,但是我可以根据现有的数据计算得到
            开发中:在购物车中的总价总数功能

          watch
            当某个数据发生变化的时候,我需要做一些事情
            开发中:在三级分类组件中,如果选择上级分类,就要发送请求,请求下一级分类列表数据

        扩展:computed具有缓存功能


        个人理解:computed更注重于结果,watch更注重于过程
  
  */
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
