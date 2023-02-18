function Observer(data) {
    // new Observer(data)
    // this->ob对象
    this.data = data;

    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
    // this.walk(data);
    // this->ob对象,data->data对象
        var me = this; 

        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });

        // ["msg","person"].forEach(function(key) {
        //     ob.convert("msg", data["msg"]);
        //     ob.convert("msg", "hello mvvm");
        // });

        
    },
    convert: function(key, val) { 
        // ob.convert("msg", "hello mvvm");
        this.defineReactive(this.data, key, val); 
        // this.defineReactive(data对象, "msg", "hello mvvm"); 
    },

    defineReactive: function(data, key, val) { 
        // this.defineReactive(data对象, "msg", "hello mvvm"); 

        // data对象中,每具有一个直系属性名,就会创建一个全新的dep对象
        // data对象中,每具有一个属性名,就会创建一个全新的dep对象
        // dep对象与响应式属性具有对应关系
        var dep = new Dep();  

        // 此处会对属性值进行深度数据劫持,将data中所有的属性都变成响应式属性
        var childObj = observe(val);
        // var childObj = observe("hello mvvm");

        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            get: function() {
              
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;

                childObj = observe(newVal);
                
                dep.notify();
            }
        });

        // 由于data对象本身就具有msg属性,所以此处是在重写msg属性
        // 此处会将原本是数据描述符的msg属性,强行改为访问描述符
        // 导致msg原先的value值丢失了,但是同时获得了get和set方法

        // 此处Vue很巧妙的使用了闭包,将msg属性原先的属性值保留了下来,还让msg属性同时具有get和set方法
        // Object.defineProperty(data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     get: function() {
              
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
        //        如果更新的新值与旧值相同,那么后续代码都不会执行
        //         也就是说,只要新旧值相同,那么无论修改多少次,页面都不会更新
        //         if (newVal === val) {
        //             return;
        //         }

        //          将新值存入闭包中,丢弃旧值,目的就是为了将本次的数据留给下次使用
        //         val = newVal;

        //          此处就是响应式属性创建的第二个时机
        //          修改一个响应式属性的值,Vue会将新值进行深度数据劫持,内部所有属性都会变成响应式属性
        //         childObj = observe(newVal);
                
        //         通过对应的dep对象,通知DOM进行更新
        //         dep.notify();
        //     }
        // });

    }
    
};


function observe(value, vm) {
  // observe(data, vm);
  
//   此处在判断data是否有值,如果有值是不是个对象
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
    // return new Observer(data);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) { 
        // dep.addSub(watcher);
        // this->dep对象

        // 将watcher实例对象存入subs数组
        // dep对象收集到了与他相关的watcher对象
        // 响应式属性收集到了使用到他的插值语法
        this.subs.push(sub);
    },

    depend: function() {
        // dep.depend();
        // this->dep对象
        Dep.target.addDep(this);
        // watcher.addDep(dep);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
        // this.subs.forEach(function(sub) {
        //     watcher.update();
        // });
    }
};

Dep.target = null;