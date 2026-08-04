---
title: Docker
---

## 简介

Docker 是一个容器工具，而容器是一种非常现代的环境解决方案

## 基本概念

### 容器

容器是一种轻量级的环境，它把应用程序及其依赖打包在一起

相比虚拟机，容器直接共享主机内核，无需虚拟化硬件。同时容器之间相互隔离，可以避免冲突

### 镜像

容器可以通过镜像生成，而镜像可以通过 Dockerfile 构建出来

这使得我们可以轻松复现出相同的环境，确保了开发、测试、生产等各种场景中的环境一致性

### 仓库

镜像可以上传到仓库进行共享，容器可以跨平台，这都使得协作、配置环境变得更加方便

## 对比

目前有许多容器工具，Docker 仅仅是其中一种。Podman 被认为是一种更好的容器工具，主要优势有

- 架构更先进。Docker 使用 **客户端 - 守护进程** 架构；而 Podman 使用 **无守护进程** 架构
- 安全性更好。Docker 默认情况下需要 **root** 权限运行守护进程，存在安全隐患；而 Podman 有原生且完善的 **rootless** 模式
- 更易使用。Docker 需要先启动守护进程；而 Podman 不需要

> [!note] 易用性和用户界面
> Docker 有 `Docker Desktop` 这个桌面应用程序提供 **GUI** 和 `lazydocker` 这个命令行工具提供 **TUI**，而 Podman 目前只有 `podman-tui` 这个工具提供的 **TUI**，因此使用门槛上也许 Docker 会比 Podman 更低。
>
> 但如果只比较原始的 CLI 程序，那么显然还是 Podman 更易用，接下来会详细说明这一点

如果不使用 Docker Desktop，只使用 Docker CLI，那么启动一个容器会非常麻烦。下面是在 Windows 系统里使用 Docker 运行一个容器需要的步骤

```sh
# 安装 Docker CLI
scoop install docker
# 然后以管理员权限启动新的终端，因为后面的命令需要管理员权限
# 将守护进程注册为服务
dockerd --register-service
# 启动守护进程
sasv dockerd
# 运行容器
docker run hello-world
```

这时你大概率会得到一个报错。因为在 Windows 上 `dockerd` 只支持运行 Windows 容器。一个可能正确的做法应该是这样的

1. 在 WSL 里安装 Docker 并启动守护进程 `dockerd`。当然，这个过程是需要 root 权限的
2. 在 Windows 里安装 Docker，并通过配置让 Windows 里的 `docker` 连接到 WSL 里的 `dockerd`

而在 Windows 里使用 Podman CLI 运行容器就比较简单

```sh
# 安装 Podman CLI
scoop install podman
# 初始化一个 WSL 虚拟机
podman machine init
# 启动并连接到虚拟机
podman machine start
# 运行容器
podman run hello
```

不需要新打开一个管理员权限的终端，不需要复杂的配置。除了可能的网络问题外，即使是第一次使用也基本上不会遇到报错

## 安装

### Windows

> [!note] Podman 官方文档
>
> 本文只介绍 Podman CLI 的安装和使用，更详细的内容可参考 [podman for windows 官方文档](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md)

首先在 Windows 的文件系统里安装 podman

```sh
scoop install podman
```

然后初始化 WSL 虚拟机

```sh
podman machine init
```

### WSL

也可以直接在 WSL 里安装 podman

```sh
# Ubuntu
apt install podman
```

## 使用

如果 podman 在 Windows 的文件系统里安装，那么在运行别的命令前记得先启动虚拟机

```sh
podman machine start
```

### 基本使用

```sh
# 在 ubi8-micro 容器里运行 date 命令
podman run ubi8-micro date
# 与 ubi8-micro 容器交互
podman run -it ubi8-micro
```

不过 `ubi8-micro` 这个镜像非常小，只有 **25.8 MB**，因此功能有限。你可以拉取一个更大的镜像来玩

```sh
# 拉取 ubuntu 镜像并运行 bash
podman run -it ubuntu bash
# 可以为这个容器实例取个名字
podman run -it --name hello-ubuntu ubuntu bash
```

### 构建镜像

> [!note] 镜像和容器
> 镜像和容器是两个很容易混淆的概念，两者之间的关系大概就是
>
> - 镜像是不变的，而容器是可变的
> - 每次运行镜像，比如 `podman run -it ubuntu bash`，实际上都创建了一个新的容器实例
> - 可以通过命令，比如 `podman commit container-id new-image-name`，将一个修改过的容器保存为新的镜像
>
> 这是一些常用的查看容器和镜像的命令，你可以自己对比一下有什么区别
>
> ```sh
> # 列出存储的镜像
> podman images
> # 列出所有镜像，包括中间镜像
> podman images -a
> # 列出正在运行的容器
> podman ps
> # 列出所有容器，包括已停止的容器
> podman ps -a
> ```
>
> 本文不会纠结这两个概念的细致区别，因此可能存在不准确的地方

