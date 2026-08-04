---
title: WSL
---

## 简介

WSL 是 Windows 下的 Linux 子系统，提供了原生而非移植的 Linux 环境。

WSL 在虚拟机里运行 Linux 内核，因此理论上所有 Linux 能运行的软件 WSL 都能运行。

## 安装

[官方安装教程](https://learn.microsoft.com/windows/wsl/install)

在较新的 Windows 机器上安装 WSL 非常简单

```sh
# 下载默认的发行版
wsl --install
# 下载特定的发行版
wsl --install Ubuntu-24.04
```

WSL 提供了多种 Linux 发行版，一般来说选择 Ubuntu 就行

```sh
# 查看所有可下载的发行版
wsl -l -o
# 查看目前已下载的发行版
wsl -l -v
```

## 使用

WSL 使用起来也非常简单

```sh
# 启动特定的发行版
wsl -d Ubuntu-24.04
# 将发行版设为默认值
wsl --set-default Ubuntu-24.04
# 终止所有正在运行的虚拟机
wsl --shutdown
```

WSL 还有更高级的用法，比如可以像 `sh` 一样执行单条命令

```sh
# 用默认发行版运行命令
wsl date
# 可以添加参数
wsl uname -a
```

## 设置

### 网络代理

WSL 本质上是个虚拟机，而虚拟机的网络连接方式略微有点复杂，尤其是在宿主机使用了网络代理工具的情况下。

> [!caution] Clash 的问题
> 在 WSL 里使用 Clash 这类本地代理软件，会遇到 `localhost` 域名映射的问题。解决方法主要有两种
>
> 1. 将网络模式设为 `Mirrored`。此时可能产生错误代码 `CreateInstance/CreateVm/ConfigureNetworking/0x8007054f`，在 [WSL issues#12351](https://github.com/microsoft/WSL/issues/12351) 上有很多人讨论这一问题
> 2. 修改系统代理设置，将代理主机改为局域网地址，而不是 `localhost`/`127.0.0.1` 这类本机地址

我目前的解决方案是使用 Steamcommunity_302。由于我在 WSL 里遇到的网络问题大多和 Git 有关，因此补充了相关配置

1. 下载 [Steamcommunity_302](https://www.dogfight360.com/blog/?s=Steamcommunity_302)
2. 复制 SSL 证书到自定义的位置

   ```sh
   mkdir -p ~/.certs
   cat /etc/ssl/certs/ca-certificates.crt > ~/.certs/git-ca-bundle.crt
   ```

3. 追加 Steamcommunity_302 的根证书

   ```sh
   print "\n# Steamcommunity_302\n" >> ~/.certs/git-ca-bundle.crt # 可选，添加一些说明
   cat /path/to/Steamcommunity_302/steamcommunityCA.pem >> ~/.certs/git-ca-bundle.crt
   ```

4. 修改 git 的证书位置

   ```sh
   git config --global http.sslCAInfo ~/.certs/git-ca-bundle.crt
   ```

5. 在 Windows 文件系统中运行 Steamcommunity_302，然后 WSL 里就可以正常使用 Git 了

> [!caution] Steamcommunity_302 的问题
> Steamcommunity_302 并没有开。如果介意，建议还是使用 Clash。
