---
title: Delta
---

## 简介

delta 是一个语法高亮分页器，可用于 git/diff 等命令的输出，且可与 Git 集成

## 对比

尽管看上去 delta 类似 diff，但两者区别很大。delta 实际上并没有实现 **比较差异** 这一基本功能，它调用系统已有的 diff 并美化了输出。对比原本的输出，delta 增加了以下功能

- 可以对代码进行高亮，与 bat 同款
- 有多种主题颜色，可以高度定制

## 安装

```sh
# Windows
scoop install delta
```

## 使用

### Git 集成

可以让 git 默认使用 delta 作为语法高亮分页器

```sh
git config --global core.pager delta
```

### 基本使用

比较两个文件的差异

```sh
delta file1 file2
```

把别的命令的输出结果通过管道传给 delta 进行高亮

```sh
rg --json pattern | delta
```

### 修改设置

`git config --global` 同样可以修改 delta 自己的设置。在直接比较两个文件时，同样也会生效。

```sh
# 让差异比较器中可以按 n 和 N 来导航
git config --global delta.navigate true
# 启用并排视图（更像 VSCode 了）
git config --global delta.side-by-side true
```

更多设置可以查阅 [官方文档](https://dandavison.github.io/delta/usage.html)
