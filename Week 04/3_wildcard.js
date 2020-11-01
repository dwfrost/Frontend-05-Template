function find(source, pattern) {
  let starCount = 0

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '*') {
      starCount++
    }
  }

  if (starCount === 0) {
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== source[i] && pattern[i] !== '?') {
        return false
      }
      return
    }
  }

  // 处理前半段
  // pattern的位置
  let i = 0
  // 源字符串 source 的位置
  let lastIndex = 0

  for (i = 0; pattern[i] !== '*'; i++) {
    if (pattern[i] !== source[i] && pattern[i] !== '?') {
      return false
    }
  }
  lastIndex = i

  // 遍历 *
  for (let p = 0; p < starCount - 1; p++) {
    i++

    // *后面的格式
    let subPattern = ''
    while (pattern[i] !== '*') {
      subPattern += pattern[i]
      i++
    }

    let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
    // 正则的lastIndex决定了exec匹配的开始位置
    reg.lastIndex = lastIndex

    console.log(reg.exec(source))

    lastIndex = reg.lastIndex
  }

  for (
    let j = 0;
    j < source.length - lastIndex && pattern[pattern.length - j] !== '*';
    j++
  ) {
    if (
      pattern[pattern.length - j] !== source[source.length - j] &&
      pattern[pattern.length - j] !== '?'
    ) {
      return false
    }
  }
  return true
}

// console.log(find('abcabcabxaac', 'a*b*bx*c'))
console.log(find('abcabcabxaac', 'a*b?*b?x*c'))
