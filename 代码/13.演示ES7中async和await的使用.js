const fs = require('fs')
const path = require('path')

// 封装一个 读取 文件内容的 方法，返回一个Promise对象
function getContentByPath(fpath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fpath, 'utf-8', (err, dataStr) => {
      // 调用reject把失败的结果返回给调用者
      if (err) return reject(err)
      // 调用dataStr把成功的结果返回
      resolve(dataStr)
    })
  })
}

// 依次，读取 1，2，3 这三个文本文档中的内容

// 如下的使用方式，解决了 回调地狱的问题
// getContentByPath(path.join(__dirname, './files/1.txt'))
//   .then(res => {
//     console.log(res)

//     return getContentByPath(path.join(__dirname, './files/2.txt'))
//   })
//   .then(res => {
//     console.log(res)

//     return getContentByPath(path.join(__dirname, './files/3.txt'))
//   })
//   .then(res => {
//     console.log(res)
//   })

// 注意：这只是一个美好的理想，无法直接这么进行调用，因为 getContentByPath 返回的是 Promise 实例，
// 按照我们目前所学的技能，只要返回的结果是Promise，就只能使用 .then() 来进行处理；
/* const r1 = getContentByPath(path.join(__dirname, './files/1.txt'))
console.log(r1)
const r2 = getContentByPath(path.join(__dirname, './files/2.txt'))
console.log(r2)
const r3 = getContentByPath(path.join(__dirname, './files/3.txt'))
console.log(r3) */

// ---------------------下面介绍的是 async 和 await 的用法--------------------------
// async 是一个ES7中的语法关键字，这个关键字，只能用来修饰 function, 例如：
// async function getInfo(){ /*方法体*/ }
// fs.readFile('fpath', async () => {})
// 被 async 关键字修饰的方法，有个专业的名称，叫做 异步方法

// await 关键字，要配合 async 进行使用；注意：await 这个关键字，只能用在被 async 修饰的异步方法中；
// 注意：await 关键的作用，就是 修饰一个 Promise 实例；举例：  await Promise实例

async function getInfo() {
  console.log('getInfo方法被执行了')
  // 注意：异步方法中，在遇到第一个 await 之前，所有的代码都是同步调用的；第一个 await 之后的所有代码，都是异步执行的；
  // 注意 ：getContentByPath 方法的调用结果，返回的是 Promise 实例
  // element-ui
  const result = await getContentByPath(path.join(__dirname, './files/1.txt')).catch(err => err.message)
  console.log(result)

  const result2 = await getContentByPath(path.join(__dirname, './files/2.txt'))
  console.log(result2)

  const result3 = await getContentByPath(path.join(__dirname, './files/3.txt'))
  console.log(result3)
  console.log('方法被执行完了')
}

console.log('start')
getInfo()
console.log('end')
