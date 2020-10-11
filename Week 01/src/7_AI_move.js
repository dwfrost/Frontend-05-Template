/* 初步AI，对于即将胜利的一方进行提示 */
// 使用一维数组
// 方便克隆
const DIMENSION = 3
const rootDom = document.querySelector('#root')

// 假设0表示空，1表示x，2表示o
// const pattern = [0, 2, 0, 0, 1, 0, 0, 0, 0]
// const pattern = [0, 0, 2, 0, 1, 0, 0, 0, 0]

// 空棋盘 我方先走
const pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0]
let toggleValue = 1

// AI先走
// const pattern = [0, 0, 0, 0, 1, 0, 0, 0, 0]
// let toggleValue = 2

draw()

// 绘制棋盘
function draw() {
  // 清空棋盘
  rootDom.innerHTML = ''

  // 遍历，并渲染
  for (let i = 0; i < DIMENSION; i++) {
    // const innerArr = pattern[i]
    for (let j = 0; j < DIMENSION; j++) {
      // const innerValue = innerArr[j]
      const innerValue = pattern[3 * i + j]
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

  console.time()
  const checkRes = bestChoice(pattern, toggleValue)
  console.log('checkRes', checkRes)
  console.timeEnd()
}

// 每次点击后，重新绘制
function reDraw(i, j) {
  // pattern[i][j] = toggleValue
  pattern[3 * i + j] = toggleValue
  // 判定胜负
  if (check(j, i, pattern, toggleValue)) {
    const innerText = toggleValue === 2 ? '⭕' : toggleValue === 1 ? '❌' : ''
    alert(innerText + 'win')
  }
  // 下次切换
  toggleValue = 3 - toggleValue
  draw()

  // 我方下完之后，AI下
  AIMove()
}

function AIMove() {
  let choice = bestChoice(pattern, 3 - toggleValue)
  // 选择最优策略
  if (choice.point) {
    const [aiJ, aiI] = choice.point
    pattern[aiI * 3 + aiJ] = toggleValue
    // 判定胜负
    if (check(aiJ, aiI, pattern, toggleValue)) {
      const innerText = toggleValue === 2 ? '⭕' : toggleValue === 1 ? '❌' : ''
      alert(innerText + 'win')
    }
  }
  // 下次切换
  toggleValue = 3 - toggleValue
  draw()
}

// 判定胜负逻辑
// x-横坐标 y-纵坐标 pattern-当前棋盘状态
function check(x, y, pattern, toggleValue) {
  // 横向3子相同 只需要判定当前纵坐标的一横
  {
    let win = true
    for (let i = 0; i < DIMENSION; i++) {
      if (pattern[3 * y + i] !== toggleValue) {
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
    for (let i = 0; i < DIMENSION; i++) {
      if (pattern[3 * i + x] !== toggleValue) {
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
    for (let i = 0; i < DIMENSION; i++) {
      if (pattern[2 * i + 2] !== toggleValue) {
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
    for (let i = 0; i < DIMENSION; i++) {
      if (pattern[4 * i] !== toggleValue) {
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

  for (let i = 0; i < DIMENSION; i++) {
    // const innerArr = pattern[i]
    for (let j = 0; j < DIMENSION; j++) {
      // 只对空节点判断
      if (pattern[3 * i + j]) continue

      // 每次循环前，恢复棋盘状态
      const temp = tempClone(pattern)
      // 假设当前空节点落子
      // temp[i][j] = toggleValue
      temp[3 * i + j] = toggleValue
      // console.log(temp, pattern)

      // 胜负判定
      if (check(j, i, temp, toggleValue)) {
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
function bestChoice(pattern, toggleValue) {
  let willWinPoint = willWinCheck(pattern, toggleValue)
  // console.log('willWinPoint',willWinPoint)
  // 递归结束条件
  if (willWinPoint) {
    return {
      point: willWinPoint,
      result: 1,
    }
  }

  let result = -2
  let point = null

  // 遍历逻辑跟 willWinCheck 类似
  outer: for (let i = 0; i < DIMENSION; i++) {
    // const innerArr = pattern[i]
    for (let j = 0; j < DIMENSION; j++) {
      // 只对空节点判断
      if (pattern[3 * i + j]) continue

      // 每次循环前，恢复棋盘状态
      const temp = tempClone(pattern)
      // 假设当前空节点落子
      temp[3 * i + j] = toggleValue

      // 如果不递归，只是对下一步做预测。
      // 这里需要预测后面的所有步数，所以使用递归计算。并递归出对方的最优策略，作为我方最优策略

      // 递归中，棋盘状态（坐标）在变，落子也在切换X/O
      // tempResult-我方落子后，下一步的结果
      let tempResult = bestChoice(temp, 3 - toggleValue).result

      // 核心判断
      // 找对方最差的坐标
      // 找到对方策略好的点，则是我方最差；扭转该局面（取负）后，即是我方最优策略

      // 这里-tempResult是什么意思？
      // -tempResult表示对方最差局面的情况
      if (-tempResult > result) {
        result = -tempResult
        point = [j, i]
      }

      // 胜负剪枝 当判断要赢了之后，不再计算后续步骤
      // if (result === 1) {
      //   break outer
      // }
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

function tempClone(obj) {
  return Object.create(obj)
}
