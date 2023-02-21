<template>
  <div class="hello">
    <h1>hello</h1>
    <h1>msg:{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
// 在Vue3中,defineProps和defineEmits这两个方法,都被注册成了全局的编程宏
// 所以他们可以直接使用,不需要引入
const props = defineProps(["msg","fn"]);

// defineProps<{
//   msg:string
// }>()

console.log(props.msg)

setTimeout(()=>{
  props.fn(333)
},2000)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
