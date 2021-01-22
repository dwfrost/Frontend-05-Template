import { Component } from './framework'
import { enableGesture } from './gesture'
import { TimeLine, Animation } from './animation'
import { ease } from './timingFunction'

export class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    // console.log(name, value)
    this.attributes[name] = value
  }
  render() {
    this.root = document.createElement('div')
    this.root.classList.add('carousel-wrap')
    for (let item of this.attributes.imgList) {
      const img = document.createElement('div')
      img.classList.add('carousel-item')
      img.style.backgroundImage = `url(${item})`
      this.root.appendChild(img)
    }

    // 对root添加手势监听
    enableGesture(this.root)

    const timeline = new TimeLine()
    timeline.start()

    let handler = null

    let { children } = this.root
    let position = 0
    // const { width } = this.root.getBoundingClientRect()
    // TODO 为啥这里的width是0
    const width = 500

    console.log(this.root.getBoundingClientRect())

    let animationTime = 0 // 动画运行的时间
    let animationX = 0 // 动画运行产生的偏移

    this.root.addEventListener('start', (event) => {
      timeline.pause()
      clearInterval(handler)

      // 计算动画的时间进度
      let progress = (Date.now() - animationTime) / 1500
      animationX = ease(progress) * 500 - 500 // 减500，是移到了下一帧
    })
    this.root.addEventListener('pan', (event) => {
      // console.log('pan', event.clientX - event.startX)
      let x = event.clientX - event.startX - animationX
      // 优化版本：不需要全部child进行偏移
      // console.log('x', x)
      // console.log('width', width)
      let current = position - (x - (x % width)) / width
      // console.log('current', current)
      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = ((pos % children.length) + children.length) % children.length
        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${
          -pos * width + offset * width + x
        }px)`
      }
    })
    this.root.addEventListener('panEnd', (event) => {
      // 基于pan的代码改造
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPicture, 2000)

      let x = event.clientX - event.startX - animationX
      let current = position - (x - (x % width)) / width

      let direction = Math.round((x % width) / width)

      if (event.isFlick) {
        if (event.velocity < 0) {
          direction = Math.ceil((x % width) / width)
        } else {
          direction = Math.floor((x % width) / width)
        }
      }

      for (let offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = ((pos % children.length) + children.length) % children.length
        children[pos].style.transition = 'none'

        timeline.add(
          new Animation(
            children[pos].style,
            'transform',
            -pos * width + offset * width + (x % width),
            -pos * width + offset * width + direction * width,
            500,
            0,
            ease,
            (v) => `translateX(${v}px)`
          )
        )
      }
      position = position - (x - (x % width)) / width - direction
      position =
        ((position % children.length) + children.length) % children.length

      // for (let offset of [
      //   0,
      //   -Math.sign(Math.round(x / width) - x + (width / 2) * Math.sign(x)),
      // ]) {
      //   let pos = position + offset
      //   children[pos].style.transition = ''
      //   children[pos].style.transform = `translateX(${
      //     -pos * width + offset * width
      //   }px)`
      // }
    })

    let nextPicture = () => {
      let nextIndex = (position + 1) % children.length

      let currentItem = children[position]
      let nextItem = children[nextIndex]

      // 这2行代码的目的，是为了在第2轮及以后的轮播中快速就位
      // nextItem.style.transition = 'none'
      // nextItem.style.transform = `translateX(${width - nextIndex * width}px)`

      animationTime = Date.now()

      // 添加动画
      timeline.add(
        new Animation(
          currentItem.style,
          'transform',
          -position * width,
          -width - position * width,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      )
      timeline.add(
        new Animation(
          nextItem.style,
          'transform',
          width - nextIndex * width,
          -nextIndex * width,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        )
      )

      // 16ms是浏览器的一帧，这里的目的是下一帧进入动画时当前元素和下一个元素已就位
      // setTimeout(() => {
      //   nextItem.style.transition = '' // 设为''后，css的样式就生效
      //   currentItem.style.transform = `translateX(${
      //     -width - position * width
      //   }px)`
      //   nextItem.style.transform = `translateX(${-nextIndex * width}px)`
      //   position = nextIndex
      // }, 16)

      position = nextIndex
    }
    handler = setInterval(nextPicture, 2000)

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}
