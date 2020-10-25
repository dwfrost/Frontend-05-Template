// 匹配0-9. 空白 换行 */+-
const regExp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

const dictionary = [
  'TokenNumber',
  'Whitespace',
  'LineTerminator',
  '+',
  '-',
  '*',
  '/',
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
      }
    }

    token.value = result[0]
    yield token
    // console.log(result)
  }
  yield {
    type: 'EOF',
  }
}

const list = tokenize('1024 + 2 * 5')
for (let item of list) {
  console.log('item', item)
}
