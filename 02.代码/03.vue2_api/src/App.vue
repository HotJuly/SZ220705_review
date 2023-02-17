<template>
  <div id="app">
    <HelloWorld 
    msg="Welcome to Your Vue.js App" 
    a="1" 
    b="2" 
    c="3" 
    @abc="()=>{}" 
    @ddd="()=>{}"
    />
    <HintButton type="danger" content="注意了!!!" size="big" @click="click1"/>
    <HintButton type="primary"  content="没事,露个脸" size="small" @click="click2"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HintButton from './components/HintButton.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    HintButton
  },
  methods:{
    click1(){
      console.log('click1')
    },
    click2(){
      console.log('click2')
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
