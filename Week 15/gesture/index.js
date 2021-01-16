let { documentElement: el } = document

el.addEventListener('mousedown', (event) => {
  start(event)
  const mousemove = (event) => {
    move(event)
  }
  const mouseup = (event) => {
    end(event)
    el.removeEventListener('mousemove', mousemove)
    el.removeEventListener('mouseup', mouseup)
  }
  el.addEventListener('mousemove', mousemove)
  el.addEventListener('mouseup', mouseup)
})

el.addEventListener('touchstart', (event) => {
  for (let touch of event.changedTouches) {
    // 区分touches
    start(touch)
  }
})
el.addEventListener('touchmove', (event) => {
  for (let touch of event.changedTouches) {
    // 区分touches
    move(touch)
  }
})
el.addEventListener('touchend', (event) => {
  for (let touch of event.changedTouches) {
    // 区分touches
    end(touch)
  }
})
el.addEventListener('touchcancel', (event) => {
  // 表示异常中断touch，比如系统事件alert
  for (let touch of event.changedTouches) {
    // 区分touches
    cancel(touch)
  }
})

let handler
let startX, startY
let isPan = false, // 移动端防抖处理，小于10px认为没有滑动
  isTap = true, // 点击
  isPress = false // 按压

function start(point) {
  // console.log('start', point.clientX, point.clientY)
  ;(startX = point.clientX), (startY = point.clientY)

  isTap = true
  isPan = false
  isPress = false

  // 按压
  handler = setTimeout(() => {
    console.log('press')
    isTap = false
    isPan = false
    isPress = true

    handler = null
  }, 500)
}
function move(point) {
  let dx = point.clientX - startX,
    dy = point.clientY - startY

  if (!isPan && dx ** 2 + dy ** 2 > 100) {
    isTap = false
    isPan = true
    isPress = false

    console.log('pan start')
    clearTimeout(handler)
  }

  if (isPan) {
    console.log(dx, dy)
    console.log('pan')
  }
  // console.log('move', point.clientX, point.clientY)
}
function end(point) {
  if (isTap) {
    console.log('tap end')
    clearTimeout(handler)
  }
  if (isPan) {
    console.log('pan end')
  }
  if (isPress) {
    console.log('press end')
  }
  // console.log('end', point.clientX, point.clientY)
}
function cancel(point) {
  // console.log('cancel', point.clientX, point.clientY)
  clearTimeout(handler)
}
