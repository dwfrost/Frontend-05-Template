// 作业1：
// 用状态机处理 abababx 字符串
console.log(match('abababx')) // true
console.log(match('aabababxx')) // true
console.log(match('ababcabx')) // false
console.log(match('ababababx')) // true
console.log(match('ababaabx')) // false

function match(str) {
  let state = start
  for (let c of str) {
    state = state(c)
  }

  function start(c) {
    if (c === 'a') {
      return foundA
    } else {
      return start
    }
  }
  function foundA(c) {
    if (c === 'b') {
      return foundB
    } else {
      return start(c)
    }
  }
  function foundB(c) {
    if (c === 'a') {
      return foundA2
    } else {
      return start(c)
    }
  }
  function foundA2(c) {
    if (c === 'b') {
      return foundB2
    } else {
      return start(c)
    }
  }
  function foundB2(c) {
    if (c === 'a') {
      return foundA3
    } else {
      return start(c)
    }
  }
  function foundA3(c) {
    if (c === 'b') {
      return foundB3
    } else {
      return start(c)
    }
  }
  function foundB3(c) {
    if (c === 'x') {
      return end
    } else {
      return foundB2(c)
    }
  }

  function end() {
    return end
  }
  return state === end
}
