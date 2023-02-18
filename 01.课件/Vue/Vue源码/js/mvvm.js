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

  /*
    响应式
    需求:当某个属性值发生变化的时候,页面需要自动展示最新结果
    拆解:
      1.当某个属性值发生变化的时候
        监视
        可以通过Object.defineProperty,去将一个属性变成访问描述符
          再通过他的set方法,可以监视到用户是否修改了属性值

      2.页面需要自动展示最新结果
        应该需要找到页面上对应的DOM节点,并将最新的结果值作为文本进行替换
  */

  /*
    MVVM源码第二部分:数据劫持
    劫持:限制某个人的人身自由,强迫他做一些他不想做的事情
    目的:
        1.将data对象中,所有的属性都进行重写,全部改为访问描述符
        最终目的:可以通过访问描述符的set方法,监视用户对于属性值的修改操作
    次数:4次(劫持的次数与data对象中属性的个数有关)
    流程:
      1.调用observe方法,将data对象传入
      2.在observe方法,Vue会判断传入的data是否有值,是否是对象
        如果没值或者不是对象,那么流程结束,反之继续往下执行代码
      3.构造调用Observer函数,创建ob对象,并调用walk方法
      4.在walk方法中,会调用Object.keys获取到data对象所有的直系属性名,
        并进行遍历
      5.在遍历的过程中,会调用defineReactive方法,并将属性名和属性值都传入该函数
      6.在defineReactive方法中,
        -创建一个全新的dep对象
          总结:每个响应式属性都会创建一个对应的dep对象
        -调用observe方法,对属性值进行深度递归,进行数据劫持
        -调用Object.defineProperty,对data中的属性进行重写操作
          将原先具有value值的属性,重写成为访问描述符(get/set)
          并且使用闭包来缓存当前属性的value值

          如果开发者读取当前属性值,那么就会触发get方法,get方法会自动返回闭包的结果
          如果开发者修改当前属性值,那么就会触发set方法,
            -判断新旧值是否相同,如果相同就什么都不做
            -将闭包中的值替换成新值
            -对新值进行深度数据劫持,将内部所有的属性都变成响应式属性
            -调用dep.notify方法,通知DOM进行更新
  */
  observe(data, this);
  // observe(data, vm);

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
