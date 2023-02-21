<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <h1>pageX:{{ pageX }}</h1>
  <h1>pageY:{{ pageY }}</h1>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  // setup(){

  // }
}
</script>

<script setup>
import moveHook from '@/hooks/moveHook'
const {pageX,pageY} = moveHook();
</script>

<style>
</style>
