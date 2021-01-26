import { createElement } from './framework'
// import { Carousel } from './Carousel'
// import { Button } from './Button'
import { List } from './List'

let imgList = [
  {
    src:
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117092809_ffwKZ.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612842827&t=6c265773f0da48a431ed99150779b9ae',
    url: 'https://www.baidu.com',
    title: '标题1',
  },
  // {
  //   src:
  //     'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201410%2F20%2F20141020162058_UrMNe.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612842827&t=c78cf72ed34be5dcaa6901f34add9735',
  //   url: 'https://www.baidu.com',
  //   title: '标题2',
  // },
  // {
  //   src:
  //     'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
  //   url: 'https://www.baidu.com',
  //   title: '标题3',
  // },
]

// const carousel = (
//   <Carousel
//     onChange={(event) => console.log(event.detail.position)}
//     onClick={(event) => (window.location.href = event.detail.url)}
//     // onClick={(event) => console.log(event.detail.link)}
//     imgList={imgList}
//   ></Carousel>
// )

// carousel.mountTo(document.body)
// debugger

const list = (
  <List imgList={imgList}>
    {(record) => {
      ;<div>
        <img src={record.src} />
        <a href={record.url}>{record.title}</a>
      </div>
    }}
  </List>
)
// list.mountTo(document.body)

// const button = <Button>content</Button>
// // const button = <span>a</span>

// button.mountTo(document.body)
