function Compile(el, vm) {
//   this.$compile = new Compile("#app", vm);
// this->com对象

    this.$vm = vm;

    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {

        this.$fragment = this.node2Fragment(this.$el);

        this.init();

        // 这里就是组件挂载
        this.$el.appendChild(this.$fragment);

    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素节点

        // 如果将页面上的节点放入文档碎片中,那么该节点就会从页面上消失
        var fragment = document.createDocumentFragment(),
            child;

        // 此处会不断循环,直到将app元素内部的子节点全部放入文档碎片中为止
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // this->com对象
        // el->fragment节点对象
        // childNodes=[文本节点,p元素节点,文本节点]

        // 第二次执行:el->p元素节点
        // childNodes=[文本节点]
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        // [].slice.call(childNodes)可以实现将伪数组转换为真数组的效果

        // [文本节点,p元素节点,文本节点].forEach(function(node) {
            // 假设node存储着p元素节点
        //     var text = node.textContent;

        // 正则表达式中,如果出现了(),说明使用了分组功能,后续可以快速获取到()内部的内容
        //     var reg = /\{\{(.*)\}\}/;

        //     if (com.isElementNode(node)) {
        //         me.compile(node);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         me.compileText(node, RegExp.$1);
        //         com.compileText(文本节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(node);
        //     }
        // });

    },

    compile: function(node) {
        var nodeAttrs = node.attributes,
            me = this;

        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);

                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });

    },

    compileText: function(node, exp) {
        //com.compileText(文本节点, "msg");
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(文本节点, vm, "msg");
        
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // compileUtil.text(文本节点, vm, "msg");
        // this->compileUtil对象
        this.bind(node, vm, exp, 'text');
        // this.bind(文本节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // this.bind(文本节点, vm, "msg", 'text');
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];
        // updaterFn = textUpdater;

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // textUpdater && textUpdater(文本节点, this._getVMVal(vm, "msg"));
        // textUpdater && textUpdater(文本节点, "hello mvvm");

        // 页面上每具有一个插值语法,就会创建一个对应的watcher对象
        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });

    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // 此方法可以读取到指定属性的值
        // 假设exp->"person.name"

        var val = vm._data;
        // val初始值是data对象

        // exp->["person","name"]
        exp = exp.split('.');

        exp.forEach(function(k) {
            val = val[k];
        });

        // ["person","name"].forEach(function(k) {
        //     第一次:val = data["person"];
        //     第二次: val= person["name"];
        // });

        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};