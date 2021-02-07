学习笔记

# 单元测试工具 mocha

## 初步上手

1. 全局或局部安装 mocha

```
 npm install --global mocha
 npm install mocha -D
```

2. 新建业务代码
   见 unit-test/add.js

3. 新建测试文件
   见 unit-test/test/test

```js
// 引入[断言]模块，因为是在webpack之前，所以不支持import
var assert = require("assert");

var add = require("../add.js");

// 简要描述
describe("add function testing", function () {
  // 用例1
  it("1+2 should be 3", function () {
    assert.equal(add(1, 2), 3);
  });

  // 用例2
  it("-5+2 should be -3", function () {
    assert.equal(add(-5, 2), -3);
  });
});
```

## 标准化（使用 import）

1. 安装 babel 依赖
   为了可以使用 import 来引入业务 js，需要使用 babel

```
 npm install --save-dev @babel/core @babel/register @babel/preset-env
```

2. 新建.babelrc
   在项目根目录下新建 unit-test/.babelrc，写入预设

```json
{
  "presets": ["@babel/preset-env"]
}
```

然后就可以愉快的使用 export/import 了

## code coverage

代码覆盖程度，即单元测试的代码和用例，覆盖了多少源码。使用 nyc 来查看测试代码的覆盖率

1. 安装 nyc

```
npm install --save-dev nyc
```

2. 配置 package.json

```json
{
  "scripts": {
    "test": "mocha --require @babel/register",
    // 在正常的命令行前面加上nyc，它就会计算代码覆盖率
    "coverage": "nyc npm run test"
  }
}
```

最终得到一个覆盖率报告

```
| File       | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| ---------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files  | 50        | 100        | 50        | 50        |
| add.js     | 50        | 100        | 50        | 50        | 5                   |
| ---------- | --------- | ---------- | --------- | --------- | ------------------- |
```

3. 为了配合 babel 使用 nyc，需要额外用到 2 个依赖

```
npm i babel-plugin-istanbul @istanbuljs/nyc-config-babel --save-dev
```

3.1 在.babelrc 下配置 plugins

```json
{
  // ...
  "plugins": ["istanbul"]
}
```

3.2 新建.nycrc 文件

```
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```

3.3 替换 package.json 的脚本命令

```json
{
  "scripts": {
    "coverage": "nyc mocha"
  }
}
```
