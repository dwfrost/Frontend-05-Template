function createElement(tag, attributes, ...children) {
  const dom = document.createElement(tag)

  // 设置属性
  for (let key in attributes) {
    dom.setAttribute(key, attributes[key])
  }

  // 处理子节点
  for (let child of children) {
    // 处理文本节点
    console.log('child', child)
    if (typeof child === 'string') {
      child = document.createTextNode(child)
    }
    dom.appendChild(child)
  }
  return dom
}

const mydiv = (
  <div className="myclass">
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </div>
)

console.log('mydiv', mydiv)
document.body.appendChild(mydiv)

// var mydiv = createElement("div", {
//   className: "myclass"
// },
// createElement("span", null, "1"),
// createElement("span", null, "2"),
// createElement("span", null, "3"));
