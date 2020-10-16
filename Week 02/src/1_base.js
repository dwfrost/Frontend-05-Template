const root = document.querySelector('.root')

const mapStorage = localStorage.getItem('map_status')
console.log(mapStorage)
const mapList = JSON.parse(mapStorage) || Array(10000).fill(0)
console.log(typeof mapList)

let beginDraw = false
let clear = false

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')

    // 显示已保存地图
    if (mapList[100 * i + j]) {
      cell.style.background = 'black'
    }

    cell.addEventListener('mousemove', () => {
      if (beginDraw) {
        if (clear) {
          mapList[100 * i + j] = 0
          cell.style.background = ''
        } else {
          mapList[100 * i + j] = 1
          cell.style.background = 'black'
        }
      }
    })

    root.appendChild(cell)
  }
}

document.addEventListener('mousedown', (e) => {
  console.log('e', e)
  beginDraw = true

  // 右键清除
  clear = e.which === 3
})
document.addEventListener('mouseup', () => {
  beginDraw = false
})
document.addEventListener('contextmenu', (e) => e.preventDefault())

// 保存地图
const button = document.querySelector('button')
button.addEventListener('click', () => {
  console.log('save', mapList)
  localStorage.setItem('map_status', JSON.stringify(mapList))
})
