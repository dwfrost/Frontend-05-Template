学习笔记

## 重学 JavaScript 1

### 语言分类

- 非形式语言
  没有固定的形式，比如中文，英文
- 形式语言
  有严格的形式，如乔姆斯基谱系，它分为 4 类
- 0 型，无限制文法
- 1 型，上下文相关文法
- 2 型，上下文无关文法
- 3 型，正则文法

### 产生式（BNF）

是一种工具，有很多种，这里学习 BNF

巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法的结构定义的复合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- \*表示重复多次
- |表示或
- +表示至少一次

举例：
BNF 描述，如下

```
<MultiplicativeExpression>::=<Number>|
  <MultiplicativeExpression>"*"<Number>|
  <MultiplicativeExpression>"/"<Number>|
<AddtiveExpression>::=<MultiplicativeExpression>|
  <AddtiveExpression>"+"<MultiplicativeExpression>|
  <AddtiveExpression>"-"<MultiplicativeExpression>|
```

### 深入理解产生式

理解乔姆斯基谱系

乔姆斯基谱系：是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。

### 现代语言分类

大部分语言都是上下文无关文法。

按用途分类，分为

- 数据描述语言 JSON,HTML,XAML,SQL,CSS
- 编程语言 C,C++,C#,Java,Python,Ruby,JavaScript

按表达方式，分为

- 声明式语言 JSON,HTML,XAML,SQL,CSS
- 命令型语言 C,C++,C#,Java,Python,Ruby,JavaScript

### 编程语言的性质

#### 图灵完备性

在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

- 图灵机（命令式）
  又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。
  包括`goto` 和 `if/while`

- lambda（声明式）
  `递归`

#### 动态语言和静态语言

[动态语言和静态语言](https://www.cnblogs.com/raind/p/8551791.html)

动态：

- 在用户的设备/在线服务器上
- 产品实际运行时
- 对应 Runtime

静态

- 在程序员的设备上
- 产品开发时
- 对应 Compiletime

#### 类型系统

动态类型系统和静态类型系统
C++ 是静态类型系统
Java 半动态半静态

强类型和弱类型
js 隐式转换（弱类型）

复合类型

- 结构体
- 函数签名

子类型

泛型
