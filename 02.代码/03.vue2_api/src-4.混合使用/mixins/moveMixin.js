export default {
  data(){
    return{
      pageX:null,
      pageY:null
    }
  },  
  mounted(){
    // console.log('hello的mounted',this.$options.name)
    /*
      需求:当用户的鼠标在页面上移动的时候,需要在页面上显示用户鼠标当前坐标
      拆解:
        1.如何知道用户鼠标是否正在移动?
          绑定事件监听
            事件源:document
            事件名:mousemove

        2.鼠标当前的位置坐标
          通过事件对象event

        3.如何将数据显示在页面上?
          在data中创建响应式属性,并在页面上使用即可
    
    */

    document.addEventListener('mousemove',this.moveHandler)
  },
  beforeDestroy(){
    document.removeEventListener('mousemove',this.moveHandler)
  },
  methods:{
    moveHandler(event){
      // console.log(event)
      const {clientX,clientY} = event;
      this.pageX = clientX;
      this.pageY = clientY;
    }
  }
}