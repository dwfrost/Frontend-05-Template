// 匹配0-9. 空白 换行 */+-
const regExp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

const dictionary = [
  'Number',
  'Whitespace',
  'LineTerminator',
  '*',
  '/',
  '+',
  '-',
]

function* tokenize(source) {
  let result = null
  let lastIndex = 0

  while (true) {
    lastIndex = regExp.lastIndex

    result = regExp.exec(source)
    // console.log('result', result)

    if (!result) break

    if (regExp.lastIndex - lastIndex > result[0].length) {
      console.log('should throw error')
      break
    }

    let token = {
      type: null,
      value: null,
    }

    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        // dictionary[i - 1] && console.log(dictionary[i - 1])
        token.type = dictionary[i - 1]
      }
    }

    // console.log('result', result)

    token.value = result[0]
    yield token
    // console.log(result)
  }

  yield {
    type: 'EOF',
  }
}

let source = []

const list = tokenize('1024 + 2 * 1')
for (let item of list) {
  // console.log('item', item)
  if (item.type !== 'Whitespace' && item.type !== 'LineTerminator') {
    source.push(item)
  }
}

function Expression() {}
function AdditiveExpression(source) {
  // console.log('source', source)
  if (source[0].type === 'MultiplicativeExpression') {
    console.log(1)
    let node = {
      type: 'AdditiveExpression',
      children: [source[0]],
    }
    source[0] = node
    return AdditiveExpression(source)
  }

  if (
    source[0].type === 'AdditiveExpression' &&
    source[1] &&
    source[1].type === '+'
  ) {
    console.log(2)
    let node = {
      type: 'AdditiveExpression',
      operator: '+',
      children: [],
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (
    source[0].type === 'AdditiveExpression' &&
    source[1] &&
    source[1].type === '-'
  ) {
    let node = {
      type: 'AdditiveExpression',
      operator: '-',
      children: [],
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression') {
    return source[0]
  }
  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}
function MultiplicativeExpression(source) {
  // console.log('source', source)
  if (source[0].type === 'Number') {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source[0]],
    }
    source[0] = node
    return MultiplicativeExpression(source)
  }

  if (
    source[0].type === 'MultiplicativeExpression' &&
    source[1] &&
    source[1].type === '*'
  ) {
    let node = {
      type: 'MultiplicativeExpression',
      operator: '*',
      children: [],
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (
    source[0].type === 'MultiplicativeExpression' &&
    source[1] &&
    source[1].type === '/'
  ) {
    let node = {
      type: 'MultiplicativeExpression',
      operator: '/',
      children: [],
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression') {
    return source[0]
  }
  return MultiplicativeExpression(source)
}

// console.log(MultiplicativeExpression(source))
console.log('end', AdditiveExpression(source))
