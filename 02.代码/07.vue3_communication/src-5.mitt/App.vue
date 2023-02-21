<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'
import myBus from '@/myBus';

myBus.on("abcd",(data)=>{
  console.log("abcd",data)
})

</script>

<style>
</style>
