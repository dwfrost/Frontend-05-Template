const rootDom = document.querySelector('#root')
let toggleValue = 1

const pattern = [
  [2, 0, 0],
  [0, 1, 0],
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
      }
      innerBox.innerHTML = innerText
      rootDom.appendChild(innerBox)
    }
  }
}

// 每次点击后，重新绘制
function reDraw(i, j) {
  pattern[i][j] = toggleValue
  // 下次切换
  toggleValue = 3 - toggleValue
  draw()

  // 判定胜负
  if (check(i, j)) {
    alert('you win')
  }
}

// 判定胜负逻辑
function check() {
  // 3横

  // 3竖

  // 斜
}
