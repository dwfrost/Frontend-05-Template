学习笔记
代码基于 week08

1. 根据浏览器属性进行排版

- 抽取 layout 模块，用于对 dom 排版
- 样式预处理
- 拷贝样式属性值
- 转化如 100px 为 100
- 只处理 flex 布局
- 统一 width,heigth 默认值
- 设置 flex 属性的默认值
- 将 flex 的排列方式进行表示

2. 收集元素进行(hang)

- 遍历所有元素，对每个元素进行分行和剩余空间判断
- 元素可伸缩 或 设置 flexWrap 为 nowrap 时，不换行
- 换行时，将换行元素收集
- 换行和不换行，都要计算剩余空间

3. 排版，计算主轴

- 找出所有 flex 元素
- 把主轴方向的剩余空间按比例分配给这些元素
- 若剩余空间为负数，所有 flex 元素尺寸都为 0，等比压缩剩余元素
- 若没有 flex 元素，则根据 justifyContent 计算每个元素的位置

4. 计算交叉轴

- 根据每一行中最大元素尺寸计算行高
- 根据行高的 flex-align 和 item-align，确定元素具体位置

5. 渲染

- 绘制需要依赖一个图形环境，这里采用 npm 包 images
- 绘制在一个 viewport 上进行
- 与绘制相关的属性有：background-color,border,background-image 等
- 递归调用子元素的绘制方法完成 DOM 树的绘制
- 忽略一些不需要绘制的节点
