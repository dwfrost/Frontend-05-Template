学习笔记

# 部署 web 服务

### 初始化 server

本地服务，可以使用虚拟机

1. 安装 Oracle VM VirtualBox
   下载地址： https://www.virtualbox.org/

2. 下载 Ubuntu 20.04.1 LTS (Focal Fossa)
   下载地址：
   官网： https://releases.ubuntu.com/20.04/
   网盘： https://pan.baidu.com/s/1s8lga6YxuVcOdcAdhGQqoQ
   提取码：b8yw

3. 打开 VirtualBox，新建一个 server
   3.1 新建
   Name:Node Server
   Type:Linux
   Version:Ubuntu(64-bit)
   一路回车

   3.2 启动
   选择 Ubuntu 20.04.1
   开机

   3.3 开机后
   修改镜像地址
   Mirror address:http://mirrors.aliyun.com/ubuntu
   一路回车

   注意保存用户名和密码
   勾选安装 OpenSSH
   之后要重启 2 次 1.reboot 2.machine-reset

4. 在虚拟机中安装 Nodejs npm

```
sudo apt install nodejs
sudo apt install npm

(安装最新node)
sudo npm install -g n
sudo n latest
PATH="$PATH"

```

### 使用 Express 实现 Web 服务

> [Express 应用程序生成](https://www.expressjs.com.cn/starter/generator.html)

1. 启动服务
   service ssh start
   默认监听 22 端口

2. 在虚拟中上设置端口转发
   Settings-Network-Port Forwarding
   添加 1 条端口转发规则，例如
   Host Port:8022
   Quest Port:22

   这样一来，外界访问 8022 端口，就会转发到虚拟机的 22 端口

3. 远程复制本机(mac)资源(Express 项目 )到虚拟机上

在虚拟机创建 server 目录
mkdir server

在 server 目录下，拷贝 8022 端口下的所有资源到虚拟机

```
scp -P 8022 -r ./* frost@127.0.0.1:/home/frost/server
```

注： -P 设置端口
-r 递归拷贝全部目录和文件

4. 虚拟机上启动项目，并映射端口
   npm start

同步骤二，将 8030 映射到 3000 端口

然后在浏览器访问 localhost:8030 即可

### 代码的发布链

server - publish - express
具体代码见 publish-server publish-tool server

### 文件操作

```
<!-- 文件压缩 -->
npm install --save archiver

<!-- 解压 -->
npm install --save unzipper
```
