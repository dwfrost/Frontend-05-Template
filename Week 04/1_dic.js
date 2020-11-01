let $ = Symbol('$')

// 字典树
class Tire {
  constructor() {
    // 创建一个空节点对象
    this.root = Object.create(null)
  }

  // 录入字符串
  insert(word) {
    let node = this.root
    // debugger
    for (let c of word) {
      if (!node[c]) {
        node[c] = Object.create(null)
      }
      node = node[c]
    }

    if (!($ in node)) {
      node[$] = 0
    }
    // 递增，方便most统计出现次数
    node[$]++
  }

  // 计算出现次数最多的字符串
  most() {
    let max = 0
    let maxWord = null

    /**
     * 递归访问节点-类似于查字典的过程
     * @param {*} node 当前轮次的节点
     * @param {*} word 查到当前轮次的字符串
     */
    let visit = (node, word) => {
      // console.log('node[$]', node[$])
      if (node[$] && node[$] > max) {
        max = node[$]
        maxWord = word
      }
      for (let p in node) {
        visit(node[p], word + p)
      }
    }
    visit(this.root, '')
    console.log(max, maxWord)
  }
}

// 产生随机字符串
function randomWord(length) {
  let s = ''
  for (let i = 0; i < length; i++) {
    s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0))
  }
  return s
}

// console.log(randomWord(4))

let tire = new Tire()
for (let i = 0; i < 10000; i++) {
  tire.insert(randomWord(4))
}

console.log(tire)
console.log(tire.most())
