<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return{
      aaa:666,
      user:{
        ddd:666
      }
    }
  },
  components: {
    HelloWorld
  },
  // provide:{
  //   bbb:777,
  //   ccc:this.aaa
  // },
  mounted(){
    setTimeout(()=>{
      this.user.ccc=888;
    },2000)
  },  
  provide(){
    return {
      bbb:777,
      ccc:this.user
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
