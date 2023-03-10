# VueRouter总结

1. 对于VueRouter的了解
   1. 他是一个npm包
   2. 他是Vue的扩展插件库(Vue.use)
   3. 可以使用他实现单页面应用(SPA)
   4. 问题:请问什么是单页面应用?
      1. 一个html文件就是一个页面
      2. 单页面项目就是说,整个项目中,只有一个html文件,通过DOM的增删改查方法,控制页面上显示的内容,从而实现多组件切换的效果
      3. 问题:请问不使用VueRouter能否实现单页面应用?
         1. 不一定,只是用v-if,v-show或者动态组件component都能实现单页面应用
      4. 问题:请问我们有没有做过多页面项目?
         1. 例如一阶段做的大疆或者尚品汇项目

2. VueRouter给我们提供了什么?
   1. 构造函数
      1. 可以创建得到一个路由器实例对象
   2. 全局组件
      1. router-view
         1. 用于显示匹配当前路径的路由组件内容
         2. **原理:其实router-view标签中,是使用到了响应式原理实现的**
      2. router-link
         1. 用于显示标签,当用户点击生成的标签,就会发生路由跳转
         2. **声明式导航定义:通过标签的形式,引导用户进行路由跳转,这类操作称为声明式导航**
         3. **原理:**
            1. **他会在页面上创建显示一个a标签**
            2. **给a标签绑定点击事件,在事件的回调函数中,可以执行event.preventDefault()禁用默认行为**
            3. **最终,在调用编程式导航中的push方法实现路由跳转**
   3. 公共对象
      1. $router
         1. 这是一个路由器对象,它可以用来控制管理路由,他一般会提供一些操作路由的API
         2. push
            1. 可以通过调用该方法,跳转到指定的路由地址下
            2. **编程式导航定义:通过js的API,强制用户进行跳转,这类操作称为编程式导航**
            3. 注意:该方法跳转路由,会影响到历史记录栈,会记录本次跳转,会插入当前的历史记录,还能返回上一个路径
            4. 原理:
               1. hash模式下,其实是使用了**window.location.assign**方法,实现路由的跳转功能,还会保留上一个历史记录
               2. history模式下,其实是使用了**window.history.pushState**方法,实现路由的跳转功能,还会保留上一个历史记录
         3. replace
            1. 可以通过调用该方法,跳转到指定的路由地址下
            2. 注意:该方法跳转路由,会影响到历史记录栈,会记录本次跳转,但是会覆盖上一次历史记录,导致无法返回上一个路径
            3. 原理:
               1. hash模式下,其实是使用了**window.location.replace**方法,实现路由的跳转功能,并且会自动覆盖上一个历史记录
               2. history模式下,其实是使用了**window.history.replaceState**方法,实现路由的跳转功能,并且会自动覆盖上一个历史记录
      2. $route
         1. 这是一个路由对象,他用来告知一些与当前所在路由相关的信息
         2. fullpath属性
            1. 存储这当前所在路由的完整地址
         3. query属性
            1. 他是URL传参的一员
            2. 格式:"/home?username=xiaoming"
         4. params属性
            1. 他是URL传参的一员
            2. 格式:"/home/1"
            3. 注意:想使用该方法传参,需要在声明路由对象的时候,在path属性中,需要写好占位符
               1. path:"/home/:id"
         5. meta属性
            1. 他不是URL传参的医院
            2. 想使用它,就需要将数据提前放在路由对象身上,与path,component属性同级

