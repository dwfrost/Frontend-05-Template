const root = document.querySelector('.root')

const mapStorage = localStorage.getItem('map_status')
let mapList = JSON.parse(mapStorage) || Array(10000).fill(0)

let beginDraw = false
let clear = false

function init() {
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
  localStorage.setItem('map_status', JSON.stringify(mapList))
})

// 寻路
const run = document.querySelector('.run')
run.addEventListener('click', () => {
  // findPath(mapList, [0, 0], [50, 25])
  findPath(mapList, [50, 25], [0, 0])
})

/**
 * 寻路逻辑
 * @param {*} map 当前地图
 * @param {*} start 起点
 * @param {*} end 终点
 */
async function findPath(map, start, end) {
  let table = Object.create(map) // 虚拟map
  let queue = [start]

  async function insert(x, y, pre) {
    if (x < 0 || x > 100 || y < 0 || y > 100) return
    if (table[100 * y + x]) return

    // await sleep(10)
    // console.log(root.childNodes[100 * y + x])
    root.children[100 * y + x].style.background = 'lightgreen'
    // map[100 * y + x] = 2 // 记录插入过的坐标
    table[100 * y + x] = pre // 每次insert时，table存的前一个节点
    queue.push([x, y])
  }

  while (queue.length > 0) {
    let [x, y] = queue.shift()
    console.log(x, y)

    // 从end节点开始找
    if (x === end[0] && y === end[1]) {
      let path = []

      // 将上一个节点放入path，直到找到起始点
      while (x !== start[0] || y !== start[1]) {
        path.push(map[y * 100 + x])

        // 取table的pre坐标，作为前驱节点
        ;[x, y] = table[y * 100 + x]

        // 可视化
        await sleep(30)
        root.children[100 * y + x].style.background = 'purple'
      }
      return path
    }

    // 上下左右
    await insert(x, y + 1, [x, y])
    await insert(x + 1, y, [x, y])
    await insert(x, y - 1, [x, y])
    await insert(x - 1, y, [x, y])

    // 斜向坐标
    await insert(x - 1, y + 1, [x, y])
    await insert(x + 1, y + 1, [x, y])
    await insert(x + 1, y - 1, [x, y])
    await insert(x - 1, y - 1, [x, y])
  }
  return null
}

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

class Sorted {
  constructor(data, compare) {
    this.data = data.slice()
    this.compare = compare || ((a, b) => a - b)
  }

  take() {
    if (!this.data.length) return

    let min = this.data[0]
    let minIndex = 0

    for (let i = 1, len = this.data.length; i < len; i++) {
      if (this.compare(this.data[i], min) < 0) {
        min = this.data[i]
        minIndex = i
      }
    }

    // 找到最小的后，抛弃
    this.data[minIndex] = this.data[this.data.length - 1]
    this.data.pop()
    return min
  }
  give(v) {
    this.data.push(v)
  }
}
