---
title: Cpp
---

## 环境搭建

C++ 有三大编译器 _GCC_、_MSVC_、_CLANG_

- GCC 是 Linux 平台的标准编译器，非常经典和流行，也可以在 macOS/Windows 上使用
- CLANG 是 macOS 平台的标准编译器，功能最全面、体验最现代，同样可以在 Linux/Windows 上使用
- MSVC 是 Windows 平台的标准编译器，只能在 Windows 上使用，且不开源，商业使用需注意许可证

> [!note] 解释器
> C++ 其实还有个解释器 Cling，不过不推荐拿这个来搭建环境，也许初学时可以用一用。在 Windows 上该工具可通过 Conda 获取，但似乎不太稳定；建议在 Linux 系统里尝试。

我使用 MSYS + VSCode 搭建开发环境。MSYS 用于获取工具链，支持使用 GCC/CLANG 编译器，VSCode 用于编写代码。也可以使用 VS 来获取工具链，这个方案支持使用 MSVC/CLANG 编译器。

### 安装工具链

#### MSYS

如果使用 MSYS 获取工具链，请先完成 [MSYS 的安装](../EM/MSYS.md#安装)，然后通过如下命令安装编译器和调试器

```sh
pacman -S mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-gdb
```

> [!tip] MSYS 的 CLANG
> 如果想使用 CLANG 编译器，那么建议在 CLANG64 环境中获取工具链，这样全套工具链都是 CLANG 的。而如果在 UCRT64/MINGW64 环境中安装 CLANG，那么实际上编译的程序还要链接到 GCC 的 C++ 库
>
> ```sh
> # CLANG64 环境
> pacman -S mingw-w64-clang-x86_64-clang mingw-w64-clang-x86_64-lldb
> # UCRT64 环境
> pacman -S mingw-w64-ucrt-x86_64-clang mingw-w64-ucrt-x86_64-lldb
> # MINGW64 环境
> pacman -S mingw-w64-x86_64-clang mingw-w64-x86_64-lldb
> ```

#### VS

很多工具并不支持 MinGW 编译器，比如 CUDA 和 node-gyp ~~原因可能是 MSVC 和 GCC 的 ABI 不兼容，或者存在一些商业因素~~ 。因此尽管我并不喜欢 MSVC，但有些时候确实不得不使用。

如果需要安装 VS 的话，建议只安装生成工具，然后使用 VSCode 作为编辑器。在 [下载页面](https://visualstudio.microsoft.com/downloads/) 找到 `Visual Studio 2022 生成工具`，安装工具时勾选 `使用 C++ 的桌面开发`。右侧选项中可以先只保留 `MSVC` 和 `Windows SDK`，到时候缺什么再补什么就行。

VS 为了不污染系统环境，需要进入编译环境后才能使用编译器。我不推荐去修改系统的 PATH 变量，而是使用官方提供的脚本进入编译环境。这个脚本一般在 VS 安装目录的 `Common7\Tools\Launch-VsDevShell.ps1` 下。当然，除了使用脚本，官方还提供了快捷方式并配置好了 `Windows Terminal` 的 profile

可以使用 Scoop 让脚本更易用。命令大概是这样

```sh
# 创建脚本别名
scoop shim add vs 'path\to\vs\Common7\Tools\Launch-VsDevShell.ps1'
# 或者添加一些默认的参数
scoop shim add vs 'path\to\vs\Common7\Tools\Launch-VsDevShell.ps1' '--' -Arch amd64 -HostArch amd64
```

之后就可以使用 `vs` 来进入编译环境了。如果你没有在脚本中添加默认参数的话，启动时记得指定 `-Arch` 和 `-HostArch`，因为默认值是 _x86_ 而非 _amd64_。你可以输入 `vs -?` 来查看有关这个脚本的更多信息。

> [!tip] MSVC 与 CLANG
> 如果想使用 CLANG 编译器，那么首先应该确定已经安装了 MSVC 编译器，然后可以通过 `scoop install llvm` 获取 CLANG 编译器。编译程序时可以不进入 VS 的编译环境，CLANG 编译器会处理这些繁琐的事情。此时 CLANG 会默认链接到 MSVC 的 C++ 库，因为在 Windows 上这样兼容性最好。

### 编辑器集成

> [!note] 官方文档
> 后面的教程以 **GCC** 为例。MSVC 与 VSCode 集成的方法应该也差不多。虽然如此，还是建议参考官方文档。
>
> - [VSCode + GCC](https://code.visualstudio.com/docs/cpp/config-mingw)
> - [VSCode + MSVC](https://code.visualstudio.com/docs/cpp/config-msvc)

#### 修改环境变量

> [!warning] 环境冲突
> 尽管 [官方文档](https://code.visualstudio.com/docs/cpp/config-mingw#_installing-the-mingww64-toolchain) 这么干了，但我仍然认为修改 _PATH_ 变量可能不是最好的做法。
>
> 虽然这让我们能够不进入 MSYS 环境就使用编译器，但有潜在的环境的冲突的可能。最好还是 [进入编译环境](../EM/MSYS.md#进入环境) 后再进行编译。不过这样配置任务会比较麻烦，你可能需要参考 [配置自定义任务指南](https://code.visualstudio.com/docs/debugtest/tasks#_custom-tasks)，或者不使用任务，而是在 VSCode 的集成终端里进入 MSYS 环境，然后手动执行命令。
>
> 如果你不在意这些，只希望怎么简单怎么来，那么可以继续参考之后的步骤。

把编译器所在的目录添加到系统 _PATH_ 变量中

- 对于 **UCRT64** 中的编译器，路径为 `path\to\msys2\ucrt64\bin`
- 对于 **CLANG64** 中的编译器，路径为 `path\to\msys2\clang64\bin`

然后输入 `gcc --version` 或 `clang --version` 测试是否成功。

> [!tip] 环境变量未更新
> 如果你在 VSCode 的集成终端中输入以上命令时报错，这可能是因为 _PATH_ 变量并没有及时更新。你可以运行 `echo $env:PATH` 看看是不是这样。若确实如此，你可能需要重启一下 VSCode 而不仅仅是重启终端，从而让编辑器重新读取环境变量。

#### 配置智能感知

需要安装扩展 [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

输入 VSCode 命令 `C/C++: Edit Configurations`，调整需要的设置。会自动在 `.vscode/c_cpp_properties.json` 中生成配置文件，当然你也可以手动修改该文件

配置出 `c_cpp_properties.json` 文件后，就可以使用语言服务了。

#### 配置调试任务

同样需要扩展 [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

新建一个 `test.c` 或 `test.cpp` 文件，然后输入 VSCode 命令 `C/C++: Add Debug Configuration`，选择 `C/C++` 扩展的默认配置模板。然后会在 `.vscode` 目录下自动生成配置文件。

自动生成了 `tasks.json` 和 `launch.json` 文件后，就可以直接点击按钮来编译、运行和调试了。

当然，这些配置文件也可以自己手动更改。有关这些配置文件的更多信息，请参考

- [任务配置](https://code.visualstudio.com/docs/debugtest/tasks)
- [调试配置](https://code.visualstudio.com/docs/debugtest/debugging-configuration)

## 命令行工具

### 包管理器

C++ 的包管理生态非常乱，没有官方标准，取而代之的是各种第三方包管理器

> [!note] C++ 包管理器与系统包管理器
> 系统包管理器也能管理 C/C++ 的包。不过现代项目不推荐使用系统包管理器，因为很难跨平台协作

- [Vcpkg](../PM/Vcpkg.md)
- conan
- [Xrepo](../PM/Xmake.md) Xmake 自带的包管理器，因此放到了 Xmake 的章节中

### 构建系统

C++ 的构建系统同样因没有官方标准而存在各种第三方实现

> [!note] C++ 构建系统的双层架构
> 由于历史原因，现代的 C++ 构建系统通常由两部分组成
>
> - **构建系统**，用于声明文件之间的依赖和具体的构建命令
> - **元构建系统**，提供了更高级的抽象，用于生成构建系统
>
> 当然也有一些新兴的 C++ 构建系统尝试使用 **一体化** 的架构

- Make 构建系统，特点是灵活，适合小型项目
- Ninja 构建系统，特点是快，更适合作为元构建系统的后端
- CMake 元构建系统，事实上的标准，但语法极度丑陋
- Meson 元构建系统，使用 DSL 定义构建，支持包括 C++ 在内的多种语言
- [Xmake](../PM/Xmake.md) 一体化构建系统，结合了包管理、项目管理等功能，尝试解决 C++ 的诸多痛点

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
