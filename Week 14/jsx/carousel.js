import { Component } from './framework'
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
    // console.log(this.root.classList)
    // console.log('this.attributes', this.attributes)
    for (let item of this.attributes.imgList) {
      const img = document.createElement('div')
      img.style.backgroundImage = `url(${item})`
      // console.log('img', img)
      this.root.appendChild(img)
    }

    // 普通理解的版本 有视觉上问题
    // let current = 0
    // setInterval(() => {
    //   current++
    //   current = current % this.root.children.length
    //   for (let item of this.root.children) {
    //     item.style.transform = `translateX(-${100 * current}%)`
    //   }
    // }, 1000)

    // 改良后的版本
    // let { children } = this.root
    // let currentIndex = 0

    // setInterval(() => {
    //   let nextIndex = (currentIndex + 1) % children.length

    //   let currentItem = children[currentIndex]
    //   let nextItem = children[nextIndex]

    //   // 这2行代码的目的，是为了在第2轮及以后的轮播中快速就位
    //   nextItem.style.transition = 'none'
    //   nextItem.style.transform = `translateX(${100 - nextIndex * 100}%)`

    //   // 16ms是浏览器的一帧，这里的目的是下一帧进入动画时当前元素和下一个元素已就位
    //   setTimeout(() => {
    //     nextItem.style.transition = '' // 设为''后，css的样式就生效
    //     currentItem.style.transform = `translateX(${
    //       -100 - currentIndex * 100
    //     }%)`
    //     nextItem.style.transform = `translateX(${-nextIndex * 100}%)`
    //     currentIndex = nextIndex
    //   }, 16)
    // }, 1000)

    // 手动轮播
    let position = 0
    this.root.addEventListener('mousedown', (event) => {
      console.log(event.clientX, event.clientY)
      let { children } = this.root
      let startX = event.clientX

      const { width } = this.root.getBoundingClientRect()

      const move = (event) => {
        let x = event.clientX - startX

        // 鼠标移动时，整体偏移
        // for (let child of children) {
        //   child.style.transition = 'none'
        //   child.style.transform = `translateX(${-position * width + x}px)`
        // }

        // 优化版本：不需要全部child进行偏移
        let current = position - (x - (x % width)) / width
        for (let offset of [-1, 0, 1]) {
          let pos = current + offset
          pos = (pos + children.length) % children.length
          children[pos].style.transition = 'none'
          children[pos].style.transform = `translateX(${
            -pos * width + offset * width + x
          }px)`
        }
      }
      const up = (event) => {
        let x = event.clientX - startX
        position = position - Math.round(x / width)
        console.log('position', position)
        for (let offset of [
          0,
          -Math.sign(Math.round(x / width) - x + (width / 2) * Math.sign(x)),
        ]) {
          let pos = position + offset
          children[pos].style.transition = ''
          children[pos].style.transform = `translateX(${
            -pos * width + offset * width
          }px)`
        }
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}
