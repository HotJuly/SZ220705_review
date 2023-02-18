<template>
    <div class="img">
        <img style="width:200px;" :src="$attrs.src" alt="" srcset=""/>
        <el-image v-show="false" ref="image666" style="width: 100px; height: 100px" v-bind="$attrs">
        </el-image>
        <!-- <el-button @click="click">放大</el-button> -->
        <slot name="content" :listeners="{
            click
        }"></slot>
    </div>
</template>
  
<script>
export default {
    name: 'BigImage',
    data() {
        return {
        }
    },
    methods:{
        click(){
            this.$refs.image666.clickHandler();
        }
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
  