const net = require('net')
class Request {
  constructor(option) {
    // 收集必要信息
    this.initParams(option)
  }
  initParams(option) {
    this.method = option.method || 'GET'
    this.host = option.host
    this.port = option.port || '80'
    this.path = option.path || '/'
    this.headers = option.headers || {}
    this.body = option.body || {}

    // TODO headers 处理
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-form-urlencoded'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (
      this.headers['Content-Type'] === 'application/x-form-urlencoded'
    ) {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
        .join('&')
    }
    console.log('bodyText', this.bodyText)

    this.headers['Content-length'] = this.bodyText.length
  }

  // 发送请求
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()

      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(tihs.toString())
          }
        )
      }

      connection.on('data', (data) => {
        console.log('data', data.toString())
        parser.receive(data.toString())

        if (parser.isFinished) {
          resolve(parser.response)
          connection.end()
        }
      })

      connection.on('error', (error) => {
        reject(error)
        connection.end()
      })
    })
  }

  // 响应报文
  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
    ${Object.keys(this.headers)
      .map((key) => `${key}:${this.headers[key]}`)
      .join('\r\n')}\r
    \r
    ${this.bodyText}`
  }
}

class ResponseParser {
  constructor() {}
  receive(string) {}

  // 状态机
  receiveChar() {}
}

void (async function () {
  const option = {
    method: 'POST',
    host: '127.0.0.1',
    port: '8080',
    path: '/',
    headers: {
      'X-foo': 'customed-header',
    },
    body: {
      name: 'frost',
      age: '18',
    },
  }
  let request = new Request(option)

  const response = await request.send()

  console.log(response)
})()
