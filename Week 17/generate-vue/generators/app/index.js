var Generator = require('yeoman-generator')

module.exports = class extends (
  Generator
) {
  constructor(args, opts) {
    super(args, opts)
  }
  // 用户交互
  async initPakage() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
    ])

    const pkgJson = {
      name: this.answers.name,
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
      },
      keywords: [],
      author: '',
      license: 'ISC',
      devDependencies: {},
      dependencies: {},
    }
    this.fs.extendJSON(this.destinationPath('public/package.json'), pkgJson)

    this.npmInstall(['vue'], { 'save-dev': false })
    this.npmInstall(['webpack', 'vue-loader'], { 'save-dev': true })
  }

  copyTemplate() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.answers.name }
    )
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
