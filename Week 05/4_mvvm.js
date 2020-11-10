class Reactive {
  constructor(data) {
    // 模拟reactive 双向绑定

    // 依赖缓存
    this.reactivities = new Map()
    this.usedReactivities = []

    // 所有属性的监听事件，这里使用object作为key
    this.callbacks = new Map()
    this.$data = this.reactive(data)

    const input = document.querySelector('input')

    input.addEventListener('input', (event) => {
      this.$data.a = event.target.value // DOM -> 数据
    })

    this.effect(() => {
      input.value = this.$data.a // 数据 -> DOM
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
  a: 0,
}
const reactive = new Reactive(data)
reactive.$data.a = 5 // 视图更新

// 更改input值，可以发现reactive.$data.a也随之变化
