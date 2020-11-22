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

### JS 结构化 之 宏任务、微任务

### JS 结构化 之 函数调用
