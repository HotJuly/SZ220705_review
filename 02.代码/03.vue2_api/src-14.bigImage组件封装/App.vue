<template>
  <div id="app">
    <BigImage :src="url" :preview-src-list="srcList">
      <template #content="{ listeners }">
        <h1 v-on="listeners">点我放大</h1>
        <!-- <h1 @click="click">点我放大</h1> -->
      </template>
    </BigImage>

    <!-- <BigImage>
      <template #content="{ listeners }">
        <el-button v-on="listeners">点我放大</el-button>
        <!-- <el-button @click="click">点我放大</el-button> -->
      </template>
    </BigImage> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import BigImage from './components/BigImage.vue'

export default {
  name: 'App',
  data() {
    return {
      msg1: "我是初始化数据",
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ]
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
