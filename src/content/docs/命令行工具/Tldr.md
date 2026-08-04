---
title: Tldr
---

## 简介

tldr 是一个友好的命令手册，专门为懒人准备的。

## 对比

获取命令手册的方式非常多，比如

- 命令自带的 `--help` 参数
- UNIX 系统的 `man` 命令，可获取更详细的说明
- 访问官方阅读文档

但某些时候我们只想快点使用工具，懒得去阅读这些东西。tldr 就是为此准备的，它的全称为 _Too Long Don't Read_，即 _太长不看_ 的意思。`tldr` 不会给出详细的文档，而是只给出具体的、简单的示例，可以直接复制下来使用

## 安装

tldr 由数据库和客户端组成。客户端就是一个 CLI 应用，而数据库在 Github 上，会下载部分内容到本地，需要定期更新

原先的 `tldr` 客户端被弃用了，建议安装新的、用 Rust 重写的客户端 `tlrc`

```sh
# Windows
scoop install tldr
# Linux
brew install tlrc
```

这个新客户端的二进制文件名仍然叫 `tldr`，所有用法也都是一样的

## 使用

既然这个工具是为懒人准备的，那么它的使用就应该是简单的

```sh
# 询问怎么使用 git
tldr git
# 询问怎么使用 git submodule
tldr git submodule
```

更新数据库也很简单

```sh
tldr -u
```

当然了，你也可以用 tldr 询问如何使用 tldr

```sh
tldr tldr
```