3. 我们提供给VueRouter什么?
   1. 配置对象
      1. mode属性
         1. 该属性用于告知VueRouter使用哪种路由模式
         2. 属性值:"hash"||"history"
            1. hash模式
               1. 原理
                  1. 会给window对象绑定一个事件监听,事件名称**hashchange**,该事件可以监视地址栏中hash值的变化,从而执行对应的回调函数
                  2. 在回调函数中,读取window.location对象中的hash值,就可以获取到最新的路由路径,并将其更新给指定的响应式属性
                  3. 那么最终router-view组件,就会因为使用到该响应式属性,导致组件更新渲染,自动展示最新的路由组件
               2. 优点:
                  1. 兼容性好,IE6以上都支持
                  2. 上线的时候,不需要做任何特殊配置
                     1. 无论在哪个路由地址下,刷新当前标签页,发给服务器的请求永远是请求/根路径
                        1. 所以服务器只要在/请求下,返回index.html文件即可
               3. 缺点:
                  1. 丑是原罪,路径带有#,甲方爸爸看着不爽
                  2. 由于浏览器把hash路径当作锚点解析,所以未影响到真正的锚点功能
            2. history模式
               1. 原理
                  1. 会给window对象绑定一个事件监听,事件名称**popstate**,该事件可以监视地址栏中路径的变化,从而执行对应的回调函数
                  2. 在回调函数中,读取window.location对象中的pathname值,就可以获取到最新的路由路径,并将其更新给指定的响应式属性
                  3. 那么最终router-view组件,就会因为使用到该响应式属性,导致组件更新渲染,自动展示最新的路由组件
               2. 优点:
                  1. 颜值就是正义,帅就是可为所欲为
                  2. 锚点功能依旧可以正常使用
               3. 缺点:
                  1. 兼容性较差,因为history是HTML5的新特性,IE所有版本都不支持
                  2. **history模式上线的时候,服务器需要做特殊配置**
                     1. **问题:当用户在某个路由路径下,刷新当前标签页,浏览器会将地址栏中的前端路由,误识别为后端路由,发送给服务器,服务器没有该接口,就会返回404**
                     2. **配置:**
                        1. **当用户在某个路由路径下,刷新当前标签页,浏览器会将地址栏中的前端路由,误识别为后端路由,发送给服务器**
                        2. **此时,要求服务器将自己没有的接口,统一返回index.html文件**
                        3. **浏览器得到该html文件,会发现还需要请求index.js文件**
                        4. **服务器返回index.js文件给浏览器,**
                        5. **浏览器解析该文件并自动执行内部代码**
                           1. **此时js文件中的VueRouter代码就会生效,自动解析地址栏中的地址,router-view组件就会自动显示对应组件**
      2. routes属性
         1. 数据类型:routeObj[]
         2. 路由对象中重要属性
            1. path
               1. 代表当前路由需要注册的地址
            2. component
               1. 当地址栏中的路径与path匹配,那么页面需要显示的组件

4. 导航守卫

   1. 导航守卫,又称为路由守卫,一共分为三大类

   2. 用处:在跳转路由的过程中,可以约束控制用户是否真的能够跳转成功

   3. 全局守卫

      1. 全局前置守卫

         1. 在路由跳转之前会触发

      2. 全局解析守卫

         1. 在组件解析成功之后会触发
         2. 目的:为了监视异步组件的解析是否完成

      3. 全局后置守卫

         1. 在路由跳转成功之后会触发

      4. ```javascript
         const router = new VueRouter({ ... })

         router.beforeEach((to, from, next) => {
           // to->你想去哪
           // from->你从哪来
           //next->放行
           //next()->想去哪就去哪
           //next(false)->从哪来回哪去
           //next('/login')->带你去好地方(指定的)
         })
         ```

         ​

   4. 路由独享守卫

      1. ```javascript
         const router = new VueRouter({
           routes: [
             {
               path: '/foo',
               component: Foo,
               beforeEnter: (to, from, next) => {
                 // ...
               }
             }
           ]
         })
         ```

         ​

   5. 组件内置守卫

      1. 组件进入守卫

         1. 在进入该组件之前触发

      2. 组件更新守卫

         1. 在组件被复用的情况下会触发
         2. 本来页面上就显示了该组件,结果跳转路由之后,还是显示该组件,就说明当前组件被复用了,不会卸载再挂载

      3. 组件离开守卫

         1. 在离开当前组件之前触发

      4. ```javascript
         export default{
           data(){
             return{
               msg:123
             }
           }
           beforeRouteEnter(to, from, next) {
             // 在渲染该组件的对应路由被 confirm 前调用
             // 不！能！获取组件实例 `this`
             // 因为当守卫执行前，组件实例还没被创建
           },
           beforeRouteUpdate(to, from, next) {
             // 在当前路由改变，但是该组件被复用时调用
             // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
             // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
             // 可以访问组件实例 `this`
           },
           beforeRouteLeave(to, from, next) {
             // 导航离开该组件的对应路由时调用
             // 可以访问组件实例 `this`
           }
         }
         ```

         ​

   6. ​