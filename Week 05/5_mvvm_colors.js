class Reactive {
  constructor(data) {
    // 模拟reactive 双向绑定

    // 依赖缓存
    this.reactivities = new Map()
    this.usedReactivities = []

    // 所有属性的监听事件，这里使用object作为key
    this.callbacks = new Map()
    this.$data = this.reactive(data)

    const text = document.querySelector('.text')
    const r = document.querySelector('#r')
    const g = document.querySelector('#g')
    const b = document.querySelector('#b')
    const a = document.querySelector('#a')
    const div = document.querySelector('.color')

    text.addEventListener('input', (event) => {
      this.$data.text = event.target.value // DOM -> 数据
    })
    r.addEventListener('input', (event) => {
      this.$data.r = event.target.value // DOM -> 数据
    })
    g.addEventListener('input', (event) => {
      this.$data.g = event.target.value // DOM -> 数据
    })
    b.addEventListener('input', (event) => {
      this.$data.b = event.target.value // DOM -> 数据
    })
    a.addEventListener('input', (event) => {
      this.$data.a = event.target.value // DOM -> 数据
    })

    this.effect(() => {
      text.value = this.$data.text // 数据 -> DOM
    })
    this.effect(() => {
      r.value = this.$data.r // 数据 -> DOM
    })
    this.effect(() => {
      g.value = this.$data.g // 数据 -> DOM
    })
    this.effect(() => {
      b.value = this.$data.b // 数据 -> DOM
    })
    this.effect(() => {
      a.value = this.$data.a // 数据 -> DOM
    })

    this.effect(() => {
      const { r, g, b, a } = this.$data
      div.style.background = `rgba(${r},${g},${b},${a / 100})` // 数据 -> DOM
    })
  }
  // 事件监听管理中心
  effect(callback) {
    this.usedReactivities = []
    callback()

    for (let item of this.usedReactivities) {
      // 防御性代码，第一层
      if (!this.callbacks.has(item[0])) {
        // Map检测对象是否存在
        this.callbacks.set(item[0], new Map())
      }

      // 第二层
      if (!this.callbacks.get(item[0]).has(item[1])) {
        this.callbacks.get(item[0]).set(item[1], [])
      }

      // 添加回调
      this.callbacks.get(item[0]).get(item[1]).push(callback)
    }
  }

  reactive(object) {
    if (this.reactivities.has(object)) {
      return this.reactivities.get(object)
    }
    let proxy = new Proxy(object, {
      set: (obj, prop, val) => {
        obj[prop] = val

        // 不再进行遍历，而是精确定位
        // 有对象，有属性，
        if (this.callbacks.get(obj)) {
          if (this.callbacks.get(obj).get(prop)) {
            // 找到callbacks
            for (let callback of this.callbacks.get(obj).get(prop)) {
              callback()
            }
          }
        }

        return val
      },
      get: (obj, prop) => {
        // 访问过的存起来(收集依赖)
        this.usedReactivities.push([obj, prop])

        // 当prop对应的值是一个对象时，需要继续代理
        if (typeof obj[prop] === 'object') {
          return this.reactive(obj[prop])
        }

        return obj[prop]
      },
    })

    this.reactivities.set(object, proxy)

    return proxy
  }
}

const data = {
  text: 0,
  r: 1,
  g: 1,
  b: 1,
  a: 100,
}
const reactive = new Reactive(data)

// 1.测试双向绑定
reactive.$data.a = 5 // 视图更新
// 更改input值，可以发现reactive.$data.a也随之变化

// 2.调色器
reactive.$data.r = 1 // 视图更新
