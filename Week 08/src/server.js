const http = require('http')

const server = http.createServer((request, response) => {
  let body = []
  request
    .on('error', (error) => {
      console.error(error)
    })
    .on('data', (chunk) => {
      body.push(chunk.toString())
    })
    .on('end', () => {
      // body = Buffer.concat(body).toString()
      body = body.join('')

      console.log('body:', body)
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end(' Hello World \n')
    })
})

server.listen(8088)

console.log('server is listening')
