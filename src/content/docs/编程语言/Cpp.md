---
title: Cpp
---

## 环境搭建

C++ 有三大编译器 _GCC_、_MSVC_、_CLANG_

- GCC 是 Linux 平台的标准编译器，非常经典和流行，也可以在 macOS/Windows 上使用
- CLANG 是 macOS 平台的标准编译器，功能最全面、体验最现代，同样可以在 Linux/Windows 上使用
- MSVC 是 Windows 平台的标准编译器，只能在 Windows 上使用，且不开源，商业使用需注意许可证

:::note[解释器]

C++ 其实还有解释器 [cling](https://github.com/root-project/cling) 和 clang-repl，其中后者已经包含在 llvm 项目中。

不过二者都不是传统的解释器，而是基于 Clang 前端 + LLVM JIT 增量编译/执行的方式运行。

:::

我使用 MSYS + VSCode 搭建开发环境。MSYS 用于获取工具链，支持使用 GCC/CLANG 编译器，VSCode 用于编写代码。也可以使用 VS 来获取工具链，这个方案支持使用 MSVC/CLANG 编译器。

### 安装工具链

#### MSYS

如果使用 MSYS 获取工具链，请先完成 [MSYS 的安装](../环境管理器/MSYS.md#安装)，然后通过如下命令安装编译器和调试器

```sh
# GCC 工具链
pacman -S mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-gdb
# CLANG 工具链
pacman -S mingw-w64-clang-x86_64-clang mingw-w64-clang-x86_64-lldb
```

:::tip[MSYS 的环境]

MSYS 提供了 UCRT / MINGW / CLANG 多种环境

- 如果使用 GCC 工具链，那么建议使用 UCRT / MINGW 环境。其中 UCRT 更现代，MINGW 更兼容。
- 如果使用 CLANG 工具链，那么建议使用 CLANG 环境。如果在 UCRT/MINGW 环境中安装 CLANG，那么实际上编译的程序还要链接到 GCC 的 C++ 库

详细的区别请阅读 https://www.msys2.org/docs/environments/

另外，如果不需要完整 MSYS 环境的话，也可以使用 `scoop install mingw` 安装 GCC 工具链。

:::

#### VS

如果需要安装 VS 的话，建议只安装 Visual Studio Build Tools。编辑器仍然使用 VSCode。

现在已经可以通过 `winget` 自动安装 VS 了。下面的命令只安装 MSVC 和 Windows SDK，并且尽可能减少了需要确认的弹窗

```pwsh
winget install `
    --id Microsoft.VisualStudio.BuildTools `
    --exact `
    --source winget `
    --disable-interactivity `
    --silent `
    --accept-source-agreements `
    --accept-package-agreements `
    --override "--quiet --wait --norestart --add Microsoft.VisualStudio.Component.VC.Tools.x86.x64 --add Microsoft.VisualStudio.Component.Windows11SDK.26100"
```

- 如果需要添加组件，只需在 `--override` 的参数中写几个类似的 `--add` 就行；也可以把 `--override` 改为 `"--quiet --wait --norestart --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"`，这会安装所有推荐的组件。
- 如果需要修改安装目录，可以在 `--override` 里添加 `--installPath "D:\VS"` 参数。

VS 为了不污染系统环境，需要进入编译环境后才能使用编译器。我不推荐去修改系统的 PATH 变量，而是使用官方提供的脚本进入编译环境。这个脚本一般在 VS 安装目录的 `Common7\Tools\Launch-VsDevShell.ps1` 下。当然，除了使用脚本，官方还提供了快捷方式，且配置了 `Windows Terminal` 的 profile

可以使用 Scoop 创建 shim，方便后续使用

```sh
scoop shim add vs 'path\to\vs\Common7\Tools\Launch-VsDevShell.ps1' '--' -Arch amd64 -HostArch amd64 -SkipAutomaticLocation
```

之后就可以使用 `vs` 来进入编译环境了。你可以输入 `path\to\vs\Common7\Tools\Launch-VsDevShell.ps1 -?` 来查看有关这个脚本的更多信息。

:::tip[MSVC 与 CLANG]

LLVM 项目在 Windows 上发布的 CLANG 工具链默认会链接到 MSVC 的 C++ 库，因此需要先安装 MSVC 才能使用。

可以通过 `scoop install llvm` 获取 CLANG 工具链。使用 CLANG 编译程序时可以不进入 VS 的编译环境。

:::

### 编辑器集成

:::note[官方文档]

官方文档非常不现代，不推荐参考。

- [VSCode + GCC](https://code.visualstudio.com/docs/cpp/config-mingw)
- [VSCode + MSVC](https://code.visualstudio.com/docs/cpp/config-msvc)

:::

#### 配置集成终端

:::caution[环境冲突]

[官方在 GCC 配置教程](https://code.visualstudio.com/docs/cpp/config-mingw#_installing-the-mingww64-toolchain) 中直接修改了 PATH，我认为这不是最好的做法。

虽然这让我们能够不进入 MSYS 环境就使用编译器，但有潜在的环境的冲突的可能。因此这里推荐先 [进入编译环境](../环境管理器/MSYS.md#进入环境) 再进行编译。

:::

如果使用从 MSYS 获取的工具链，请先参考 [MSYS VSCode Terminal](../环境管理器/MSYS.md#vscode-terminal) 配置 VSCode 集成终端。

作为示例，按 `Ctrl + Shift + P` 输入 VSCode 命令 `Preferences: Open User Settings (JSON)`，然后在打开的配置文件 `settings.json` 中加入如下配置，并把 `${env:MSYS_ROOT}` 换成本机 MSYS 的安装路径

```json
{
    "terminal.integrated.profiles.windows": {
        "MSYS UCRT": {
            "path": "${env:MSYS_ROOT}/usr/bin/bash.exe",
            "args": ["--login", "-i"],
            "env": {
                "CHERE_INVOKING": "1",
                "MSYSTEM": "UCRT64",
                "MSYS2_PATH_TYPE": "inherit"
            }
        }
    }
}
```

最后，再输入 VSCode 命令 `Create New Terminal (With Profile)`，打开刚才配置的终端并运行

```sh
gcc --version
g++ --version
gdb --version
```

只要能够正确输出版本号，那么就完成配置了。之后的编译和调试都可以在这个终端里进行。如果不会使用 `gcc` / `g++` / `gdb` 这些工具，可以添加参数 `--help` 获取帮助或者上网查询。

如果使用基于 MSVC 的工具链，那么同样也可以配置个终端。首先还是打开 VSCode 的 `settings.json`，然后加入如下配置，并把 `${env:VS_ROOT}` 换成本机 VS 的安装路径

```json
{
    "terminal.integrated.profiles.windows": {
        "VS Pwsh": {
            "path": "pwsh.exe",
            "args": [
                "-NoExit",
                "-File",
                "${env:VS_ROOT}/Common7/Tools/Launch-VsDevShell.ps1",
                "-Arch",
                "amd64",
                "-HostArch",
                "amd64",
                "-SkipAutomaticLocation"
            ]
        }
    }
}
```

最后同样打开刚才配置的终端，运行

```pwsh
cl -?
```

只要能够正确输出使用手册，那么就完成配置了。之后的编译和调试都可以在这个终端里进行。

#### 配置语言服务

:::caution[C/C++ 与 Clangd]

[官方文档](https://code.visualstudio.com/docs/cpp/config-mingw#_installing-the-mingww64-toolchain) 使用扩展 [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)，但目前更好用的扩展是 Clangd。

当然这里官方不太可能修改，因为 C/C++ 扩展是 Microsoft 自己做的。

:::

需要安装扩展 [Clangd](https://marketplace.visualstudio.com/items?itemName=llvm-vs-code-extensions.vscode-clangd)

此时打开一个 C/C++ 文件，如果 PATH 里没有二进制程序 `clangd` 的话，扩展会弹窗要求下载。只要点击按钮即可开始下载。下载完成后就可以使用语言服务了。

#### 配置图形化调试

现在其实已经可以在终端里使用 `gdb ./main` / `lldb ./main` 命令来调试程序了。但如果想通过图形化的方式来调试代码，那么还需要进行配置。

首先需要安装扩展 [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)

然后根据扩展的 [使用手册](https://github.com/vadimcn/codelldb/blob/master/MANUAL.md) 配置调试任务。

作为示例，在 `.vscode/launch.json` 文件中添加如下配置，并把 `build/main` 换成需要调试的二进制程序路径

```json
{
    "name": "Launch",
    "type": "lldb",
    "request": "launch",
    "program": "${workspaceFolder}/build/main"
}
```

然后在源代码中需要的地方打上断点，接着按 `Ctrl + Shift + D` 或者点击左侧的运行与调试按钮，在上方选择刚才配置的任务并点击运行按钮，即可开始调试。

## 命令行工具

### 包管理器

C++ 的包管理生态非常乱，没有官方标准，取而代之的是各种第三方包管理器

:::note[C++ 包管理器与系统包管理器]

由于历史原因，许多 C/C++ 的包也能用系统包管理器管理。

不过现代项目不推荐这么做。

:::

- [Vcpkg](../包管理器/Vcpkg.md)
- conan
- [Xrepo](../包管理器/Xmake.md) Xmake 自带的包管理器，因此放到了 Xmake 的章节中

### 构建系统

C++ 的构建系统同样因没有官方标准而存在各种第三方实现

:::note[C++ 构建系统的双层架构]

由于历史原因，现代的 C++ 构建系统通常由两部分组成

- **构建系统**，用于声明文件之间的依赖和具体的构建命令
- **元构建系统**，提供了更高级的抽象，用于生成构建系统

一些新兴的 C++ 构建系统正在尝试使用 **一体化** 的架构

:::

- Make 构建系统，特点是灵活，适合小型项目
- Ninja 构建系统，特点是快，更适合作为元构建系统的后端
- CMake 元构建系统，事实上的标准，但语法极度丑陋
- Meson 元构建系统，使用 DSL 定义构建，支持包括 C++ 在内的多种语言
- [Xmake](../包管理器/Xmake.md) 一体化构建系统，结合了包管理、项目管理等功能，尝试解决 C++ 的诸多痛点

### 静态检查和格式化

- clang-tidy 静态检查
- clang-format 格式化

### 内存分析

- drmemory
- valgrind 只有 linux 可用

## 库和框架

### 通用库

- boost 标准库增强

### 测试框架

- benchmark 基准测试框架
- gtest 单元测试框架
