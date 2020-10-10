/* 初步AI，对于即将胜利的一方进行提示 */

const rootDom = document.querySelector('#root')
let toggleValue = 1

// 假设0表示空，1表示x，2表示o
const pattern = [
  [0, 0, 2],
  [0, 1, 0],
  [0, 0, 0],
]
draw()


const checkRes = checkWhoWillWin(pattern, toggleValue)
console.log('checkRes',checkRes)

// 绘制棋盘
function draw() {
  // 清空棋盘
  rootDom.innerHTML = ''

  // 遍历，并渲染
  for (let i = 0; i < pattern.length; i++) {
    const innerArr = pattern[i]
    for (let j = 0; j < innerArr.length; j++) {
      const innerValue = innerArr[j]
      const innerText = innerValue === 2 ? '⭕' : innerValue === 1 ? '❌' : ''

      const innerBox = document.createElement('div')
      innerBox.classList.add('cell')
      // 添加事件，重绘棋盘
      innerBox.onclick = function () {
        reDraw(i, j)
        if (willWinCheck(pattern, toggleValue)) {
          const innerText =
            toggleValue === 2 ? '⭕' : toggleValue === 1 ? '❌' : ''
          console.log(innerText + 'will win')
        }
      }
      innerBox.innerHTML = innerText
      rootDom.appendChild(innerBox)
    }
  }

}

// 每次点击后，重新绘制
function reDraw(i, j) {
  pattern[i][j] = toggleValue
  // 判定胜负
  if (check(j, i, pattern)) {
    alert('you win')
  }
  // 下次切换
  toggleValue = 3 - toggleValue
  draw()
}

// 判定胜负逻辑
// x-横坐标 y-纵坐标 pattern-当前棋盘状态
function check(x, y, pattern) {
  // toggleValue
  // console.log(toggleValue)

  // 横向3子相同 只需要判定当前纵坐标的一横
  {
    let win = true
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[y][i] !== toggleValue) {
        win = false
      }
    }
    if (win) {
      return win
    }
  }

  // 纵向3子相同
  {
    let win = true
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i][x] !== toggleValue) {
        win = false
      }
    }
    if (win) {
      return win
    }
  }

  // 左斜3子相同
  {
    let win = true
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i][2 - i] !== toggleValue) {
        win = false
      }
    }
    if (win) {
      return win
    }
  }
  // 右斜3子相同
  {
    let win = true
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i][i] !== toggleValue) {
        win = false
      }
    }
    if (win) {
      return win
    }
  }
  return false
}

// 判断下一步是否胜利
// 1.获取当前状态 toggleValue（下一步的落子类型） 和 当前棋盘状态pattern
// 2.遍历所有空节点，将其假设为下一步的落子类型
// 3.调用check，判定胜负
// 注意3这里并不是真的落子，所以不能修改原棋盘，使用deepClone
function willWinCheck(pattern, toggleValue) {
  // console.log( temp, pattern, toggleValue)

  for (let i = 0; i < pattern.length; i++) {
    const innerArr = pattern[i]
    for (let j = 0; j < innerArr.length; j++) {
      // 只对空节点判断
      if (innerArr[j]) continue

      // 每次循环前，恢复棋盘状态
      const temp = deepClone(pattern)
      // 假设当前空节点落子
      temp[i][j] = toggleValue
      // console.log(temp, pattern)

      // 胜负判定
      if (check(j, i, temp)) {
        return [j, i]
      }
    }
  }
  return null
}

/**
 * 1.如果即将胜利，直接返回
 * 2.定义输赢状态 -2初始值 -1输 0和棋 1赢
 * 3.递归调用willWinCheck，判断下一步是否胜利，并返回最终结果
 */
function checkWhoWillWin(pattern, toggleValue) {
  // let willWinPoint = willWinCheck(pattern, toggleValue)
  // // console.log('willWinPoint',willWinPoint)
  // if (willWinPoint) {
  //   return {
  //     point: willWinPoint,
  //     result: 1,
  //   }
  // }
  let p 
  if(p=willWinCheck(pattern, toggleValue)){
    return {
      point:p,
      result:1
    }
  }

  let result = -2
  let point = null

  // 遍历逻辑跟 willWinCheck 类似
  for (let i = 0; i < pattern.length; i++) {
    const innerArr = pattern[i]
    for (let j = 0; j < innerArr.length; j++) {
      // 只对空节点判断
      if (innerArr[j]) continue

      // 每次循环前，恢复棋盘状态
      const temp = deepClone(pattern)
      // 假设当前空节点落子
      temp[i][j] = toggleValue

      // 如果不递归，只是对下一步做预测。
      // 这里需要预测后面的所有步数，所以使用递归计算

      // 递归中，棋盘状态（坐标）在变，落子也在切换X/O
      // tempResult-下一步的结果
      let tempResult = checkWhoWillWin(temp, 3 - toggleValue).result

      // 核心判断
      // 找对方最差的坐标
      if (-tempResult > result) {
        result = -tempResult
        point = [j, i]
      }
    }
  }

  return {
    point,
    result: point ? result : 0,
  }
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
