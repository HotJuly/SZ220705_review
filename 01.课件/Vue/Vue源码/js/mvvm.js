function MVVM(options) {
  /*
    this->mvvm的实例对象,简称vm
    options->{
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          }
        }
      }
  */

  this.$options = options;

  var data = this._data = this.$options.data;
  // var data = (this._data = this.$options.data);
  // var data = this.$options.data;

  var me = this;

  /*
    MVVM源码第一部分:数据代理
    代理:我找代理购买酒,代理转头就找厂家拿酒,再将拿到的酒给我
    目的:只是为了方便开发者开发,在读取data对象中的数据的时候,不需要在写._data这层
        也就是说,这个数据代理,其实不是响应式原理中,不可缺少的一环
    次数:2次(代理的次数与data对象直系属性名个数有关)
    流程:
      1.使用Object.keys方法,获取到了data对象中,所有的直系属性名
      2.遍历得到的数组,并对内部每个属性名都执行_proxy方法
      3.通过使用Object.defineProperty,可以给vm对象身上新增与data对象同名的属性
        这些属性都是访问描述符,他们具有get和set方法
          如果开发者读取该属性的值,就会触发get方法,方法内部会找data对象读取同名属性的属性值进行返回
          如果开发者修改该属性的值,就会触发set方法,方法内部会对data对象同名属性进行修改
      
  
  
  */

  Object.keys(data).forEach(function (key) {
    me._proxy(key);
  });

  // Object.keys只会返回由直系属性名组成的数组
  // ["msg","person"].forEach(function (key) {
  //   vm._proxy("msg");
  // });

  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this);
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    //   vm._proxy("msg");
    // this->vm对象

    var me = this;

    Object.defineProperty(me, key, {
      configurable: false, //不能重复定义
      enumerable: true, //可以遍历
      get: function proxyGetter() {
        return me._data[key];
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });

    // js中,属性一共分为两种:数据描述符,访问描述符(存取描述符)
    // var obj = {name:"xiaoming"}
    // 数据描述符,是ES6之前就存在的,说明当前属性具有自己的属性值
    // 访问描述符,是ES6新增的,说明当前属性没有自己的属性值,他只有get和set方法
    //      如果开发者读取这个属性,就会触发get方法,最终读取的结果就是get方法的返回值
    //      如果开发者修改这个属性,就会触发set方法,执行内部的代码
    // 总结:一个属性要么具有value值,要么具有get和set,这两者不能共存

    // Object.defineProperty可以对一个对象,进行新增或者修改属性的操作

    // 由于vm本身就没有msg属性,所以这里是在新增属性
    // Object.defineProperty(vm, "msg", {
    //   configurable: false, //不能重复定义
    //   enumerable: true, //可以遍历
    //   get: function proxyGetter() {
    //     return vm._data["msg"];
    //   },
    //   set: function proxySetter(newVal) {
    //     vm._data["msg"] = newVal;
    //   },
    // });

  },
};
