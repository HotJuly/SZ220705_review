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

    准备工作流程:
      1.在bind方法中,会new Watcher创建一个watcher实例对象
      2.在Watcher构造函数中,
        -在watcher对象身上添加depIds属性,属性值是一个空对象
        -调用watcher.get方法,准备获取当前插值语法的最新结果
      3.在get方法中,
        -会将Dep.target的值修改为当前的watcher对象
        -会调用getVMVal的方法,准备读取对应表达式的结果
        -将Dep.target的值重置为null
      4.在getVMVal方法中,会将表达式以.切割,遍历读取对应的属性值
      5.在读取属性值的过程中,会多次触发数据劫持的get方法
      6.在数据劫持的get方法中,会触发dep.depend方法
      7.在dep.depend方法中,会调用watcher.addDep方法
      8.在addDep方法中,watcher对象会使用自己的depIds对象,收集与自身相关的dep对象
      9.最终,dep对象也会调用dep.addSub方法,收集与自身相关的watcher对象
        总结:经过以上操作,dep和watcher对象都收集到了彼此

    响应式流程:
      1.开发者通过vm.msg=新值,想要修改数据以及更新页面
      2.以上操作会触发数据代理的set方法
      3.在数据代理的set方法中,会将更新的新值,传给data对象的同名属性,进行修改
        那么此处会触发数据劫持的set方法
      4.在数据劫持的set方法中,会调用dep.notify方法
      5.在notify方法中,dep会遍历自己的subs数组,获取到内部所有的watcher对象,并调用他们的update方法
      6.在update方法中,会调用run方法
      7.在run方法中,
        -获取到当前表达式的最新结果
        -与旧值进行比较,
          如果新旧值不相同,那么调用cb函数,更新对应的文本节点
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

  /*
    MVVM源码第三部分:模版解析
    将页面上的部分结构作为模版进行编译,将内部插值语法等内容变成真正想要展示的内容
    目的:
      1.将模版中的插值语法,变成真正想要给用户观看的data数据
      2.为了生成watcher对象
    流程:
      1.构造调用Compiler函数,传入options.el属性
      2.在Compiler函数中,会判断el属性是否是真实DOM,如果不是就找到对应的DOM节点,
        最终将找到的DOM节点放入$el身上
      3.将$el对象身上的所有子节点,全部转移到文档碎片对象上(抄家)
      4.调用init方法,开始编译文档碎片对象的内容
      5.在compileElement方法中,会获取到文档碎片的直系子节点,并作出判断
        -如果是元素节点,就获取所有的标签属性,进行判断,看他是不是指令
        -如果是文本节点,就判断他是否满足插值语法的正则,如果满足继续向下编译
      6.调用compileText方法,准备编译该文本内容
      7.调用bind方法,
        -找到对应的更新器函数
        -调用更新器函数,并将插值表达式对应的属性值,传入更新器函数,用于更新该节点的文本内容
        -创建一个全新的watcher对象
          总结:每具有一个插值语法,就会创建一个对应的watcher对象
      8.最终使用appendChild方法,将编译完的文档碎片插入到$el元素中
  
  */
  this.$compile = new Compile(options.el || document.body, this);
  // this.$compile = new Compile("#app", this);

  /*
    问题1:请问Vue1更新DOM是同步更新还是异步更新?
    回答:同步更新,在整个响应式更新流程中,从来没有出现过异步任务

      渲染页面一定是异步渲染,因为渲染操作是由GUI线程负责的

    问题2:请问Vue2更新DOM是同步更新还是异步更新?
    回答:异步更新,会将更新DOM这件事情放在微任务中执行

    问题3:请问Vue1更新DOM的范围是多大?(整个项目,整个组件,某个节点)
    回答:某个节点,
      可以在非常多个节点中,找到需要更新的那几个节点
        就是所谓的精准更新

    问题4:请问Vue2更新DOM的范围是多大?(整个项目,整个组件,某个节点)
    回答:整个组件
      就是所谓的范围更新(模糊更新)
        从描述上来看,感觉Vue1的精准更新,会比Vue2的范围更新更好
        实际上并不是这么简单,
          Vue1能做到精准更新是有代价的,因为他给每个节点都准备了watcher对象
          Vue2范围更新,虽然更新的节点比较多,但是他只需要给每个组件生成一个watcher对象

            Vue2看起来会存在误杀的请款,但是实际上Vue2也考虑到这个问题
                所以在Vue2中,新增了虚拟DOM和diff算法,就是为了解决这个问题

    问题5:请问Vue1中,使用数组的下标更新数据,是否具有响应式效果?
    回答:Vue1使用下标更新数组,有响应式效果

    问题6:请问Vue2中,使用数组的下标更新数据,是否具有响应式效果?
    回答:Vue2使用下标更新数组,没有响应式效果

      问题:为什么Vue1能够数据劫持数组下标,Vue2为什么不劫持?
      回答:性能问题
          尤大大故意这么做的,因为平常开发中,数组的体积一般不小,内部的数据很多
            那么会无形中对数组的下标进行数据劫持,那么会产生非常多的dep对象
            重点在于,这些产生的dep对象,绝大多数时间都没有用处,产生浪费内存和运行速度

      问题:如果我们真的想要修改数组中的内容,怎么做才有响应式效果?
      回答:使用数组重写过的七种方法
        七种方法:push,pop,shift,unshift,sort,reverse,splice

      问题:Vue2中,是如何做到不劫持数组的下标的?
      回答:
        Vue2使用过对数组进行遍历,跳过了对数组下标的数据劫持
          但是数组内部的每个元素,如果是对象,那么内部的属性也会被数据劫持
          注意:如果数组中的对象过多,而且属性也很多,那么也会产生非常多的无用的dep对象
            所以,我们可以使用Object.freeze方法,对请求得到列表数组进行大数组冻结
              让内部所有的属性都不会产生dep对象

      问题:Vue2中,是如何做到重写7种方法,还不影响到普通数组的7种方法的?
        流程:
          1.首先会使用Object.create方法,创建一个全新的对象
          2.将该对象的__proto__修改为Array.prototype
          3.在流程1创建的全新对象身上,创建了7种与数组同名的方法
          4.将存放于data中的数组,他们的__proto__全部修改为当前流程1创建的新对象

          扩展点:每个数组会具有一个dep对象,说白了,每次调用重写过的方法
            都会找当前数组获取他专用的dep对象,然后通知DOM更新

  
  
  
  */
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
