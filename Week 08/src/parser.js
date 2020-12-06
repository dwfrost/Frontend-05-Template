const EOF = Symbol('end of file')

let currentToken = null
function emit(token) {
  console.log('token', token)
}

// 初始状态机
function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    return
  } else {
    return data
  }
}

// <div class="a"></div>
// 进入标签开始状态
// 它包含几个场景
// /表示标签结束
// 遇到英文字母，说明是标签名称
function tagOpen(c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    }
    return tagName(c) // reComsume
  } else {
    return
  }
}

// 结束标签场景
// 英文字母表示标签名称
// >表示标签结束
function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    }
    return tagName(c)
  } else if (c === '>') {
  } else if (c === EOF) {
  } else {
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 空格
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartFlag
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase()
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>') {
    // 终止
    return data
  } else if (c === '=') {
    return beforeAttributeName
  } else {
    return beforeAttributeName
  }
}

function selfClosingStartFlag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true
    return data
  } else if (c === EOF) {
  } else {
  }
}

module.exports.parseHTML = function (html) {
  // console.log(html)
  let state = data

  for (let c of html) {
    state = state(c)
  }

  // 强制结束
  state = state(EOF)
}
