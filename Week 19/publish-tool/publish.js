// 客户端
let http = require('http')
let fs = require('fs')
const archiver = require('archiver')

// fs.stat('./sample.html', (err, stats) => {
//   let request = http.request(
//     {
//       hostname: '127.0.0.1',
//       port: 8082,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/octet-stream',
//         'Content-Length': stats.size,
//       },
//     },
//     (response) => {
//       // console.log(response)
//     }
//   )

//   // 读取本地文件，将其传输到server端
//   let file = fs.createReadStream('./sample/sample.html')

//   file.pipe(request)

//   file.on('end', () => request.end())
// })

let request = http.request(
  {
    hostname: '127.0.0.1',
    port: 8082, // 本地启动时端口
    // port: 8882, // 虚拟机转发的端口
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      // 'Content-Length': stats.size,
    },
  },
  (response) => {
    // console.log(response)
  }
)

// 读取本地文件，将其传输到server端
// let file = fs.createReadStream('./sample/sample.html')

// file.pipe(request)

// file.on('end', () => request.end())

const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
})
archive.directory('./sample/', false)
archive.finalize()

archive.pipe(fs.createWriteStream('temp.zip'))

archive.pipe(request)

archive.on('end', () => request.end())

// 比较原始的方法
// file.on('data', (chunk) => {
//   // console.log(chunk.toString())

//   // 写入chunk，服务端就可以接收到
//   request.write(chunk)
// })

// file.on('end', (chunk) => {
//   console.log('read finished')
//   // 请求真正发送
//   request.end(chunk)
// })
