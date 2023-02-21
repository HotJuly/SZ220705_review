<template>
  <HelloWorld :msg="msg" :fn="fn"/>
  <h2>APP的msg:{{msg}}</h2>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from 'vue'
import HelloWorld from '@/components/HelloWorld'

const msg = ref("我是APP的数据")

const fn = (data)=>{
  msg.value = data;
}
</script>

<style>
</style>
