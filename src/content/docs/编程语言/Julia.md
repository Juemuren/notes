---
title: Julia
---

## 环境搭建

我使用 Juliaup + VSCode 搭建开发环境。Juliaup 用于管理运行时版本，VSCode 用于编写代码。也可以使用 Miniforge 获取工具链，这可能更符合科学计算的传统。

### 获取工具链

首先安装 Juliaup

```sh
# Windows
scoop install juliaup
```

然后运行 `julia` 就会自动安装最新的稳定版解释器

或者使用 Miniforge 获取解释器

```sh
# 创建虚拟环境
mamba create -n julia
# 激活环境
mamba activate julia
# 安装最新版的工具链
mamba install julia
# 安装特定版本的工具链
mamba install julia==1.10.4
```

### 编辑器集成

VSCode 上有 Julia 官方扩展 [Julia](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia)，该扩展几乎是开箱即用的，不需要什么额外的设置。
