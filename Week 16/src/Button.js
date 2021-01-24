import { Component, createElement } from './framework'

export class Button extends Component {
  constructor() {
    super()
  }
  render() {
    this.childContainer = <span></span>
    this.root = (<div>{this.childContainer}</div>).root
  }
  appendChild(child) {
    if (!this.childContainer) {
      this.render()
    }
    this.childContainer.appendChild(child)
  }
}
