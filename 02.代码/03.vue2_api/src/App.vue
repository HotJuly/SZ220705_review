<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <h1>arr[1]:{{ arr[1] }}</h1>
      <button @click="handler">修改</button> -->


    <h1>我是h1</h1>
    <h2 ref="h2" v-if="isShow1">我是h2</h2>
    <h3 ref="h3" v-if="isShow2">我是h3</h3>

    <!-- <button @click="handler1">修改</button> -->
    <button @click="handler2">修改2</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      arr: [1, 2, 3, 4, 5],
      isShow1: false,
      isShow2: false
    }
  },
  methods: {
    handler() {
      // this.arr[1] = 7;
      // this.arr.splice(1,1,7);
      // console.log(this.arr)

      // var arr = [7,8,9,0];
      // arr.splice(1,1,10);
      // console.log(arr)

    },
    handler1() {

      /*
        问题:Vue2更新DOM是同步更新还是异步更新?
        回答:异步更新,Vue2更新DOM是在微任务中更新的
          Vue2源码中,会将更新DOM的方法放在nextTick中执行

        问题:Vue2更新DOM的范围是多大?
        回答:整个组件
      
      
      */
    //  隐藏的nextTick
      this.isShow1=true;

      Promise.resolve().then(() => {
        console.log(1)
      })

      this.$nextTick(() => {
        console.log(2)
      })

      Promise.resolve().then(() => {
        console.log(3)
      })

      this.$nextTick(() => {
        console.log(4)
      })
    },
    handler2(){
      // 注意:必须在更新数据之后,在写nextTick才能获取到对应的DOM结构
      // 原因:因为更新数据会导致,Vue将更新DOM的方法传给nextTick
      //      那么在更新数据之前执行的nextTick,会排在更新DOM的前面,会拿不到最新的DOM节点
      
      this.isShow1 = true;

      this.$nextTick(()=>{
        console.log(this.$refs.h2,this.$refs.h3);
      });

      this.isShow2 = true;
    }
  },
  components: {
    HelloWorld
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
