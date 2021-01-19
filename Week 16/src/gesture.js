// 封装分为3部分
// listen recognize dispatch
export class Listener {
  constructor(el, recognizer) {
    let contexts = new Map()

    // 鼠标有2个键同时按下时，不需要监听2次
    let isListeningMouse = false

    el.addEventListener('mousedown', (event) => {
      const context = Object.create(null)
      // console.log(event.button)

      contexts.set('mouse' + (1 << event.button), context)

      recognizer.start(event, context)
      const mousemove = (event) => {
        let button = 1
        while (button <= event.buttons) {
          if (button & event.buttons) {
            // 同时存在且button的顺序不一样
            let key
            if (button === 2) {
              key = 4
            } else if (button === 4) {
              key = 2
            } else {
              key = button
            }
            const context = contexts.get('mouse' + key)
            recognizer.move(event, context)
          }
          button = button << 1
        }
      }
      const mouseup = (event) => {
        const context = contexts.get('mouse' + (1 << event.button))

        recognizer.end(event, context)
        contexts.delete('mouse' + (1 << event.button))

        if (event.buttons === 0) {
          document.removeEventListener('mousemove', mousemove)
          document.removeEventListener('mouseup', mouseup)
          isListeningMouse = false
        }
      }

      if (!isListeningMouse) {
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseup)
        isListeningMouse = true
      }
    })

    el.addEventListener('touchstart', (event) => {
      for (let touch of event.changedTouches) {
        // 区分touches
        const context = Object.create(null)
        contexts.set(context.identifier, context)
        recognizer.start(touch, context)
      }
    })
    el.addEventListener('touchmove', (event) => {
      for (let touch of event.changedTouches) {
        // 区分touches
        const context = contexts.get(contexts.identifier)
        recognizer.move(touch, context)
      }
    })
    el.addEventListener('touchend', (event) => {
      for (let touch of event.changedTouches) {
        // 区分touches
        const context = contexts.get(contexts.identifier)
        recognizer.end(touch, context)
        contexts.delete(contexts.identifier)
      }
    })
    el.addEventListener('touchcancel', (event) => {
      // 表示异常中断touch，比如系统事件alert
      for (let touch of event.changedTouches) {
        // 区分touches
        const context = contexts.get(contexts.identifier)
        recognizer.cancel(touch, context)
        contexts.delete(contexts.identifier)
      }
    })
  }
}

// 处理分发一共9个事件
// start
// tapEnd
// press
// pressEnd
// panStart
// pan
// panEnd
// flick
// cancel
export class Recognizer {
  constructor(dispatcher) {
    this.dispatcher = dispatcher
  }
  start(point, context) {
    // console.log('start', point.clientX, point.clientY)
    this.dispatcher.dispatch('start', {
      clientX: point.clientX,
      clientY: point.clientY,
    })

    context.startX = point.clientX
    context.startY = point.clientY

    context.points = [
      {
        t: Date.now(),
        x: point.clientX,
        y: point.clientY,
      },
    ]

    context.isTap = true
    context.isPan = false
    context.isPress = false

    // 按压
    context.handler = setTimeout(() => {
      // console.log('press')
      context.isTap = false
      context.isPan = false
      context.isPress = true
      this.dispatcher.dispatch('press', {})

      context.handler = null
    }, 500)
  }
  move(point, context) {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      context.isTap = false
      context.isPan = true
      context.isPress = false
      context.isVertical = Math.abs(dx) < Math.abs(dy)
      this.dispatcher.dispatch('panStart', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      })

      // console.log('pan start')
      clearTimeout(context.handler)
    }

    if (context.isPan) {
      // console.log(dx, dy)
      // console.log('pan')
      this.dispatcher.dispatch('pan', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
      })
    }

    // 在移动过程中，只选取500ms内的点进行速度计算
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY,
    })

    // console.log('move', point.clientX, point.clientY)
  }
  end(point, context) {
    if (context.isTap) {
      // console.log('tap end')
      this.dispatcher.dispatch('tapEnd', {})
      clearTimeout(context.handler)
    }

    if (context.isPress) {
      // console.log('press end')
      this.dispatcher.dispatch('pressEnd', {})
    }

    let d, v
    context.points = context.points.filter(
      (point) => Date.now() - point.t < 500
    )
    if (!context.points.length) {
      v = 0
    } else {
      // 计算鼠标最近500ms内移动的距离
      d = Math.sqrt(
        (point.clientX - context.points[0].x) ** 2 +
          (point.clientY - context.points[0].y) ** 2
      )
      v = d / (Date.now() - context.points[0].t)
    }
    // console.log('v', v)
    if (v > 1.5) {
      // 经验值，鼠标速度大于1.5px/ms，则认为是flick
      context.isFlick = true
      this.dispatcher.dispatch('flick', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
        velocity: v,
      })
    } else {
      context.isFlick = false
    }

    if (context.isPan) {
      // console.log('pan end')
      this.dispatcher.dispatch('panEnd', {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        isVertical: context.isVertical,
        isFlick: context.isFlick,
      })
    }
    // console.log('end', point.clientX, point.clientY)
  }
  cancel(point, context) {
    // console.log('cancel', point.clientX, point.clientY)
    clearTimeout(context.handler)
    this.dispatcher.dispatch('cancel', {})
  }
}

class Dispatcher {
  constructor(element) {
    this.element = element
  }
  dispatch(type, properties) {
    let event = new Event(type)

    for (let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event)
  }
}

export function enableGesture(element) {
  new Listener(element, new Recognizer(new Dispatcher(element)))
}
