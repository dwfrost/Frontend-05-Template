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

### 编程语言的设计方式

由小到大依次是
Atom，如 Identifier,Literal 关键字 变量名 直接量
Expression，如 Atom,Operator,Punctuator
Statement，如 Expression,Keyword,Punctuator
Structure，如 Function,Class,Process,Namespace
Program，如 Program,Module,Package,Library

#### 后续课程讲解思路

语法 ==》 语义 ==》 运行时

### JS 类型之 Number

类型汇总
Number,String,Boolean,Object,Null,Undefined,Symbol

Number 定义是双精度浮点类型，包括
Sign(1) 符号位
Exponent(11) 指数位
Fraction(52) 精度位

精度损失
因为浮点数不能精确表示 10 进制数字，它在真实数字上下浮动。然后在运算过程中，可能就会丢失精度。

> 著名问题 0.1+0.2 != 0.3

### JS 类型之 String

字符串有字符（Character）组成，如 a
码点(Code Point)是计算机的表示方法，如 97
编码(Encoding)是字节的表示，如 01100001

字符集：

- ASCII 最早的一种编码，字符很少
- Unicode,UCS
- GB(GB2312,GBK,GB18030) 中国
- ISO-8859 东欧国家
- BIG5 台湾

UTF8，解释为 1 个字节有 8 个比特位，表示 1 个字符

字符串表示法
`` | '' | ""

### JS 类型之 Null Undefined

Null 表示定义了，但无值
Undefined 表示未定义

如果要表示 `undefined`，可以写成 `void 0`

### JS 类型之 Object

1.基础解释
任何一个对象是唯一的，这与它本身的状态无关。
我们用状态来描述对象。
状态的改变，即行为。

2.组成
对象由 3 个核心要素组成

- state 有状态
- identifier 唯一性标识
- behavior 状态可以改变

  3.类

- 归类 多继承，层层提取共性 由下到上
- 分类 单继承，基类是最上层的一类 由上到下

javaScript 更接近分类思想，体现为原型思想

 <!-- 小练习 -->

狗咬人，怎么描述

```
 // 不推荐，因为狗本身状态没有改变
class Dog{
  bite(){}
}

// 推荐，狗咬人是业务逻辑，真正的逻辑是人受到了伤害，入参是伤害的类型和值
class Human{
  hurt(damage){}
}
```

4.JavaScript 的对象
state 属性
identifier 内存地址
behavior 方法

原型链是获取对象属性的行为

- 属性
  包括 数据属性 和 访问器属性

一般地，数据属性用于描述状态，访问器属性用于描述行为

Data Property

- [[value]]
- writable
- enumerable
- configurable

Accessor Property

- get
- set
- enumerable
- configurable

对象分类

- Function 对象
- Array 对象
- Host 对象