#### 手动构建镜像

`start` 和 `stop` 子命令可以启动容器实例和停止容器实例，其中 `CONTAINER-ID` 和 `CONTAINER-NAME` 可以通过 `podman ps -a` 查看

```sh
# 启动容器实例
podman start -ai CONTAINER-ID/CONTAINER-NAME
# 停止容器实例
podman stop CONTAINER-ID/CONTAINER-NAME
```

> [!note] kill 和 stop
> 还有一条子命令 `kill` 可以用来停止正在运行的容器实例。从名字上也能看出，`kill` 相比 `stop` 更强硬一点，它默认发送 **SIGKILL** 信号。如果使用 `stop` 失败了，可以尝试使用 `kill`
>
> ```sh
> podman kill CONTAINER-ID/CONTAINER-NAME
> ```

`exec` 子命令可以让一个正在运行的容器实例执行命令。如果遇到问题，我们可以使用它来进行容器的调试

```sh
podman exec -it CONTAINER-ID/CONTAINER-NAME bash
```

当你对容器做出了一些修改后，可以通过 `commit` 进行保存

```sh
podman commit CONTAINER-ID/CONTAINER-NAME NEW-IMAGE-NAME
```

这会本地生成一个新的镜像，然后你可以基于这个镜像再创建新的容器实例

#### 自动构建镜像

除了通过 `podman run -it ubuntu bash` 这种方式在交互式 shell 会话中对容器进行操作外，还有别的修改容器的方式，比如 `podman container cp index.js hello-node:/usr/src/app/index.js` 可以把本地文件 `index.js` 复制到 `hello-node` 容器的 `/usr/src/app/index.js` 位置

不过，以上这些自己手动修改容器，再保存为新镜像的做法不是创建容器镜像的最佳方法。一个更好的方法是使用 `Dockerfile`，这通过一个配置文件来让创建镜像的过程自动化

```dockerfile
FROM node:20

WORKDIR /usr/src/app

COPY ./index.js ./index.js

CMD node index.js
```

以上示例非常简单，你可以在 [Docker 官方文档](https://docs.docker.com/reference/dockerfile/) 里获得更详细的参考。有了 `Dockerfile` 后修改容器构建新镜像就变得非常简单了

```sh
# 根据配置文件自动构建镜像
podman build -t node-hello-world .
```

然后可以照常使用这个容器

```sh
# 运行容器
podman run node-hello-world
# 可以覆盖默认的命令
podman run -it node-hello-world bash
# 还可以把主机端口映射到容器端口
podman run -p 3000:3000 express-server
```

### 编排容器

显然像 `podman run -p 3000:3000 express-server` 这样的命令有点长，不仅需要我们记住端口的映射，还需要记住镜像的名字。如果我们的应用要启动非常多个容器，这会很麻烦。因此就有了 `docker compose` 这种工具帮我们管理容器

podman 可以直接使用 `docker-compose`，这也是默认的行为。而 `podman-compose` 在 Windows 环境里好像有点问题

安装 docker-compose 时建议把 docker 也一起安装了

```sh
# Windows
scoop install docker docker-compose
```

一个简单的 `docker-compose.yml` 示例如下，更详细的内容请参考 [Docker 官方文档](https://docs.docker.com/reference/compose-file/)

```yaml
services:
  app:
    image: express-server
    build: .
    ports:
      - 3000:3000
```

有了 `docker-compose.yml` 管理容器就会变得非常轻松

```sh
# 启动服务
podman compose up
# 关闭服务
podman compose down
# 重新构建镜像并启动服务
podman compose up --build
# 后台运行服务
podman compose up -d
# -f 参数可以指定文件
podman compose -f docker-compose.dev.yml up -d
```

### 存储管理

以下命令可以用来管理存储空间

```sh
# 列出存储概览
podman system df
# 列出存储详情
podman system df -v
# 一键清理
podman system prune
```

或者你也可以手动删除指定的容器或镜像

```sh
# 删除指定容器
podman container rm CONTAINER-ID/CONTAINER-NAME
# 删除所有容器
podman container rm --all
# 删除指定镜像
podman image rm IMAGE-ID/IMAGE-NAME
# 删除所有镜像
podman image rm --all
```
