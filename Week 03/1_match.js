// 匹配0-9. 空白 换行 */+-
const regExp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g

const dictionary = [
  'TokenNumber',
  'Whitespace',
  'LineTerminator',
  '*',
  '/',
  '+',
  '-',
]

function tokenize(source) {
  let result = null
  while (true) {
    result = regExp.exec(source)
    // console.log('result', result)
    if (!result) break

    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        dictionary[i - 1] && console.log(dictionary[i - 1])
      }
    }
    // console.log(result)
  }
}

tokenize('1024 + 2 * 5')
