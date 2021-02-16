// 服务端
let http = require('http')
// let fs = require('fs')

const unzipper = require('unzipper')

http
  .createServer((request, response) => {
    // 查找文件，并写入
    // const outFile = fs.createWriteStream('../server/public/index.html')
    // const outFile = fs.createWriteStream('./tmp.zip')

    // 流的处理
    request.pipe(unzipper.Extract({ path: '../server/public/' }))

    // 比较原始的方法
    // request.on('data', (chunk) => {
    //   console.log(chunk.toString())

    //   // 写入chunk
    //   outFile.write(chunk)
    // })

    // request.on('end', () => {
    //   // 写入完毕
    //   outFile.end()

    //   response.end('Success')
    // })
  })
  .listen(8082)

console.log('now is listening')
