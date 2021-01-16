import { TimeLine, Animation } from './animation'
import { ease, easeIn, easeOut } from './timingFunction'

// 获取元素，添加动画
const timeline = new TimeLine()
window.tl = timeline
const el1 = document.querySelector('#a1')
const template = (v) => `translateX(${v}px)`

window.animation = new Animation(
  el1.style,
  'transform',
  0,
  500,
  2000,
  0,
  ease,
  template
)
tl.add(animation)
tl.start()

const el2 = document.querySelector('#a2')
el2.style.transition = '2s ease'
el2.style.transform = 'translateX(500px)'

const pauseEl = document.querySelector('.pause')
let flag = true

pauseEl.addEventListener('click', () => {
  if (flag) {
    flag = false
    pause()
  } else {
    flag = true
    resume()
  }
})

// 暂停动画
function pause() {
  tl.pause()
  pauseEl.innerHTML = '恢复'
}

// 恢复动画
function resume() {
  tl.resume()
  pauseEl.innerHTML = '暂停'
}
