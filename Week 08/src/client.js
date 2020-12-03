class Request {
  constructor(option) {
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
  }

  send() {
    return new Promise((resolve, reject) => {})
  }
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
    },
  }
  let request = new Request(option)

  const response = await request.send()

  console.log(response)
})()
