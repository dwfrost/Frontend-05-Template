import { createElement, Component } from './framework'
class Carousel extends Component {
  constructor() {
    super()
  }
  render() {
    return document.createElement('div')
  }
}

const mydiv = (
  <Carousel className="carousel-wrap">
    <span>1</span>
    <span>2</span>
    <span>3</span>
  </Carousel>
  // <div className="myclass">
  //   <span>1</span>
  //   <span>2</span>
  //   <span>3</span>
  // </div>
)

console.log('mydiv', mydiv)
// document.body.appendChild(mydiv)
mydiv.mountTo(document.body)

// var mydiv = createElement("div", {
//   className: "myclass"
// },
// createElement("span", null, "1"),
// createElement("span", null, "2"),
// createElement("span", null, "3"));
