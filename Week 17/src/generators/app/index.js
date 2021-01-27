var Generator = require('yeoman-generator')

module.exports = class extends (
  Generator
) {
  constructor(args, opts) {
    super(args, opts)
  }
  // 用户交互
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'confirm',
        name: 'installLodash',
        message: 'Would you like to install lodash?',
      },
    ])
  }
  writing() {
    this.log('app name', this.answers.name)
    this.log('install lodash', this.answers.installLodash)
  }

  copyTemplate() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.name }
    )
  }

  // 安装单个依赖
  installingLodash() {
    if (this.answers.installLodash) {
      this.npmInstall(['lodash'], { 'save-dev': true })
    }
  }

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
