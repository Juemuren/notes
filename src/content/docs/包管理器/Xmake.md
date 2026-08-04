---
title: Xmake
---

## 简介

Xmake 是一个现代的 C/C++ 构建工具。因为 Xmake 自带了一个包管理器 Xrepo，所以放到了包管理器章节

## 对比

Xmake 尝试解决 C/C++ 的一大痛点：**包管理生态破碎**。C/C++ 有很多包管理器，除了系统包管理器外，还有 _Vcpkg_ 和 _Conan_ 等包管理器。Xmake 能够重用 Vcpkg/Conan 的生态，同时它也有自己的包生态。

Xmake 还尝试解决 C/C++ 的又一大痛点：**构建系统语法混乱**。尽管 _CMake_ 成了事实上的标准，但很多人嫌弃 CMake，主要是 CMake 的语法太丑陋了。而别的工具通常也使用 DSL，需要额外的学习成本。而 Xmake 没有弄出新的语法，它使用 Lua 来编写构建文件。Lua 语法很简单，即使没有相关基础也能快速上手。

Xmake 还还尝试解决 C/C++ 的又又一大痛点：**包管理器和构建系统的松散耦合**。尽管这让用户可以自由地分别选择 _包管理器_ 和 _构建系统_，在某些时候算是优点，但也确实造成了体验上的割裂，因为需要自己手动把这两坨糊在一起。现代语言很少有这种情况。Xmake 通过自带包管理器，尝试改善这一情况。

Xmake 还还还试图解决 C/C++ 的又又又一大痛点 ~~C/C++ 的痛点实在是太多了~~ ：**工具链不统一**。C/C++ 的实现非常多，除了常见的 GCC、CLANG、MSVC 外，还有 MinGW、TinyC、SDCC 等。Xmake 可以通过简单的命令快速切换工具链进行构建，无需手动设置非常复杂的环境变量。

当然 Xmake 也有缺点。现代工具的共同点就是年轻，尽管理念先进，但相应的生态并不成熟。Xmake 想要完全取代老牌构建工具 CMake，可能还需要很长的时间。新的、简单的、没有复杂依赖的项目，可以试试使用 Xmake。

## 安装

```sh
# Windows
scoop install xmake
```

## 使用

### 基本使用

```sh
# 新建项目
xmake create hello
# 进入项目
cd hello
# 构建
xmake
# 运行
xmake run
# 以调试模式构建
xmake config -m debug
xmake
# 调试
xmake run -d hello
```

### 切换工具链

[官方文档](https://xmake.io/guide/basic-commands/switch-toolchains.html)

第一次构建时，Xmake 会自动检测并配置工具链。

如果安装了 VS，那么即使不进入编译环境 Xmake 也能找到 MSVC 编译器。

如果要配置使用 MinGW 编译器，那么要先进入 MSYS 编译环境，然后运行如下命令完成工具链的切换

```sh
xmake f --toolchain=mingw -c
```

是的就是这么简单，现在运行 `xmake` 就会以新的工具链构建项目，无需修改构建文件，无需定义一堆环境变量。
