<template>
  <div class="hello">
    <h1 @click="handler">hello的msg:{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    handler(){
      this.$emit('update:msg',"我是hello修改之后的数据")
    }
  },
  mounted(){
    this.$bus.$on('sendData',(data)=>{
      console.log('sendData',data)
    })
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
