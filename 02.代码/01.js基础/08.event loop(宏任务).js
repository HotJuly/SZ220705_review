/*
    定时器延迟bug
        定时器的第二个参数,代表当前函数执行的延迟时间
        最小值为1,即便写了0,默认也会变成1

    现象是打印结果出现1,2或者2,1
    原因:因为定时器的延迟时间最小为1ms,但是主线程代码执行很可能没有消耗1ms
        导致到达timers阶段的时候,定时器还没有满足执行的条件,所以会限制性setImmediate的宏任务

    解决:延长主线程代码的时间,让其超过1ms


    node宏任务注意点:
        1.node一共6个阶段,对应6个宏任务队列
            所以在node查看执行顺序,需要优先关注他们的阶段,如果是同阶段的宏任务再看开启的先后顺序
            
        2.node事件轮询的起点是1号阶段(timers阶段),休息区是4号阶段(I/O阶段)
            事件轮询不存在跳阶段的可能性,一定是从1走完6,再从6回到1,不断轮询
*/
const fs = require('fs');
// setTimeout(()=>{
//     console.log(1)
// },0)


setImmediate(()=>{
    console.log(1)
})

fs.readFile('./01.原型相关.html',()=>{
    console.log(2)

    setTimeout(()=>{
        console.log(3)
    },0)

    setImmediate(()=>{
        console.log(4)
    })
})

setTimeout(()=>{
    console.log(5)
},0)

for (let index = 0; index < 100000; index++) {
}