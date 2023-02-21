<template>
  <h1>APP的msg:{{msg}}</h1>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App',
  // provide:{
  //   msg:123
  // }
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref,provide} from 'vue';

const msg = ref("我是APP的数据");

provide("msg666",msg);


</script>

<style>
</style>
