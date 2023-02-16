<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import testMixin from '@/mixins/test';
// console.log(testMixin)

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      a:3
    }
  },
  mixins:[testMixin],
  mounted(){
    console.log('app组件的mounted',this.$options.name,this.a)
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
