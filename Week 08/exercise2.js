// 第4题
// 如何处理 abcabx 字符串
// console.log(match4My('babcabxef'))
// console.log(match4My('abcabcabxs')) // bug用例-暂时无法解决
// console.log(match4My('acbcabx'))
// console.log(match4My('abbcabx')) // bug用例
function match4My(str) {
  let state = start
  let b = 0
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
      console.log('foundA-b', b)
      b++
      if (b == 1) {
        return foundB2C
      } else if (b === 2) {
        return foundB2X
      } else {
        // console.log('b', b)
        b = 0
        return start(c)
      }
    } else {
      b = 0
      return start(c)
    }
  }
  function foundB2C(c) {
    if (c !== 'c') {
      b = 0
    }
    return start(c)
  }
  function foundB2X(c) {
    console.log('foundB2X', c)
    if (c === 'x') {
      return end
    } else {
      b = 0
      return start(c)
    }
  }
  function end() {
    return end
  }
  return state === end
}

// winter 状态机
console.log(match4Winter('babcabxef'))
console.log(match4Winter('abcabcabxs')) // bug用例-winter解决
console.log(match4Winter('acbcabx'))
console.log(match4Winter('abbcabx')) // bug用例
function match4Winter(str) {
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
    if (c === 'c') {
      return foundC
    } else {
      return start(c)
    }
  }
  function foundC(c) {
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
    if (c === 'x') {
      return end
    } else {
      return foundB(c)
    }
  }
  function end() {
    return end
  }
  return state === end
}
