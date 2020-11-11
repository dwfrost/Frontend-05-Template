学习笔记

## proxy 语法

proxy 是危险的特性，因为它会导致一些不可预期的行为，除非自己对代码的操作非常了解。

1. proxy 的基本用法

```js
let object = {
  a: 1,
  b: 2,
}

let po = new Proxy(object, {
  set(obj, prop, val) {
    console.log(obj, prop, val)
  },
})

po.a = 3
```

Proxy 实例化过程中，会挂载一些钩子，可以用来监听属性的操作。

2. 模拟 react 实现原理

- setter 触发时处理响应
- 所有的响应可以存储在一个数组中，触发 setter 后遍历调用所有的 callback，这里 callback 就可以处理比如事件挂载，dom 更新等操作。但遍历会有性能问题，因为不需要

3. Map api 练习

```js
const map = new Map()

map.has() // 是否有某个属性
map.get() // 获取某个属性
map.get().get() // 获取二级属性
```

4. reactive 优化

深层次的属性监听，在收集依赖时，发现属性对应的值是对象类型时，继续使用 Proxy 来收集依赖

5. mvvm 模拟
   双向绑定的原理

更新数据，视图随之更新；
更新视图，数据随之更新

以 input 为例：

- data -> DOM
  修改 proxy.a，在响应式触发 getter 时，找到 input DOM，修改 value

- DOM -> data
  监听 input DOM 的 input 事件，值发生变化时，触发 proxy.a 的 setter，更新 proxy.a 的值

参考 4_mvvm.js，这里封装成一个 class，调用方直接 new 即可。

6. 基于 mvvm 的调色器实现
   input DOM 更改值，触发 setter，更新 proxy，然后继续触发 r,g,b 属性的 getter，从而更新色块的背景色

7. 基本拖拽

- 使用`mousedown`，`mousemove`，`mouseup`来进行模拟，drag 事件不够强大
- currentX,currentY：每次拖拽结束后的位置
- baseX,baseY：每次拖拽前，鼠标位置与元素位置的差值。对于每次拖拽，它是一个常量，因为鼠标位置与元素左上角的距离是不变的。
- event.clientX,event.clientY：当前鼠标点所在的位置

通过改变元素的 transform 即可完成偏移
