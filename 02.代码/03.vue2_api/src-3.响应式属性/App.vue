<template>
  <div id="app">
    <h1>user.name:{{ user.name }}</h1>
    <h1>user.age:{{ user.age }}</h1>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      user: {
        name: "xiaoming"
      }
    }
  },
  components: {
    HelloWorld
  },
  mounted() {
    /*
      响应式属性的了解
        1.什么是响应式属性?
          响应式属性:
            当用户修改某个属性值的时候,页面会自动展示出最新结果,满足这样条件的属性就是响应式属性
            
          非响应式属性:
            当用户修改某个属性值的时候,页面没有展示出最新结果

        2.响应式属性的创建时机?
          一共具有两个时机
          1.在组件初始化的时候,Vue会自动调用data函数,并对返回的对象进行数据劫持,将内部所有的属性都变成响应式属性
          2.在修改响应式属性值的时候,Vue会将传入的最新数据,进行数据劫持,将内部所有的属性变成响应式属性

        3.如何快速判断一个属性是否是响应式属性?
          直接打印该对象,如果属性值是...,那么说明该属性就是响应式属性
                      如果属性值是直接显示原值,那么说明该属性是非响应式属性

        4.如何新增响应式属性?
          1.Vue.set
          2.this.$set

        5.Vue2响应式原理中存在的BUG
          1.新增属性Vue无法知道,导致新增的属性不是响应式属性
          2.如果删除一个响应式属性,Vue2也无法发现,导致删除属性后,页面还是显示之前的数据,不会更更新
    */

    // this.user.name = "xiaohong"

    // this.user = {
    //   name:"xiaolv",
    //   age:23
    // }

    // this.user.age = 23;
    // console.log(this.user)


    //---------------------------
    // var obj = {
    //   name:"xiaolv"
    // };

    // obj.age = 23;

    // this.user = obj;

    //----------------------

    // this.user = {
    //   name:"xiaolv"
    // };

    // // this.user.age = 23;

    // this.$set(this.user,"age",23)


    // setTimeout(()=>{
    //   this.user.age = 28;
    //   console.log(this.user)
    // },3000)

    //----------------------------
      // delete this.user.name;
      // 或者Vue.delete
      this.$delete(this.user,"name")
      console.log(this.user)
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
