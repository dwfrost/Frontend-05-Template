学习笔记

# 工具链

## 初始化工具 Yeoman

Yeoman 是脚手架的生成器，用于初始化项目，创建模板

### 使用步骤

[生成步骤](https://yeoman.io/authoring/)

1. npm init -y
2. 全局安装依赖

```
npm install -g yo
```

3. 项目安装依赖

```
npm install yeoman-generator -D
```

4. 新建文件
   目录如下

```
├───package.json
└───generators/
    ├───app/
        └───index.js

```

5. 修改下 package.json

```json
{
  // 一定要generator-开头，之后是自定义
  "name": "generator-toolchain",
  "main": "generators/app/index.js"
}
```

6. 关联系统
   在根目录下(package.json 同级)
   `npm link`

> tips: 如果 mac 下报权限不够，可以在命令行前面加上 sudo，即
> `sudo npm link`

7. 运行
   `yo toolchain`，发现 app/index.js 中输出类的所有方法都被执行了

### 处理用户交互

```js
module.exports = class extends (
  Generator
) {
   ...
  // 用户交互
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'cool',
        message: 'Would you like to enable the Cool feature?',
      },
    ])

    this.log('app name', answers.name)
    this.log('cool feature', answers.cool)
  }
}
```

### 文件系统

用于 创建模板

```js
module.exports = class extends (
  Generator
) {
   ...
   copyTemplate() {
      this.fs.copyTpl(
         this.templatePath('index.html'),
         this.destinationPath('public/index.html'),
         { title: this.answers.name }
      )
   }
}
```

### 管理依赖

有 2 种方式

- 安装单个依赖（一般少用到）
- 安装多个依赖

```js
module.exports = class extends (
  Generator
) {
   ...

  // 安装单个依赖
  installingLodash() {
    if (this.answers.installLodash) {
      this.npmInstall(['lodash'], { 'save-dev': true })
    }
  }

// 安装多个依赖
  findPackageJson() {
    const pkgJson = {
      devDependencies: {
        eslint: '^3.15.0',
      },
      dependencies: {
        react: '^16.2.0',
      },
    }

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('public/package.json'), pkgJson)
  }

  installPackageJson() {
    this.npmInstall()
  }
}
```

## 生成 vue 项目

### 开始前的思考

- 需要安装相关依赖
- 需要配置相关模板文件
