export function createElement(type, attributes, ...children) {
  let dom

  if (typeof type === 'string') {
    dom = new ElementWrapper(type)
  } else {
    dom = new type()
  }

  // 设置属性
  for (let key in attributes) {
    dom.setAttribute(key, attributes[key])
  }

  // 处理子节点
  for (let child of children) {
    // 处理文本节点
    // console.log('child', child)
    if (typeof child === 'string') {
      // child = document.createTextNode(child)
      child = new TextWrapper(child)
    }
    dom.appendChild(child)
  }
  return dom
}

export const STATE = Symbol('state')
export const ATTRIBUTE = Symbol('attribute')

export class Component {
  constructor(arg) {
    // console.log('arg', arg)
    // this.root = this.render(arg)
    this[ATTRIBUTE] = Object.create(null)
    this[STATE] = Object.create(null)
  }
  setAttribute(name, value) {
    this[ATTRIBUTE][name] = value
  }
  appendChild(child) {
    // console.log('child', child)
    // this.root.appendChild(child)
    child.mountTo(this.root)
  }
  mountTo(parent) {
    // console.log('parent', parent)
    if (!this.root) {
      this.render()
    }
    parent.appendChild(this.root)
  }
  triggerEvent(type, args) {
    this[ATTRIBUTE]['on' + type.replace(/^[\s\S]/, (s) => s.toUpperCase())](
      new CustomEvent(type, { detail: args })
    )
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    // this.root = document.createElement(type)
    super(type)
  }
  render(type) {
    return document.createElement(type)
  }
  // setAttribute(name, value) {
  //   this.root.setAttribute(name, value)
  // }
  // appendChild(child) {
  //   // console.log('child', child)
  //   // this.root.appendChild(child)
  //   child.mountTo(this.root)
  // }
  // mountTo(parent) {
  //   parent.appendChild(this.root)
  // }
}
class TextWrapper extends Component {
  constructor(content) {
    super(content)
  }

  render(content) {
    return document.createTextNode(content)
  }

  // mountTo(parent) {
  //   parent.appendChild(this.root)
  // }
}
