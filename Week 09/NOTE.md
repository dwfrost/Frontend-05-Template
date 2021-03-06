学习笔记
代码见 week08

### HTML 解析

- 为了方便文件管理，parse 模块单独拆分
- parse 模块接受 HTML 文本作为参数，返回一颗 dom 树
- 参考 HTML 标准。用 FSM（有限状态机）来分析 HTML 的状态

- 在标签结束时提交标签 token

- 属性值包括单引号，双引号，无引号，需要分别处理
- 属性结束时，需要把属性（key-vlaue）加到标签 token 上

- 用标签构建 DOM 树的方法：使用栈
- 遇到开始标签时，创建元素并入栈；遇到结束标签时，出栈
- 自封闭节点可视为入栈后立即出栈
- 任何元素的父元素是它入栈前的栈顶元素

- 多个文本节点需要合并

- css computing
  - 收集 css 规则
    - 遇到 style 标签时，就保存 css 规则
    - 使用 npm 的 css 库来解析 css 规则 (npm install css)
    - 分析解析后的 css 结构，使用数组收集
  - 创建元素的时候，立即计算 CSS
    - 分析一个元素时，假设所有 CSS 规则都已 收集完毕
  - 获取父元素序列
    - 必须先知道该元素的所有父元素，才能判断元素与规则是否匹配
    - 从 stack 收集器中，可以获取所有父元素
    - 因为 computeCSS 传入的是当前元素，所以为了获取父元素，比如从内向外去操作 stack
      如 .div1 .div2 #myspan 顺序是先查找 #myspan，再查找.div2 .div1 的
  - 选择器与元素匹配
    - 选择器也需要从内向外排列
    - 双循环匹配父元素队列
    - 根据选择器的类型和元素属性，计算是否与当前元素匹配
    - 匹配上后，就应用选择器到元素上，形成 computedStyle

#### tips

- 辨析 tag,element,node
  tag 表示标签，只是一个<>表示，代表的意义就是 element
  element 表示元素
  node 表示节点

- 如何快速复制一个数组
  [].slice()
