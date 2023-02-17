<template>
  <div id="app">
    <h1>APPde msg1:{{ msg1 }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" v-model="msg1"/>
    <!-- <HelloWorld :value="msg1" @input="data=>msg1=data"/> -->

    <!-- <input type="text" v-model.lazy="msg1"/>
    <input type="text" :value="msg1" @input="event=>msg1=event.target.value"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg1: "我是APP的初始数据"
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
