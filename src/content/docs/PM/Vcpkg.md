---
title: Vcpkg
---

## 简介

Vcpkg 是一个 C/C++ 的包管理器，与 CMake 的集成度很高。

## 对比

[vcpkg 与其它包管理器的比较](https://learn.microsoft.com/vcpkg/get_started/overview#vcpkg-compared-to-other-package-managers)

`vcpkg` 不同于 **系统包管理器**，建议与之配合使用，因为二者 **优势区间** 不同

1. 优势
   - 项目级别的环境隔离，不影响系统环境，减少了环境冲突的问题
   - 清单文件 `vcpkg.json` 让依赖项更清晰，且可以 `vcpkg install` 一步完成所有依赖的安装
   - 方便了跨平台的协作，减少了 `在我的机器上可以运行` 这类问题
2. 劣势
   - 要写 `CMakePresets.json`，小型项目和个人项目不如系统包管理器方便

## 安装

[官方的安装方式](https://learn.microsoft.com/vcpkg/get_started/get-started#1---set-up-vcpkg)

```sh
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg && ./bootstrap-vcpkg.sh
export VCPKG_ROOT=/path/to/vcpkg
export PATH=$VCPKG_ROOT:$PATH
```

或者使用 scoop 安装

```sh
scoop install vcpkg
```

## 使用

[官方入门手册](https://learn.microsoft.com/vcpkg/get_started/get-started#3---add-dependencies-and-project-files)

### 新建清单

```sh
vcpkg new --application
```

### 添加依赖

```sh
vcpkg add port <package-name>
```

该步骤仅仅将依赖添加到清单文件中，并没有安装依赖

### 安装依赖

```sh
vcpkg install --triplet=<target-triplet> --host-triplet=<host-triplet>
```

或者提前设置 `VCPKG_DEFAULT_HOST_TRIPLET` 和 `VCPKG_DEFAULT_TRIPLET` 环境变量，作为默认主机 triplet 和默认目标 triplet。有了环境变量后就只需运行 `vcpkg install` 即可

该命令会将文件安装到 `vcpkg_installed`

### 构建项目

此步骤最好与 **CMake** 结合使用

`CMakelists.txt` 按照正常情况写就行，就好像包安装在系统里

但相比系统包管理器，使用 `vcpkg` 要多写一个预设文件 `CMakePresets.json`

```json
{
  "version": 2,
  "configurePresets": [
    {
      "name": "vcpkg",
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/build",
      "cacheVariables": {
        "CMAKE_TOOLCHAIN_FILE": "$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake",
        "VCPKG_HOST_TRIPLET": "x64-mingw-dynamic",
        "VCPKG_TARGET_TRIPLET": "x64-mingw-static",
        "CMAKE_BUILD_TYPE": "Debug"
      }
    }
  ]
}
```

构建项目时的 `TARGET`、`HOST` 可以和安装依赖时的不同。因此 `vcpkg` 会重新完整地编译一遍依赖。此时文件会存放在 `build/vcpkg_installed` 中。

如果要和别人协作，一些与具体环境有关的配置最好写到 `CMakeUserPresets.json` 里。该文件里的配置可以继承 `CMakePresets.json` 里的预设并修改。

```json
{
  "version": 2,
  "configurePresets": [
    {
      "name": "default",
      "inherits": "vcpkg",
      "environment": {
        "PATH": "path/to/msys2/ucrt64/bin;path/to/msys2/usr/bin;$penv{PATH}",
        "VCPKG_ROOT": "path/to/vcpkg"
      }
    }
  ]
}
```

在版本控制系统中，通常要把 `CMakeUserPresets.json` 文件忽略。因为每个人环境不同，需要编写自己的预设来覆盖一些默认值。

如果使用 VSCode，那么可以下载 [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) 扩展。这样就可以使用 _GUI_，在面板中选择预设并点击生成按钮来构建项目。如果找不到自己写的预设，可能需要重启一下 VSCode。

如果不使用 VSCode 扩展而只使用命令行，那么应该运行如下命令

```sh
# 使用预设
cmake --preset=default
# 构建项目
cmake --build build
```

之后可执行文件会保存在 `build` 目录里。

更多信息请查阅官方文档 [cmake-presets](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html)
