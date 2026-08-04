---
title: Pixi
---

## 简介

Pixi 是一个快速、现代且可复现的包管理和环境管理工具。

Pixi 基于 Conda 生态，同时也兼容 PyPI 生态。

## 对比

由于 pixi 功能非常丰富，因此有很多工具与其功能存在重叠

### conda

`conda`/`mamba` 是重叠程度最大的，pixi 对前者进行了很多改进

- 实现上，pixi 使用 Rust；而 conda/mamba 分别使用 Python 和 C++
- 功能上，pixi 添加了很多特性，比如锁文件、项目级管理、任务运行、用链接节省磁盘空间、安装全局工具等

更详细的区别可阅读 [官方对比](https://pixi.prefix.dev/latest/switching_from/conda/)

可以说 pixi 就是 conda 的现代版本。

### uv

`uv` 和 pixi 都可以管理 Python 项目。详细差别可阅读 [官方对比](https://pixi.prefix.dev/latest/switching_from/uv/)

个人认为，二者最大的区别就是 pixi 适合跨语言的依赖管理，而这些主要涉及和科学计算相关的库。对于没有跨语言依赖的 Python 项目，uv 也许更合适。

### mise

`mise` 和 pixi 都可以管理全局工具的安装

- pixi 目前只支持 Conda 生态，还未兼容 PyPI 包
- mise 则同时兼任了 Conda 和 PyPI 以及 [一众后端](https://mise.jdx.dev/dev-tools/backends/)

## 安装

```sh
# Windows
scoop install pixi
```

Scoop 这一安装方式没有把全局工具所在的目录加到 _PATH_ 中，其位置默认为 `~/.pixi/bin`，可以手动修改，或者使用我的 [bucket](https://github.com/Juemuren/ScoopBucket)

## 配置

环境变量 `PIXI_HOME` 决定了 pixi 会把数据保存在哪里

## 使用

pixi 的功能相当多，[Basic Usage](https://pixi.prefix.dev/latest/getting_started/) 上列举了 pixi 的所有功能

### 项目依赖

相比 conda/mamba，pixi 最大的改进就在项目管理上

```sh
# 新建项目
pixi init example
cd example
# 添加 conda 依赖
pixi add numpy matplotlib
# 添加 pypi 依赖
pixi add --pypi httpx
# 移除依赖
pixi remove numpy
# 更新依赖
pixi update numpy
# 列出依赖
pixi list
# 查看依赖树
pixi tree
# 更新锁文件
pixi lock
# 展示项目信息
pixi info
```

此外还可以直接修改项目根目录的 `pixi.toml` 文件，比如

```toml
[pypi-dependencies]
torch = { version = ">=2.12.0", index = "https://download.pytorch.org/whl/cu132" }
torchvision = { version = "*", index = "https://download.pytorch.org/whl/cu132" }

[dependencies]
python = "=3.13"
numpy = ">=2.4.6"
matplotlib = ">=3.10.9"
```

然后安装或者重新安装依赖

```sh
# 安装环境
pixi install
# 重装环境
pixi reinstall
```

### 环境管理

pixi 从 Conda 中继承了环境的概念，不过做了些改进让其更好用

pixi 的环境分为项目环境和全局环境。对于项目环境，可以直接用其改变 shell 环境

```sh
# 启动一个注入了项目环境的 shell 实例
pixi shell
# 在当前 pwsh 中激活环境
pixi shell-hook | Out-String | Invoke-Expression
# 在当前 bash/zsh 中激活环境
eval "$(pixi shell-hook)"
# 在当前 fish 中激活环境
pixi shell-hook | source
```

或者直接在项目环境中运行命令

```sh
# 在项目环境中运行命令
pixi run python main.py
# 或者先添加任务
pixi task add hello "python main.py"
# 然后在项目环境中运行任务
pixi run hello
```

以及删除环境

```sh
# 删除当前项目中的环境
pixi clean
```

pixi 还可以在一个项目中存在多个环境，参考 [官方文档 - 多重环境](https://pixi.prefix.dev/latest/workspace/multi_environment/)

对于全局环境，阅读下面的 [全局工具](#全局工具) 这节

### 全局工具

> [!caution] 暂不支持 PyPI 包
>
> 全局环境目前仅支持安装 Conda 包，对 PyPI 的支持进度可追踪 [pixi issues#2261](https://github.com/prefix-dev/pixi/issues/2261)
>
> 更多内容请参考 [官方文档](https://pixi.prefix.dev/latest/global_tools/introduction/)

全局环境可以创建、修改和删除，但无法激活。因此其并不完全等同于 Conda 的环境

```sh
# 创建 jupyter 环境并安装 nbconvert
pixi global install --environment jupyter --expose jupyter nbconvert
# 暴露 jupyter 环境中的 jupyter 二进制文件到路径中
pixi global expose add --environment jupyter jupyter
# 在 jupyter 环境里继续添加 numpy 和 matplotlib 依赖
pixi global add --environment jupyter numpy matplotlib
# 删除 jupyter 环境
pixi global uninstall jupyter
```

pixi 有一个全局环境的清单文件，也可以直接修改这个文件并自动进行同步

```sh
# 修改全局环境清单文件
pixi global edit
# 同步全局环境清单文件
pixi global sync
```

除此之外全局环境还有别的功能

```sh
# 列出所有全局环境
pixi global list
# 列出 jupyter 环境中的所有依赖
pixi global list --environment jupyter
# 查看 jupyter 环境中的依赖树
pixi global tree --environment jupyter
```
