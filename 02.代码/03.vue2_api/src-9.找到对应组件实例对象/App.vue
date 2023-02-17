<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <el-input ref="input666" /> -->
    <!-- <input type="text"> -->

    <BigImage></BigImage>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  data() {
    return {
      msg1: "我是初始化数据"
    }
  },
  components: {
    HelloWorld,
    BigImage
  },
  mounted() {
    // console.log(this.msg1)
    // console.log(this.$data)
    // console.log(this.$children[0].msg)
    console.log(this.$refs.input666)
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
