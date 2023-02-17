<template>
  <div id="app">
    <h1>App的msg1:{{ msg1 }}</h1>
    <h1 v-pre>App的msg1:{{ msg1 }}</h1>
    <h1 v-once>App的msg1:{{ msg1 }}</h1>
    <!-- <HelloWorld :msg.sync="msg1" /> -->
    <HelloWorld :msg="msg1" @update:msg="data=>msg1=data"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      msg1: "我是APP的数据"
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
    this.$bus.$emit('sendData',678)

    this.msg1 = "777888"
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
