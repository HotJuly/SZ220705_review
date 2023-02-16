<template>
  <div id="app">
    <!-- <h1 @click="clickHandler">msg:{{ msg }}</h1> -->

    <button v-if="isShow" @click="changeShow">添加</button>
    <input v-else ref="input666" type="text" />

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg: "我是初始数据",
      isShow: true
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    /*
      问题:请问Vue更新数据是同步更新还是异步更新?
      回答:同步修改数据
    
      问题2:请问Vue更新DOM是同步更新还是异步更新?
      回答:异步修改DOM
        异步任务分为宏任务和微任务
          Vue更新DOM其实是微任务,其实就是then

      nextTick他也是异步任务,他会将回调函数延迟一段时间执行
        他的原理中用到了.then
    
    */

    // setTimeout(()=>{
    //   console.log(1)
    // },0)



    this.$nextTick(() => {
      console.log(3)
    })
    
    Promise.resolve().then(() => {
      console.log(2)
    })

    Promise.resolve().then(() => {
      console.log(4)
    })

    this.$nextTick(() => {
      console.log(5)
    })
  },
  methods: {
    clickHandler() {
      console.log(1, this.msg)
      this.msg = "我是修改之后的数据";
      console.log(2, this.msg)
      // debugger
    },
    changeShow() {
      this.isShow = false;
      this.$nextTick(() => {
        // 这个回调函数会在DOM更新之后执行,也就是说回调函数内部可以获取到当前最新的DOM结构
        this.$refs.input666.focus();
      })
    }
  }
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
