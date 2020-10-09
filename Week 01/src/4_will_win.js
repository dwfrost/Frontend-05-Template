/* 初步AI，对于即将胜利的一方进行提示 */

const rootDom = document.querySelector('#root')
let toggleValue = 1

// 假设0表示空，1表示x，2表示o
const pattern = [
  [1, 0, 0],
  [0, 2, 0],
  [0, 0, 0],
]
draw()

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
        willWinCheck(j, i, pattern)
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
// 1.获取当前状态 x,y,toggleValue（下一步的落子类型） 和 当前棋盘状态pattern
// 2.遍历所有空节点，将其假设为下一步的落子类型
// 3.调用check，判定胜负
// 注意3这里并不是真的落子，所以不能修改原棋盘，使用deepClone
function willWinCheck(x, y, pattern) {
  // console.log(x, y, temp, pattern, toggleValue)

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
        const innerText =
          toggleValue === 2 ? '⭕' : toggleValue === 1 ? '❌' : ''

        console.log(innerText + 'will win')
        return
      }
    }
  }
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
