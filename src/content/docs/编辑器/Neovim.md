---
title: Neovim
---

## 简介

Neovim 是 Vim 的一个分支，旨在提高扩展性和易用性。

## 安装

```sh
# Windows
scoop install neovim
```

## 配置

Neovim 使用 **Lua** 作为配置脚本，如果完整地从头开始配置会比较复杂。建议先使用社区里的优秀配置，有需要再自行调整。

LazyVim 就是一个不错的配置，正如其名，这是一个给懒人用的 Neovim 配置。你可以阅读 [官方文档](https://www.lazyvim.org/installation) 了解如何安装。这套配置功能非常丰富，安装完后建议运行一下 `:LazyHealth`，然后对照着 _WARNING_/_ERROR_ 查看自己本地缺失了哪些工具。之后可以选择通过系统包管理器补上这些工具，或者把不需要的功能给禁用掉。
