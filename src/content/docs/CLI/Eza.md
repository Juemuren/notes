---
title: Eza
---

## 简介

eza 是个文件目录查看工具，类似 `ls`，但更现代

## 对比

eza 相比 ls，我个人认为有如下的优点

- 更好的默认设置。比如 eza 默认输出就是有颜色的，而 ls 还得自己加参数、设别名
- 更丰富的功能。比如 eza 可以打印树状结构、为文件添加图标、与 Git 集成等
- 单一二进制文件，分发和安装都更简单

还有个叫 lsd 的工具，也自称是 ls 的现代替代品。但经过我的简单测试后发现 lsd 比 eza 慢一点，就一直使用后者了

## 安装

```sh
# Windows
scoop install eza
```

## 使用

基本的功能

```sh
# 直接使用
eza
# 包括隐藏文件
eza -a
# 以列表形式呈现
eza -l
# 给列表加个表头
eza -l -h
# 递归查看
eza -R
# 限制递归深度
eza -R -L 3
# 按修改时间排序
eza -s modified
# 按文件大小排序
eza -s size
```

一些更高级的功能

```sh
# 显示图标
eza --icons
# 以树状呈现递归
eza -T
# 显示每个文件的 git 状态
eza -l --git
# 不显示 .gitignore 中的文件
eza --git-ignore
```
