学习笔记

# 浏览器工作原理

### 总论

![](./browswer1.png)

浏览器渲染流程

1.用户访问 url，通过 http 请求 html

2.对 html 文本进行 parse

3.把标签变成 DOM

4.进行 CSS computing
寻找 HTML 对应的 CSS 规则，可能有叠加，覆盖等 ，计算最后的 CSS 规则结果
得到一颗带 CSS 属性的 DOM 树

5.layout（排版或者布局）
可以得到 DOM 的大小和位置信息

6.render
渲染，绘制图片，添加颜色

7.最后得到 Bitmap
