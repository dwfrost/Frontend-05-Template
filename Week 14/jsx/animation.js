const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMIATIONS = Symbol('animation')
const START_TIME = Symbol('start-time')

export class TimeLine {
  constructor() {
    // 时间线的动画是一个list
    this[ANIMIATIONS] = new Set()
    this[START_TIME] = new Map()
  }
  start() {
    let startTime = Date.now()
    console.log('start', startTime)
    this[TICK] = () => {
      // let t = Date.now() - startTime
      let now = Date.now()
      for (let animation of this[ANIMIATIONS]) {
        let t
        // console.log(
        //   'this[START_TIME].get(animation)',
        //   this[START_TIME].get(animation)
        // )

        // 可能动画执行在timeline start之后
        if (this[START_TIME].get(animation) < startTime) {
          t = now - startTime
        } else {
          t = now - this[START_TIME].get(animation)
        }
        // 当动画执行时间超过设定时间时，清除动画，并修正末尾传入时间
        if (animation.duration < t) {
          this[ANIMIATIONS].delete(animation)
          t = animation.duration
        }
        animation.receive(t)
      }
      requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  pause() {}
  resume() {}

  reset() {}
  add(animation, startTime = Date.now()) {
    this[ANIMIATIONS].add(animation)
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    delay,
    timingFunction
  ) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
  }
  /**
   *
   * @param {Number} time 帧与帧之间的时间差值
   */
  receive(time) {
    console.log('time', time)
    let range = this.endValue - this.startValue

    // 属性值变化公式（斜率固定）
    this.object[this.property] =
      this.startValue + (range * time) / this.duration
  }
}
