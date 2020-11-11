const drag = document.querySelector('.drag')

// document.addEventListener('drag', () => {
//   console.log(1)
// })

let currentX = 0
let currentY = 0

drag.addEventListener('mousedown', (event) => {
  console.log(event)
  console.log('currentX', currentX)

  console.log('mousedonw-clientX', event.clientX)
  // 第二次以后的坐标要做校准，因为之前已经有偏移了
  const baseX = event.clientX - currentX
  const baseY = event.clientY - currentY
  console.log('baseX', baseX)

  const up = (event) => {
    // 鼠标离开时，记录当前位置，便于后面校准
    currentX = event.clientX - baseX
    currentY = event.clientY - baseY

    console.log('up', currentX)
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  const move = (event) => {
    console.log('move', event)
    console.log('mousemove-clientX', event.clientX)

    // 移动过程中监听鼠标的偏移量，作为元素的偏移量，修改样式即可
    drag.style.transform = `translate(${event.clientX - baseX}px,${
      event.clientY - baseY
    }px)`
  }

  // 这里使用document来监听
  document.addEventListener('mousemove', move)

  document.addEventListener('mouseup', up)
})
