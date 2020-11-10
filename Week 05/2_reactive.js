// 模拟reactive
function fn2() {
  console.log('fn2=================')
  let object = {
    a: 1,
    b: 2,
  }

  let usedReactivities = []

  // 所有属性的监听事件，这里使用object作为key
  const callbacks = new Map()
  let po = reactive(object)

  effect(() => {
    console.log('effect-a', po.a)
    // console.log('effect-b', po.b)
  })

  // 事件监听管理中心
  function effect(callback) {
    usedReactivities = []
    // callbacks.push(callback)
    callback()
    // console.log('usedReactivities', usedReactivities)

    for (let item of usedReactivities) {
      // 防御性代码，第一层
      if (!callbacks.has(item[0])) {
        // Map检测对象是否存在
        callbacks.set(item[0], new Map())
      }

      // 第二层
      if (!callbacks.get(item[0]).has(item[1])) {
        callbacks.get(item[0]).set(item[1], [])
      }

      // 添加回调
      callbacks.get(item[0]).get(item[1]).push(callback)
    }
  }

  function reactive(object) {
    return new Proxy(object, {
      set(obj, prop, val) {
        // console.log('set', obj, prop, val)
        obj[prop] = val

        // // 每次setter触发时，执行callbacks中所有的方法 （粗糙）
        // for (let callback of callbacks) {
        //   callback()
        // }

        // 不再进行遍历，而是精确定位
        // 有对象，有属性，
        if (callbacks.get(obj)) {
          if (callbacks.get(obj).get(prop)) {
            // 找到callbacks
            for (let callback of callbacks.get(obj).get(prop)) {
              callback()
            }
          }
        }

        return val
      },
      get(obj, prop) {
        // 访问过的存起来
        usedReactivities.push([obj, prop])

        return obj[prop]
      },
    })
  }

  po.a = 3 // 已收集依赖

  // 如果属性值是一个对象呢？
  // po.a.c = 10
  po.b = 4 // 未收集依赖
  // console.log('object', object)
  console.log('=================fn2')
}

fn2()
