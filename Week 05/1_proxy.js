// 1.proxy的基本用法

function fn1() {
  console.log('fn1=================')
  let object = {
    a: 1,
    b: 2,
  }

  let po = new Proxy(object, {
    set(obj, prop, val) {
      console.log(obj, prop, val)
    },
  })

  po.a = 3

  // 不会影响到原来的对象，除非手动修改
  console.log('object', object)

  console.log('=================fn1 ')
}
fn1()

// 2.模拟reactive

function fn2() {
  console.log('fn2=================')
  let object = {
    a: 1,
    b: 2,
  }

  // 所有属性的监听事件，用array管理
  const callbacks = []
  let po = reactive(object)

  effect(() => {
    console.log('effect', po.a)
  })

  // 事件监听管理中心
  function effect(callback) {
    callbacks.push(callback)
  }

  function reactive(object) {
    return new Proxy(object, {
      set(obj, prop, val) {
        console.log('set', obj, prop, val)

        // 每次setter触发时，执行callbacks中所有的方法 （粗糙）
        for (let callback of callbacks) {
          callback()
        }
        obj[prop] = val
        // return val
      },
      get(obj, prop) {
        console.log('get', obj, prop)
        return obj[prop]
      },
    })
  }

  po.a = 3
  console.log('object', object)
  console.log('=================fn2')
}

fn2()
