学习笔记

## 重学 JS（二）

### JS 表达式之 运算符和表达式

语法树 和 运算符

#### 表达式

优先级由高到低

1. Member
   包括

- a.b
- a[b]
- foo`string` 作为函数参数传入
- super.b
- super['b']
- new.target
- new.Foo()

2. New
   如 new Foo （不带括号）

此外，区分下
new a()() （先 new a()）
new new a() （先 new a()）

3. Call
   函数调用

- foo()
- super()
- foo()['b']
- foo().b
- foo()`abc`

举例，
new a()['b']
先 new a()

4. 左手，右手表达式
   left hand

right hand

- update

  - a++
  - a--
  - --a
  - ++a

- Unary

  - delete a.b
  - void foo()
  - typeof a
  - +a
  - -a
  - ~a
  - !a
  - await a

- Exponental
  - \*\* 乘方
    如 3 ** 2 ** 3 = 3 ** (2 ** 3)

5. 四则运算

\* / % + -
<< >> >>>
< > <= >= instanceof in

6. 比较运算

== !=
=== !==

7. 逻辑运算
   && ||
   三元表达式

### JS 表达式 之 类型转换

（7 种基本类型的互相转换）

#### 拆箱转换

- ToPrimitive
- toString vs valueOf
- Symbol.toPrimitive

#### 装箱转换

Number : new Number(1) 1
Stirng : new String('a') 'a'
Boolean : new Boolean(true) true
Symbol : new Object(Symbol('a')) Symbol('a')

### JS 语句 之 运行时

#### Completion Record

[[type]]:normal,break,continue,return,or throw
[[value]]:基本类型
[[target]]:label

### JS 语句 之 简单语句 和复合语句

#### 简单语句

- 表达式语句
- 空语句 ;
- debugger 语句 debugger
- throw 语句 抛出一个异常
- continue 语句 结束单个循环
- break 语句 结束整个循环
- return 语句 函数结束

#### 复合语句

- block 语句 {...}
- if 语句
- switch 语句
- 循环语句 if while
- with 语句 不建议使用
- labelled 语句 给语句取一个名字 在循环中结合 break 使用，可以跳出指定循环
- try 语句 try catch finally
  即使 try 中有 return，finally 也会继续执行

### JS 语句 之 声明

#### 声明分类

- 函数声明
  - function
  - function \*
  - async function
  - async function \*
- 变量声明
- class 声明
- lexical 声明
  - let
  - const

#### 预处理机制

在 JS 引擎解析代码之前，对代码本身做预先处理

- example

```js
var a = 2
void (function () {
  a = 1
  return
  var a // 尽管有return，但声明依然提前
})()
console.log(a) // 2
```

#### 作用域

以 var 为例，var 声明的变量仅在它当前所处的函数范围内生效，这就是一段变量作用的范围，即作用域

而 const 声明的变量，就在 block（花括号）范围内有效

```js
var a = 2
void (function () {
  a = 1
  return
  {
    const a
  }
})()
console.log(a)
```

### JS 结构化 之 宏任务、微任务

- 宏任务
- 微任务

JS 引擎外执行的是宏任务，JS 引擎内 Promise 会产生微任务

- 事件循环 1.获取代码 2.执行代码 3.等待下一次获取代码

### JS 结构化 之 函数调用

- 闭包
  每个函数都会生成一个闭包，包括代码部分和环境部分
  环境：每个函数会带一个定义时所在的 environment record，然后将其保存在自己的对象上，变成一个属性。（如果函数嵌套，就会出现常见的闭包场景 ）
  代码：即函数内部本身的 code

```js
var y = 2
function foo(){
console.log(y)
}
export foo // 暴露出去的foo一直保持对y的引用，这时形成了闭包
```

- Realm
  2018 标准定义的，对象直接量和函数表达式都会创建对象，那么这些对象的原型来自 不同的 Realm

```js
var x = {} // 创建Objectc对象
;(1).toString() // 装箱产生Number对象
```
