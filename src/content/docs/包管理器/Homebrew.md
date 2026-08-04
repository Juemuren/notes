---
title: Homebrew
---

## 简介

Homebrew 是 macOS 和 Linux 平台的包管理器

## 对比

由于我没用过 macOS，所以只能评价在 Linux 上的体验。

Linux 通常自带 **系统包管理器**，Homebrew 与之有一些显著的区别

- **系统包管理器** 直接在系统环境中全局安装软件，通常都会要求 `root` 权限；而 **Homebrew** 在用户级别安装软件，不会污染系统环境，因此不需要 `sudo`
- **系统包管理器** 为了系统稳定，通常更新并不及时，软件包也并不丰富；而 **Homebrew** 并不考虑这些问题，因此包数量更丰富，版本更新也更快

## 安装

安装的命令就在 [官网主页](https://brew.sh/)

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 配置

安装完成后需要修改 Shell 配置文件

```sh
eval "$(/path/to/brew/bin/brew shellenv)"
```

## 使用

### 基本使用

几乎所有包管理器的基本使用方法都差不多

```sh
# 安装包
brew install fzf
# 更新包
brew upgrade fzf
# 卸载包
brew uninstall fzf
```

稍微高级点的用法

```sh
# 查看所有已安装的包
brew list
# 查看指定安装的包
brew list --installed-on-request
# 搜索包
brew search fzf
# 查看包信息
brew info fzf
# 更新包管理器
brew update
# 清理过时依赖
brew autoremove
# 清理无用的包
brew cleanup
# 查看被哪些包依赖
brew uses zlib --installed
```

运行 `brew commands` 会显示所有的子命令

更复杂的用法建议参考 [官方参考手册](https://docs.brew.sh/Manpage)

### 排查问题

如果使用时遇到了问题，可以运行

```sh
brew doctor
```

然后根据显示的信息修复问题即可
