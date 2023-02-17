<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>user.name:{{user.name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  /*
    面试题:现在我有一个数据,我想存在data中,但是又不想他是响应式的
    回答:
      1.给属性名加上_或者$开头
      2.使用Object.freeze方法将对象中的所有属性都进行数据冻结
        数据冻结:其实就是将属性全部变为只读属性,无法修改
  */
  data(){
    return {
      msg1:123,
      // _basj:3
      user:Object.freeze({
        name:"xiaoming"
      })
    }
  },
  props: {
    msg: String,
    fn:Function
  },
  mounted(){
    // console.log(this.msg1,this._basj)
    // this.user.name="laowang"
    // 此处的this是Hello的组件实例
    this.fn("我是hello传递的数据");
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
