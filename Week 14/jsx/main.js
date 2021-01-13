import { createElement } from './framework'
import { Carousel } from './carousel'
import { TimeLine, Animation } from './animation'
let imgList = [
  // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612842827&t=6c265773f0da48a431ed99150779b9ae',
  // 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F20%2F20141020162058_UrMNe.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612842827&t=c78cf72ed34be5dcaa6901f34add9735',
  // 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
]
const timeline = new TimeLine()
window.tl = timeline
// timeline.add(
//   new Animation(
//     {
//       set a(v) {
//         console.log(v)
//       },
//     },
//     'a',
//     0,
//     100,
//     1000,
//     null
//   )
// )
window.animation = new Animation(
  {
    set a(v) {
      console.log(v)
    },
  },
  'a',
  0,
  100,
  1000,
  null
)
// timeline.start()

const mydiv = (
  <Carousel imgList={imgList}>
    {/* <span>1</span>
    <span>2</span>
    <span>3</span> */}
  </Carousel>
  // <div className="myclass">
  //   <span>1</span>
  //   <span>2</span>
  //   <span>3</span>
  // </div>
)

// console.log('mydiv', mydiv)
// document.body.appendChild(mydiv)
mydiv.mountTo(document.body)

// var mydiv = createElement("div", {
//   className: "myclass"
// },
// createElement("span", null, "1"),
// createElement("span", null, "2"),
// createElement("span", null, "3"));
