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
    // console.log(this.root.classList)
    // console.log('this.attributes', this.attributes)
    for (let item of this.attributes.imgList) {
      const img = document.createElement('div')
      img.style.backgroundImage = `url(${item})`
      // console.log('img', img)
      this.root.appendChild(img)
    }

    // 对root添加手势监听
    enableGesture(this.root)
    this.root.addEventListener('pan', (event) => {
      console.log(event)
    })

    let { children } = this.root
    let position = 0

    // 手动轮播
    // this.root.addEventListener('mousedown', (event) => {
    //   console.log(event.clientX, event.clientY)
    //   let { children } = this.root
    //   let startX = event.clientX

    //   const { width } = this.root.getBoundingClientRect()

    //   const move = (event) => {
    //     let x = event.clientX - startX
    //     // 优化版本：不需要全部child进行偏移
    //     let current = position - (x - (x % width)) / width
    //     for (let offset of [-1, 0, 1]) {
    //       let pos = current + offset
    //       pos = (pos + children.length) % children.length
    //       children[pos].style.transition = 'none'
    //       children[pos].style.transform = `translateX(${
    //         -pos * width + offset * width + x
    //       }px)`
    //     }
    //   }
    //   const up = (event) => {
    //     let x = event.clientX - startX
    //     position = position - Math.round(x / width)
    //     console.log('position', position)
    //     for (let offset of [
    //       0,
    //       -Math.sign(Math.round(x / width) - x + (width / 2) * Math.sign(x)),
    //     ]) {
    //       let pos = position + offset
    //       children[pos].style.transition = ''
    //       children[pos].style.transform = `translateX(${
    //         -pos * width + offset * width
    //       }px)`
    //     }
    //     document.removeEventListener('mousemove', move)
    //     document.removeEventListener('mouseup', up)
    //   }

    //   document.addEventListener('mousemove', move)
    //   document.addEventListener('mouseup', up)
    // })

    return this.root
  }

  mountTo(parent) {
    parent.appendChild(this.render())
  }
}
