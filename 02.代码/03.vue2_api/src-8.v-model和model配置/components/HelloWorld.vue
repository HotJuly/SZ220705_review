<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="clickHandler">APP传下来的value:{{msg123}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String,
    msg123:String
  },
  methods:{
    clickHandler(){
      // this.value = "全新数据"
      this.$emit('input777',"全新数据")
    }
  },
  model:{
    event:"input777",
    prop:"msg123"
  }
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
