---
title: Rust
---

## 环境搭建

我使用 Rustup + VSCode 搭建开发环境。Rustup 用于管理工具链版本，VSCode 用于编写代码。

### 获取工具链

首先安装 Rustup

```sh
# Windows
scoop install rustup
```

然后通过 rustup 获取工具链

```sh
# GNU ABI
rustup toolchain install stable-gnu
# MSVC ABI
rustup toolchain install stable-msvc
# 更改默认工具链
rustup default stable-msvc
```

### 编辑器集成

VSCode 上有 Rust 官方扩展 [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)，该扩展几乎是开箱即用的，不需要什么额外的设置。
