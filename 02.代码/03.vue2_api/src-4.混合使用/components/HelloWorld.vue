<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>pageX:{{pageX}}</h2>
    <h2>pageY:{{pageY}}</h2>
    <h3>b:{{b}}</h3>
  </div>
</template>

<script>
import moveMixin from '@/mixins/moveMixin'
export default {
  name: 'HelloWorld',
  data(){
    return {
      b:1
    }
  },
  props: {
    msg: String
  },
  mixins:[moveMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
