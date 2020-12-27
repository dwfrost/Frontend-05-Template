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

### CSS 排版|Flex 排版

- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布

> 摘要第 10 周笔记

#### 排版，计算主轴

- 找出所有 flex 元素
- 把主轴方向的剩余空间按比例分配给这些元素
- 若剩余空间为负数，所有 flex 元素尺寸都为 0，等比压缩剩余元素
- 若没有 flex 元素，则根据 justifyContent 计算每个元素的位置

#### 计算交叉轴

- 根据每一行中最大元素尺寸计算行高
- 根据行高的 flex-align 和 item-align，确定元素具体位置

### CSS 动画与绘制

#### 动画

css 对 dom 的修饰分为 3 类

- 控制元素的尺寸和位置
- 控制绘制和实际渲染信息
- 控制交互和动画信息

1. Animation
   @keyframes 定义
   anition:使用

   1.1 6 个属性

   - animation-name 动画名
   - animation-duration 动画时长
   - animation-time-function 动画时间曲线
   - animation-delay 动画开始前的延迟时间
   - animation-iteration-count 动画播放次数
   - animation-direction 动画方向

     1.2 @keyframes
     可以定义 from+to
     也可以使用百分比，表示动画的关键帧过程

```css
@keyframes mykf {
  from {
    background: red;
  }
  to {
    background: green;
  }
}
div {
  animation: mykf 5s infinite;
}
```

2. Transition

2.1 属性

- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-time-function 变换的时间曲线
- transition-delay 变换的延迟

[贝塞尔曲线](https://cubic-bezier.com/)

常用时间曲线

- ease 缓动动画，缓动起步和缓动结束，弹框等常用
- ease-in 缓动启动 常用于动画退出
- ease-out 缓动结束 常用于动画出现

#### 颜色

自然界三原色 品红、黄、青
程序三种基本颜色 RGB

#### 绘制

1. 几何图片

- border
- box-shadow
- border-radius

2. 文字

- font
- text-decoration

3. 位图

- background-image

小技巧：
可以使用 svg+uri 的方式来绘制比较复杂的图形
svg 支持 path，所以只要有 uri，就可以支持复杂图形的绘制
