let { documentElement: el } = document

let contexts = new Map()

// 鼠标有2个键同时按下时，不需要监听2次
let isListeningMouse = false

el.addEventListener('mousedown', (event) => {
  const context = Object.create(null)
  console.log(event.button)

  contexts.set('mouse' + (1 << event.button), context)

  start(event, context)
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
        move(event, context)
      }
      button = button << 1
    }
  }
  const mouseup = (event) => {
    const context = contexts.get('mouse' + (1 << event.button))

    end(event, context)
    contexts.delete('mouse' + (1 << event.button))

    if (event.buttons === 0) {
      el.removeEventListener('mousemove', mousemove)
      el.removeEventListener('mouseup', mouseup)
      isListeningMouse = false
    }
  }

  if (!isListeningMouse) {
    el.addEventListener('mousemove', mousemove)
    el.addEventListener('mouseup', mouseup)
    isListeningMouse = true
  }
})

el.addEventListener('touchstart', (event) => {
  for (let touch of event.changedTouches) {
    // 区分touches
    const context = Object.create(null)
    contexts.set(context.identifier, context)
    start(touch, context)
  }
})
el.addEventListener('touchmove', (event) => {
  for (let touch of event.changedTouches) {
    // 区分touches
    const context = contexts.get(contexts.identifier)
    move(touch, context)
  }
})
el.addEventListener('touchend', (event) => {
  for (let touch of event.changedTouches) {
    // 区分touches
    const context = contexts.get(contexts.identifier)
    end(touch, context)
    contexts.delete(contexts.identifier)
  }
})
el.addEventListener('touchcancel', (event) => {
  // 表示异常中断touch，比如系统事件alert
  for (let touch of event.changedTouches) {
    // 区分touches
    const context = contexts.get(contexts.identifier)
    cancel(touch, context)
    contexts.delete(contexts.identifier)
  }
})

// context.handler
// context.startX
// context.startY
// context.isPan = false // 移动端防抖处理，小于10px认为没有滑动
// context.isTap = true // 点击
// context.isPress = false // 按压
function start(point, context) {
  // console.log('start', point.clientX, point.clientY)
  context.startX = point.clientX
  context.startY = point.clientY

  context.isTap = true
  context.isPan = false
  context.isPress = false

  // 按压
  context.handler = setTimeout(() => {
    console.log('press')
    context.isTap = false
    context.isPan = false
    context.isPress = true

    context.handler = null
  }, 500)
}
function move(point, context) {
  let dx = point.clientX - context.startX,
    dy = point.clientY - context.startY

  if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
    context.isTap = false
    context.isPan = true
    context.isPress = false

    console.log('pan start')
    clearTimeout(context.handler)
  }

  if (context.isPan) {
    console.log(dx, dy)
    console.log('pan')
  }
  // console.log('move', point.clientX, point.clientY)
}
function end(point, context) {
  if (context.isTap) {
    console.log('tap end')
    clearTimeout(context.handler)
  }
  if (context.isPan) {
    console.log('pan end')
  }
  if (context.isPress) {
    console.log('press end')
  }
  // console.log('end', point.clientX, point.clientY)
}
function cancel(point, context) {
  // console.log('cancel', point.clientX, point.clientY)
  clearTimeout(context.handler)
}
