
/*
    node中具有两个微任务
        1.promise.then
            他与宏任务相比是VIP级别

        2.process.nextTick
            他与.then相比是SVIP级别

        nextTick会优先于.then指向,而.then会优先于宏任务执行

        注意:node具有两个微任务队列
            微任务队列是需要清空之后,才能切换到下一个队列的

*/
// Promise.resolve().then(()=>{
//     console.log(1)

//     process.nextTick(()=>{
//         console.log(2)
//     })
    
//     Promise.resolve().then(()=>{
//         console.log(3)
//     })
    
//     process.nextTick(()=>{
//         console.log(4)
//     })
// })

// process.nextTick(()=>{
//     console.log(2)

//     Promise.resolve().then(()=>{
//         console.log(3)
//     })
    
//     process.nextTick(()=>{
//         console.log(4)
//     })
// })


for (let index = 0; index < 100000; index++) {
}