<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <About></About> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

console.log(HelloWorld)

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  a:2,
  mounted(){
    // console.log('app',this.$options.a,c)
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
