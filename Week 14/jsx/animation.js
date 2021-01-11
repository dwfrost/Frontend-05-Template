const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMIATIONS = Symbol('animation')

export class TimeLine {
  constructor() {
    this[ANIMIATIONS] = new Set()
  }
  start() {
    let startTime = Date.now()
    this[TICK] = () => {
      let t = Date.now() - startTime
      for (let animation of this[ANIMIATIONS]) {
        if (animation.duration < t) {
          this[ANIMIATIONS].delete(animation)
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
  add(animation) {
    this[ANIMIATIONS].add(animation)
  }
}

export class Animation {
  constructor(
    object,
    property,
    startValue,
    endValue,
    duration,
    timingFunction
  ) {
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.timingFunction = timingFunction
  }
  receive(time) {
    console.log(time)
    let range = this.endValue - this.startValue
    this.object[this.property] =
      this.startValue + (range * time) / this.duration
  }
}
