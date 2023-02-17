<template>
  <el-tooltip class="item" effect="dark" :content="content" placement="top-end">
    <!-- <el-button :type="type" :size="size">添加</el-button> -->
    <!-- <el-button v-bind="{
      type,
      size
    }">添加</el-button> -->

    <!-- <el-button v-bind="$attrs" @click="handler">添加</el-button> -->
    <!-- <el-button v-bind="$attrs" v-on="{
      click:handler
    }">添加</el-button> -->
    <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
  </el-tooltip>
</template>
  
<script>
export default {
  name: 'HintButton',
  props:["content"],
  methods:{
    handler(){
      // console.log(333)
      this.$emit('click')
    }
  },
  mounted(){
    console.log(this.$listeners)
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
  