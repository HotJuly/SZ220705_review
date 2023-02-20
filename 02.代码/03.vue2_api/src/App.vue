<template>
  <div id="app">
    <HelloWorld v-if="$route.meta.showHeader" msg="Welcome to Your Vue.js App"/>
    <router-view/>
    <br/>

    <router-link tag="h1" to="/home">toHome</router-link>
    <!-- <router-link to="/about">toAbout</router-link> -->
    <button @click="toAbout">toAbout</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    toAbout(){
      // this.$router.push("/about");
      this.$router.replace("/about");
    }
  },
  mounted(){
    console.log(this.$route)
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
