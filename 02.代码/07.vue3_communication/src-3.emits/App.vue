<template>
  <h1>APP msg:{{msg}}</h1>
  <HelloWorld @abc="handler"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import {ref} from 'vue'

const msg =ref('我是APP的数据')

const handler = (data)=>{
  msg.value = data;
}
</script>

<style>
</style>
