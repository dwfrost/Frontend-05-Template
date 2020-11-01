function kmp(source, pattern) {
  // 计算table
  let table = new Array(pattern.length).fill(0)

  {
    // 从第1个开始
    let i = 1,
      j = 0
    while (i < pattern.length) {
      // 匹配上了就存起来
      if (pattern[i] === pattern[j]) {
        ++i, ++j
        table[i] = j
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          ++i
        }
      }
    }
    // console.log(table)
  }
  // 匹配

  {
    let i = 0,
      j = 0

    while (i < source.length) {
      // if (j === pattern.length) {
      //   return true
      // }
      if (pattern[j] === source[i]) {
        ++i, ++j
      } else {
        if (j > 0) {
          j = table[j]
        } else {
          ++i
        }
      }

      if (j === pattern.length) {
        return true
      }
    }

    return false
  }
}

// kmp('', 'abcdabce')
// kmp('', 'aabaaac')
// console.log(kmp('hello', 'll'))
// console.log(kmp('12abcdabceX', 'abcdabce'))
// console.log(kmp('123aabaaacvv', 'aabaaac'))
console.log(kmp('abc', 'abc'))
