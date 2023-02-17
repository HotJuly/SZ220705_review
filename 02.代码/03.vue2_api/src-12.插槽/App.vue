<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <A v-if="isShow"/>
    <B v-else/> -->

    <!-- <component :is="showComponent"></component> -->
    <!-- <button @click="handler">切换显示B</button> -->

    <!-- 插槽代码开始 -->
    
    <HelloWorld msg="Welcome to Your Vue.js App">
      <template>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是header插槽</h1>
      </template>
      <!-- <template v-slot:footer="scope">
        <h1>我是footer插槽,{{ scope.msg }}</h1>
      </template> -->
      <template #footer="{msg}">
        <h1>我是footer插槽,{{ msg }}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  data(){
    return {
      isShow:true,
      showComponent:A
    }
  },
  methods:{
    handler(){
      this.showComponent = B;
    }
  },
  components: {
    HelloWorld,
    // A,
    // B
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
