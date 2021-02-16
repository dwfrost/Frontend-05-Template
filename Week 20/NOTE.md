学习笔记

### mac 端命令行操作

- touch xx.md 新建文件
- rm xx.md 删除文件

- ls 查看文件
- ls -a 查看全部文件（包括隐藏文件）

- open . （mac,linux）打开当前目录
- start . （windows）打开当前目录

- 在.git/hooks 下新建 pre-commit 文件
  直接执行时报无权限

```sh
macbookpro@MacBooks-MacBook-Pro hooks % ./pre-commit
zsh: permission denied: ./pre-commit
```

- ls -l ./pre-commit 检查文件的信息

```sh
macbookpro@MacBooks-MacBook-Pro hooks % ls -l ./pre-commit
-rw-r--r--  1 macbookpro  staff  0  2 16 08:40 ./pre-commit
```

- chmod +x ./pre-commit 赋予权限并执行
  再查看权限

```sh
macbookpro@MacBooks-MacBook-Pro hooks % ls -l ./pre-commit
-rwxr-xr-x 1 macbookpro staff 0 2 16 08:40 ./pre-commit
```

### 写入 pre-commit 文件

```
#!/usr/bin/env node
// 告诉操作系统使用node来执行

const process = require('process')
console.log('hello hooks')

// 阻止commit
process.exit(1)

```
