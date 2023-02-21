<template>
  <div class="hello">
    <h1>hello:{{ msg777 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import {inject} from 'vue';
const msg777 = inject("msg666");

setTimeout(()=>{
  msg777.value="我是hello的数据"
},3000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
