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

function start(point) {
  console.log('start', point.clientX, point.clientY)
}
function move(point) {
  console.log('move', point.clientX, point.clientY)
}
function end(point) {
  console.log('end', point.clientX, point.clientY)
}
function cancel(point) {
  console.log('cancel', point.clientX, point.clientY)
}
