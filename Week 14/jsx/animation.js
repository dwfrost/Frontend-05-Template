const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMIATIONS = Symbol('animation')
const START_TIME = Symbol('start-time')

const PAUSE_START = Symbol('pause-start')
const PAUSE_TIME = Symbol('pause-time')

export class TimeLine {
  constructor() {
    // 时间线的动画是一个list
    this[ANIMIATIONS] = new Set()
    this[START_TIME] = new Map()
  }
  start() {
    let startTime = Date.now()
    console.log('start', startTime)
    this[PAUSE_TIME] = 0

    this[TICK] = () => {
      console.log('this[PAUSE_TIME]', this[PAUSE_TIME])
      // let t = Date.now() - startTime
      let now = Date.now()
      for (let animation of this[ANIMIATIONS]) {
        let t
        // console.log(
        //   'this[START_TIME].get(animation)',
        //   this[START_TIME].get(animation)
        // )

        if (this[START_TIME].get(animation) < startTime) {
          // 可能动画执行在timeline start之前
          t = now - startTime - this[PAUSE_TIME]
        } else {
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME]
        }
        // 当动画执行时间超过设定时间时，清除动画，并修正末尾传入时间
        if (animation.duration < t) {
          this[ANIMIATIONS].delete(animation)
          t = animation.duration
        }
        animation.receive(t)
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }

  pause() {
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume() {
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }

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
    timingFunction,
    template
  ) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
    this.template = template
  }
  /**
   *
   * @param {Number} time 帧与帧之间的时间差值
   */
  receive(time) {
    // console.log('time', time)
    let range = this.endValue - this.startValue

    // 属性值变化公式（斜率固定）
    this.object[this.property] = this.template(
      this.startValue + (range * time) / this.duration
    )
  }
}
