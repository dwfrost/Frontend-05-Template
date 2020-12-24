学习笔记

### CSS 排版|盒

#### 盒模型

- content
- padding
- border
- margin

注意区分
box-sizing:border-box;
box-sizing:content-box;

### CSS 排版|正常流

#### 正常流排版

- 收集盒进行
  一行一行排版
- 计算盒在行中的排布
  行内的排版，如盒与文字的排版关系
- 计算行的排布

BFC：块级格式化上下文 (block formatting context) 从上到下
IFC：行内级格式化上下文 (inline formatting context) 从左到右

#### 正常流行级排版

行模型
从上到下依次是
line-top：行的顶部
text-top：文字的顶部
base-line：基线
text-bottom：文字底部
line-bottom：行的底部

vertical-align 会影响到 inline-block 与行内元素的对齐

margin 堆叠（也称为 margin 塌陷）
只会发生在正常流的 BFC 中，原理是盒要求周围是这个 margin，而不是要求盒与盒之间的 margin 都显示出来
在 flex 和 grid 布局中，不会有 margin collapse 现象

### CSS 排版|BFC 合并

Block Container
属于正常流，包括下面几种

- block
- inline-block
- table-cell
- flex item
- grid item
- table caption

BFC 合并发生的条件：两个都是 block box 且 overflow:visible
产生的影响：

- 里面的行盒受 float 影响
- 边距折叠
