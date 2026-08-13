---
title: Bat
---

## 简介

bat 是一个显示文件内容的工具，类似 `cat`

## 对比

相比 `cat`，bat 是个更现代的工具

- 支持对大量编程和标记语言进行语法高亮
- 可以和 git 集成，显示索引的修改

## 安装

```sh
# Windows
scoop install bat
```

## 使用

基本上所有 cat 能做的事 bat 都能做，并且可以做得更好

你可以在 [官网](https://github.com/sharkdp/bat?tab=readme-ov-file#how-to-use) 找到非常多的示例

比如这里有些比较好理解的示例

```sh
# 显示单个文件
bat example.md
# 显示多个文件
bat src/*.rs
# 显示并突出非打印字符
bat -A example.md
# 禁止自动分页
bat -P example.md
# 设置语言高亮
bat --language=cpp example.cpp
# 设置样式
bat --style=grid example.md
```

bat 集成了分页功能，且支持手册的高亮。也就是说我们可以用 bat 来阅读手册

```sh
# 用 bat 读 upx 的手册
upx --help | bat -p -l man
# 用 bat 读 fzf 的手册
fzf --man | bat -p -l man
```

Windows 则存在一些问题。首先 fzf 的手册得先用 mandoc 转换一下，然后 bat 读取这个文件也有部分字符未正确转义。因此用 less 阅读算是最好的选择了

```sh
fzf --man | mandoc > fzf.man
less fzf.man
```
