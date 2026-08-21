---
title: Conda
---

## 简介

Conda 是一个多语言的 **环境管理** 和 **包管理** 器

Conda 会创建一些互相隔离的虚拟环境，可以激活不同的虚拟环境并在其中安装软件包，这避免了全局安装导致的环境冲突。虚拟环境本身在系统中是全局存储的，因此可以在不同的项目中复用相同的环境。

## 对比

### miniforge

[Miniforge 对比其它项目](https://conda-forge.org/docs/user/introduction/)

Conda 有多种实现，比如 _Miniforge_ 和 _Anaconda_，个人更推荐使用前者

- 优势
  - 默认提供了更快速的包管理器 `mamba`，兼容所有常用的 `conda` 命令。当然 `conda` 在 _Miniforge_ 里也是可用的
  - 默认使用 `conda-forge` 渠道下载，这是社区维护的包渠道，包数量更多、包更新更及时、平台支持更丰富，且完全不用担心许可协议的问题
  - `base` 环境非常干净，只有包管理程序运行所需的组件
- 劣势
  - 默认不安装 `Anaconda Navigator`，无法以可视化的方式使用包管理器

### pixi

另外 [pixi](Pixi.md) 也是一个基于 Conda 生态的环境管理器，采用了和 Conda 完全不同的架构，用户体验更好。如果只是需要利用 Conda 生态的话，非常建议尝试一下。

## 安装

不建议用 scoop 安装。推荐使用 [官方的安装脚本/程序](https://conda-forge.org/download/)。

Windows 版本的安装程序会提供一个图形界面，按照指示安装即可。可以修改安装路径，其余选项使用默认的就行

## 初始化和设置

### Shell 集成

Conda 通过修改 **PATH** 来激活不同的虚拟环境，因此需要与 Shell 集成后才能正常使用。

在 Windows 上使用默认选项安装完 _Miniforge_ 后应该会有一个快捷方式，按下 `win` 后输入 `miniforge` 就能找到。该快捷方式会启动一个激活了 `base` 环境的 Shell，输入以下命令即可与 Shell 集成

> [!tip] 找不到快捷方式
> 如果你没有这个快捷方式，可以使用以下命令，效果是一样的
>
> ```pwsh
> # 将 path\to\miniforge3 替换为你的安装路径
> path\to\miniforge3\condabin\conda.bat init powershell
> path\to\miniforge3\condabin\mamba.bat shell init
> ```

```sh
# conda 的 powershell 集成
conda init powershell
# conda 的 bash 集成
conda init bash
# mamba 的 shell 集成
mamba shell init
```

> [!caution] 启动速度
> 启用 Shell 集成后，Shell 的启动文件中会添加上一些命令。
>
> 如前所述，`conda` 由于使用 **Python** 实现，速度比较慢，执行这些命令要很长时间，会拖慢 Shell 的启动。我在自己的机器上测试，conda 集成后每次启动 Shell 大概要多花费 _2_ 秒左右；而 `mamba` 由于用 **C++** 实现，会快很多，大概只花了 _0.2_ 秒。因此 `conda` 和 `mamba` 二者只需集成一个，并且最好选择后者，这样能节省一点时间。

重启 shell 并测试是否成功

```sh
conda --version
mamba --version
```

### 修改设置

```sh
# 禁止自动激活 base
mamba config set auto_activate_base false
# 如果使用了别的 prompt 美化工具，可以禁止 conda 修改 prompt
mamba config set changeps1 false
# 列出包时显示 url
mamba config set show_channel_urls true
```

### 编辑器集成

为了让 VSCode 识别到 Conda 环境，可能需要修改一些编辑器的设置。

打开 VSCode，按下 `ctrl + ,`，然后输入 `conda` 会看到一个叫 `Python: Conda Path` 的设置，在里面填写 conda 可执行文件的路径。你可以在激活了 `base` 环境的 shell 里运行 `where.exe conda` 来获取路径。

或者可以直接修改 VSCode 的 `settings.json` 文件

```json
{
  "python.condaPath": "path\\to\\miniforge3\\condabin\\conda.bat"
}
```

## 使用

后文统一使用 `mamba`。对于常用的命令，`conda` 和 `mamba` 用法几乎完全相同

### 基本使用

```sh
# 列出创建的环境
mamba env list
# 创建名为 example 的新环境，并带有 python 3.12 运行时
mamba create -n example python=3.12
# 激活 example 环境
mamba activate example
# 在激活的环境中安装包
mamba install ipykernel numpy matplotlib pandas
# 在激活的环境中移除包
mamba remove pandas
# 升级 mamba 自身
mamba update -n base -c conda-forge mamba
```
