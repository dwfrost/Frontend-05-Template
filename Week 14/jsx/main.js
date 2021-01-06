function createElement(tag, attributes, ...children) {
  const dom = document.createElement(tag)

  for (let key in attributes) {
    dom.setAttribute(key, attributes[key])
  }

  for (let child of children) {
    dom.appendChild(child)
  }
  return dom
}

const mydiv = (
  <div className="myclass">
    <span></span>
    <span></span>
    <span></span>
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
