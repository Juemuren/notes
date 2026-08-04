---
title: Markdownlint
---

## 简介

markdownlint 一个 Markdown 静态检查工具，包含数十条可定制的规则

## 对比

markdownlint 有 NodeJS、Ruby 等多种实现，个人更喜欢 Rust 实现 rumdl，主要优点有

- 速度更快
- 功能更丰富
- 单文件分发，安装 CLI 更方便

## 安装

CLI

```sh
# Windows
scoop install rumdl
```

VSCode 扩展

```sh
code --install-extension rvben.rumdl
```

## 使用

> [!note] rumdl
> 后文只介绍 [rumdl](https://github.com/rvben/rumdl) 的用法。对于其余实现，使用方法是类似的。

查看规则

```sh
# 查看所有规则
rumdl rule
# 查看单条规则的详细解释
rumdl explain MD060
```

配置

```sh
# 初始化配置
rumdl init
# 导入 markdownlint 配置
rumdl import .markdownlint.json
rumdl import .markdownlint.yaml
```

检查和修复

```sh
# 运行检查
rumdl check .
# 修复问题
rumdl fmt .
```
