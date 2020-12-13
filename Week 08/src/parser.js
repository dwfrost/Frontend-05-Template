const { addCSSRules, computeCSS } = require('./util')
const EOF = Symbol('end of file')

let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [
  // 使用栈来构建dom 初始化document根节点，方便后面取出来
  {
    type: 'document',
    children: [],
  },
]

function emit(token) {
  // console.log('token.tagName', token.tagName)
  // console.log('token', token)`
  let top = stack[stack.length - 1]
  // console.log('top', top)

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    }
    element.tagName = token.tagName

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        })
      }
    }

    computeCSS(element, stack)
    // if (token.tagName === 'style') {
    //   console.log('token', token)
    //   console.log('top.children', element)
    // }
    // 入栈element，element取自当前token
    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      // 当前标签入栈
      stack.push(element)
    }
    currentTextNode = null
  } else if (token.type === 'endTag') {
    // console.log('top', top.tagName)
    // console.log('token', token.tagName)
    if (top.tagName !== token.tagName) {
      console.error(' end tag is not match to start tag')
    } else {
      // 遇到style标签时，执行添加css规则的操作
      if (top.tagName === 'style') {
        // console.log(1, top.children)
        // top.children[0] style元素中的文本节点
        addCSSRules(top.children[0].content)
      }
      // 出栈
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: '',
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

// 初始状态机
function data(c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: 'EOF',
    })
    return
  } else {
    // 文本节点
    emit({
      type: 'text',
      content: c,
    })
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
    currentToken.tagName += c
    return tagName
  } else if (c === '>') {
    emit(currentToken)
    return data
  } else {
    currentToken.tagName += c
    return tagName
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '/' || c === '>' || c === EOF) {
    // reConsume的时机是啥
    return afterAttributeName(c)
  } else if (c === '=') {
    return beforeAttributeName
  } else {
    // 比如 id="red" 此时c是 id的i，就创建属性
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c)
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName(c)
  } else if (c === '/') {
    return selfClosingStartFlag
  } else if (c === '=') {
    return beforeAttributeValue
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
  } else {
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    // 当前属性k=v结束
    return afterAttributeName(c)
  } else if (c === '=') {
    // 进入value
    return beforeAttributeValue
  } else if (c === '\u0000') {
  } else if (c === '"' || c === "'" || c === '<') {
  } else {
    // 比如 id="red" 此时会拼接id到属性名称上
    currentAttribute.name += c
    return attributeName
  }
}
function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    // 继续下一个属性？
    return beforeAttributeValue
  } else if (c === '"') {
    return doubleQuotedAttributeValue
  } else if (c === "'") {
    return singleQuotedAttributeValue
  } else {
    return unQuotedAttributeValue(c)
  }
}
function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    // 属性值
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}
function singleQuotedAttributeValue(c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuoteAttributeValue
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function afterQuoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 进入下一个属性
    return beforeAttributeName
  } else if (c === '/') {
    // 自封闭标签
    return selfClosingStartFlag
  } else if (c === '>') {
    // 属性收集完毕
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}
function unQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    // 继续下一个属性
    return beforeAttributeName
  } else if (c === '/') {
    // 继续下一个属性
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartFlag
  } else if (c === '>') {
    // 属性收集完毕
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c
    return unQuotedAttributeValue
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

  // console.log('stack', stack[0])
  return stack[0]
}
