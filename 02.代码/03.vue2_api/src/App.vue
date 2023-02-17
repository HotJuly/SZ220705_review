<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <!-- <keep-alive include="A"> -->
    <!-- <keep-alive exclude="A"> -->
    <keep-alive max="10">
      <A v-if="isShow"/>
      <B v-else/>
    </keep-alive>

    <!-- <keep-alive include="login,a,b,c">
      <router-view/>
    </keep-alive> -->

    <button @click="isShow=!isShow">切换</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
import B from './components/B.vue'

export default {
  name: 'App',
  data(){
    return{
      isShow:true
    }
  },
  components: {
    HelloWorld,
    A,
    B
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
