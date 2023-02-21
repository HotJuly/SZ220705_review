<template>
  <div class="hello">
    <h1>hello:{{ msg123 }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
defineProps(["modelValue","msg123"]);
const emits = defineEmits(["update:msg123"]);

setTimeout(()=>{
  emits("update:msg123",999)
},2000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
