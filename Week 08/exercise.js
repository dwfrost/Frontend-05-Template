// 第1题
// 在一个字符串中，找到a

function matchStr1(string, char) {
  return string.indexOf(char) > -1
}

// console.log(matchStr('abcde', 'a'))

// 第2题
// 不使用正则表达式，实现：在一个字符串中，找到ab

function findStr2(string, target) {
  return string.indexOf(target) > -1
}
// console.log(findStr('abcde', 'ab'))
// console.log(findStr('abcde', 'ac'))

// winter答案
function match2(string) {
  let foundA = false
  for (let item of string) {
    if (item === 'a') {
      foundA = true
    } else if (foundA && item === 'b') {
      return true
    } else {
      foundA = false
    }
  }
  return false
}
// console.log(match('abc', 'ab'))
// console.log(match('adbc', 'ab'))

// 第3题
// 不使用正则表达式，实现：在一个字符串中，找到abcde

function matchStr3(string, target) {
  let isFound = false
  let tempTarget = target
  let matched = ''

  for (let item of string) {
    temp = tempTarget.slice(0, 1)
    tempTarget = tempTarget.slice(1)
    if (temp === item) {
      matched += temp
    }
    if (matched === target) {
      isFound = true
      break
    }
  }

  return isFound
}

// console.log(matchStr3('abcdefg', 'abcde'))
// console.log(matchStr3('abacdefg', 'abcde'))

// winter 无状态机处理
function match3(str) {
  let foundA = false
  let foundB = false
  let foundC = false
  let foundD = false
  let foundE = false

  for (let item of str) {
    if (item === 'a') {
      foundA = true
    } else if (foundA && item === 'b') {
      foundB = true
    } else if (foundB && item === 'c') {
      foundC = true
    } else if (foundC && item === 'd') {
      foundD = true
    } else if (foundD && item === 'e') {
      foundE = true
      return true
    } else {
      foundA = false
      foundB = false
      foundC = false
      foundD = false
      foundE = false
    }
  }
  return false
}
// console.log(match3('abcdef', 'abcde'))
// console.log(match3('acbcdef', 'abcde'))

// 有状态机处理
console.log(match3State('abcdef'))
console.log(match3State('acbcdef'))
console.log(match3State('ababcdef')) // bug用例
function match3State(str) {
  // 有一个初始状态
  let state = start
  for (let c of str) {
    // 每个函数就是一个状态机，它接受一个输入，输出下一个状态
    // 每个状态机只关心有限的状态
    state = state(c)
  }
  // 起始状态机，只处理输入===a的场景，根据条件决定下一个状态
  function start(c) {
    if (c === 'a') {
      return foundA
    } else {
      return start
    }
  }
  // trap 返回陷阱，即永远只会返回自身
  function end() {
    return end
  }
  function foundA(c) {
    if (c === 'b') {
      return foundB
    } else {
      // reComsume 重新使用当前的输入，作为初始输入调用初始方法
      return start(c)
    }
  }
  function foundB(c) {
    if (c === 'c') {
      return foundC
    } else {
      return start(c)
    }
  }
  function foundC(c) {
    if (c === 'd') {
      return foundD
    } else {
      return start(c)
    }
  }
  function foundD(c) {
    if (c === 'e') {
      return end
    } else {
      return start(c)
    }
  }
  return state === end
}
