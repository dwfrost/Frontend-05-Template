学习笔记
代码见 week08

### HTML 解析

- 为了方便文件管理，parse 模块单独拆分
- parse 模块接受 HTML 文本作为参数，返回一颗 dom 树
- 参考 HTML 标准。用 FSM（有限状态机）来分析 HTML 的状态
- 在标签结束时提交标签 token
