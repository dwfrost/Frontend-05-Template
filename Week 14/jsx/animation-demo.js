import { TimeLine, Animation } from './animation'

// 获取元素，添加动画
const timeline = new TimeLine()
window.tl = timeline
const el = document.querySelector('.animation')
const template = (v) => `translateX(${v}px)`
window.animation = new Animation(
  el.style,
  'transform',
  0,
  500,
  2000,
  1000,
  null,
  template
)
tl.add(animation)
tl.start()

// 暂停动画
const pause = document.querySelector('.pause')
pause.addEventListener('click', () => {
  tl.pause()
})

// 恢复动画
const resume = document.querySelector('.resume')
resume.addEventListener('click', () => {
  tl.resume()
})
