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
  if (check(j,i)) {
    alert('you win')
  }
  // 下次切换
  toggleValue = 3 - toggleValue
  draw()

}

// 判定胜负逻辑
// x-横坐标 y-纵坐标
function check(x,y) {
  // toggleValue
  console.log(toggleValue)

  // 横向3子相同 只需要判定当前纵坐标的一横
{
  let win = true
  for(let i=0;i<pattern.length;i++){
    if(pattern[y][i]!==toggleValue){
      win = false
    }
  }
  if(win){
    return win
  }
}

  // 纵向3子相同
  {
  let win = true
  for(let i=0;i<pattern.length;i++){
      if(pattern[i][x]!==toggleValue){
        win = false
      }
    }
    if(win){
      return win
    }
  }

  // 左斜3子相同
  {
  let win = true
  for(let i=0;i<pattern.length;i++){
      if(pattern[i][2-i]!==toggleValue){
        win = false
      }
    }
    if(win){
      return win
    }
  }
  // 右斜3子相同
  {
  let win = true
  for(let i=0;i<pattern.length;i++){
      if(pattern[i][i]!==toggleValue){
        win = false
      }
    }
    if(win){
      return win
    }
  }
  return false

}
