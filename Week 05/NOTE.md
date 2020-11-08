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
