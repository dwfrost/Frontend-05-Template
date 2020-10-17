const root = document.querySelector('.root')

const mapStorage = localStorage.getItem('map_status')
// console.log(mapStorage)
let mapList = JSON.parse(mapStorage) || Array(10000).fill(0)
// console.log(typeof mapList)

let beginDraw = false
let clear = false

function init() {
  // console.log('mapList', mapList)
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')

      // 显示已保存地图
      if (mapList[100 * i + j]) {
        cell.style.background = 'black'
      } else {
        cell.style.background = ''
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
}

// 初始化视图
init()

document.addEventListener('mousedown', (e) => {
  // console.log('e', e)
  beginDraw = true

  // 右键清除
  clear = e.which === 3
})
document.addEventListener('mouseup', () => {
  beginDraw = false
})
document.addEventListener('contextmenu', (e) => e.preventDefault())

// 保存地图
const save = document.querySelector('.save')
save.addEventListener('click', () => {
  // console.log('save', mapList)
  localStorage.setItem('map_status', JSON.stringify(mapList))
})

// 寻路
const run = document.querySelector('.run')
run.addEventListener('click', () => {
  path(mapList, [0, 0], [20, 25])
})

/**
 * 寻路逻辑
 * @param {*} map 当前地图
 * @param {*} start 起点
 * @param {*} end 终点
 */
async function path(map, start, end) {
  let queue = [start]

  while (queue.length > 0) {
    const [x, y] = queue.shift()
    console.log(x, y)
    if (x === end[0] && y === end[1]) {
      console.log('get it')
      return
    }
    await insert(x, y + 1)
    await insert(x + 1, y)
    await insert(x, y - 1)
    await insert(x - 1, y)
  }

  async function insert(x, y) {
    if (x < 0 || x > 100 || y < 0 || y > 100) return
    if (map[100 * y + x] > 0) return

    await sleep(10)
    // console.log(root.childNodes[100 * y + x])
    root.childNodes[100 * y + x].style.background = 'lightgreen'
    map[100 * y + x] = 2 // 记录插入过的坐标
    queue.push([x, y])
  }
}
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
