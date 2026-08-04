---
title: CUDA
---

## 环境搭建

搭建 CUDA 开发环境必须得有 NVIDIA 显卡。毕竟程序是跑在 GPU 上的，在搭建环境之前得先确认硬件是否满足条件

目前我使用 Miniforge + VSCode 来搭建开发环境，Miniforge 用于获取工具链，VSCode 用于编写代码。

### 获取工具链

> [!warning] Windows 的先决条件
> 根据 [官方文档](https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html)，在 Windows 上必须得安装 Visual Studio，无法使用别的编译器。NVIDIA 似乎并没有支持 MinGW 的打算。

首先你应该确认自己显卡驱动的版本。可以通过运行如下命令查看

```sh
nvidia-smi
```

然后创建、激活一个虚拟环境，并安装工具链

```sh
# 创建虚拟环境
mamba create -n cuda
# 激活环境
mamba activate cuda
# 安装最新版的工具链，conda-forge 渠道的更新没有 nvidia 官方渠道及时
mamba install nvidia::cuda-toolkit
# 安装指定版本的工具链
mamba install nvidia::cuda-toolkit==12.9.1
```

### 编辑器集成

VSCode 上有 NVIDIA 的官方 CUDA 扩展 [Nsight Visual Studio Code Edition](https://marketplace.visualstudio.com/items?itemName=NVIDIA.nsight-vscode-edition)

该扩展是开箱即用的，没有任何设置。不过由于 CUDA 实际上只是扩展了 C++ 的语法，因此你还需要 [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) 这个扩展。后者已经作为依赖被一起安装了，但它还需要一点配置。通常修改 `.vscode/c_cpp_properties.json` 文件中的 `compilerPath` 字段就行了

```json
{
  "configurations": [
    {
      // ...
      "compilerPath": "path\\to\\miniforge3\\envs\\cuda\\Library\\bin\\nvcc.exe"
      // ...
    }
  ],
  "version": 4
}
```
