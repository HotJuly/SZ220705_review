function Watcher(vm, exp, cb) {
  // new Watcher(vm, "msg", function(value, oldValue) {
      // 使用闭包缓存对应的更新器函数,以及对应的节点
  //     textUpdater && textUpdater(文本节点, value, oldValue);
  // });

  // this->watcher实例对象
  // cb函数如果被调用,那么对应的文本节点就会被更新

  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

  this.depIds = {};

  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 此处又会读取当前表达式的最新结果
    var value = this.get();

    var oldVal = this.value;

    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // watcher.addDep(dep);
    // this->watcher对象

    // A.hasOwnProperty("a")->可以判断A对象身上是否具有a属性
    // 有就返回true,没有就是false
    if (!this.depIds.hasOwnProperty(dep.id)) {

      // 此处watcher对象会使用depIds对象,收集对应的dep对象
      // watcher收集到了与他相关的dep对象
      // 插值语法收集到了与他相关的响应式属性
      this.depIds[dep.id] = dep;

      dep.addSub(this);
      // dep.addSub(watcher);
    }
  },
  get: function () {
    // this->watcher实例对象
    Dep.target = this;
    // Dep.target = watcher;

    var value = this.getVMVal();

    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    // 假设exp->["person","name"]
    var exp = this.exp.split(".");

    var val = this.vm._data;

    exp.forEach(function (k) {
      val = val[k];
    });

    // ["person","name"].forEach(function (k) {
    //   val = data["person"];
    //   val = person["name"];
    // });
    return val;
  },
};
