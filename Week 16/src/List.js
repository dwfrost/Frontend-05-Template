import { ATTRIBUTE, Component, createElement } from './framework'

export class List extends Component {
  constructor() {
    super()
  }
  render() {
    // console.log('this[ATTRIBUTE]', this[ATTRIBUTE])
    this.children = this[ATTRIBUTE].imgList.map(this.template)
    console.log('this.children', this.children)
    this.root = (<div>{this.children}</div>).root
  }
  appendChild(child) {
    // console.log('child', child)
    this.template = child
    this.render()
  }
}
