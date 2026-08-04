---
title: MSYS
---

## 简介

MSYS 为 Windows 平台提供了一个模拟的编程环境，并移植了很多软件到这个环境中，让 Windows 开发者可以有类似 **UNIX** 系统的开发体验。

除去 arm 架构和 32 位的环境，MSYS 里能选的环境有 3 种，分别是 CLANG、UCRT、MINGW。你可以去 [官网](https://www.msys2.org/docs/environments/) 查看这些环境之间的区别

## 对比

[MSYS2 对比其它项目](https://www.msys2.org/docs/what-is-msys2/)

MSYS 全称为 _Minimal SYStem_，即最小系统，不过这和一般认知中的系统可能有点差别。MSYS 的所谓 _系统_ 可分为 3 个部分

- 模拟环境。MSYS 的模拟环境由运行时和核心工具组成。核心工具部分基于 Cygwin，运行时由 MSYS 项目自己维护。
- 移植软件。MSYS 移植软件的方式很直接。并不会修改软件的源代码，而是直接在这个模拟环境中进行编译和链接。
- 包管理器。MSYS 项目维护着一个仓库，并分发包含了预编译二进制文件的包。这些包可以通过包管理器 Pacman 获取。

### 包管理器

[与 Scoop 的对比](https://github.com/ScoopInstaller/Scoop/wiki/Cygwin-and-MSYS-Comparison)

由于 MSYS 有包管理器 Pacman，所以可能部分人会用 MSYS 来在 Windows 系统中安装软件。

虽然确实可以这么做，但由于是软件其实是在模拟环境中运行，因此会有一点性能损失。并且由于移植方式比较简单，部分工具使用起来会有点麻烦，比如 [Git](https://www.msys2.org/docs/git/)。而 Git for Windows 这个项目则专门针对 Windows 平台移植了 Git，实际体验会更好一点。

我只有一些特殊情况才会使用 MSYS 安装软件

- 软件只发布源代码，没有专门针对 Windows 移植的版本，别的安装方式事实上也是直接从 MSYS 仓库里下载预构建的软件包。这时使用 MSYS 可以省一点硬盘空间，不用下载重复的文件；且 MSYS 的类 UNIX 环境使得除了 _exe_ 外别的文件也能被利用到，比如 man 文件通过 _Scoop_ 安装是无法查看的，但通过 _MSYS_ 安装就可以使用 `man.exe xxx` 来查看手册页。
- 别的安装方法要通过修改 _PATH_ 来提供可执行文件路径，且该路径里有 DLL 文件。这时别的安装方法可能会污染系统环境，导致自己编译的程序链接到错误的库。不过说实话，随着安装的工具变多，系统环境迟早要被污染。要使用 MSYS/MinGW 编译程序最好还是进入编译环境并使用静态链接的方式链接库。

### 开发环境

[与 WSL 的对比](https://www.msys2.org/docs/what-is-msys2/#msys2-vs-wsl)

由于 MSYS 可以轻松地获取 GCC/CLANG 编译工具，所以也有人用 MSYS 搭建 C/C++ 的开发环境

与自己手动安装 MinGW 相比，使用 MSYS 无疑是更好的。后者不仅可以使用 Pacman 安装 C/C++ 包，便于个人项目和小型项目的开发；而且 MSYS 可以进入编译的环境，避免因为系统 PATH 污染导致的链接错误

而 WSL 是另一种在 Windows 上配置 C/C++ 开发环境的方式。但 WSL 要想编译出可以在原生 Windows 上运行的程序需要使用交叉编译，会比较麻烦，一般程序就只在 WSL 里运行。而 MSYS 可以轻松地编译出能在 Windows 上运行的程序

不过在 Windows 里 Visual Studio 才是事实上的标准，如果你接触的东西很多，总会遇到不支持 MinGW 的东西，比如 Windows 上的 _CUDA_。因此我个人还是会安装一个 **VS 生成工具**，并使用 **CLANG** 作为编译器前端。

## 安装

不建议用 Scoop 安装。推荐使用 [官方的安装程序](https://www.msys2.org/)。

## 更改设置

### 修改 HOME

没找到官方文档，但 [Cygwin 用户手册](https://cygwin.com/cygwin-ug-net/ntsec.html) 可以参考，毕竟 MSYS 的模拟环境部分来自于 Cygwin 项目。不过说实话，这个文档写得有点乱，用浏览器在页面查找 `db_home` 可以比较快地找到需要的内容。

修改 MSYS2 的 `/etc/nsswitch.conf` 文件

```ini
# 默认
db_home: cygwin desc
# 使用 windows 家目录
db_home: windows cygwin desc
```

### 安装 ZSH

```sh
pacman -S zsh
```

## 进入环境

[MSYS2 官方文档](https://www.msys2.org/wiki/Launchers/)

可以使用官方写的脚本，或者自己写命令。

个人认为使用脚本可能更好，毕竟官方已经写好了脚本的启动命令，考虑到了更多的情况。你可以去查看 `msys2_shell.cmd` 这个脚本文件的具体内容，里面告诉了你一些本文没提到的东西。比如有些代码可以通过注释掉或取消注释掉来改变启动行为。像 [启用符号链接](https://www.msys2.org/docs/symlinks) 这个功能就可以通过 `set MSYS=winsymlinks:nativestrict` 来启用。不过 _cmd_ 文件真的很难阅读，语法太丑陋了。

### 使用脚本

你可以通过 `path\to\msys2\msys2_shell.cmd -help` 来获取该脚本的使用帮助

```sh
# 使用默认终端、不启动新窗口、在当前目录、保留原 PATH、使用 Zsh、进入 UCRT64 环境
path\to\msys2\msys2_shell.cmd -defterm -no-start -here -full-path -ucrt64 -shell zsh
```

可以看到启动命令很长，而且还要记脚本路径，用起来非常麻烦

虽然不建议用 Scoop 安装，但可以用它来管理脚本

```sh
# 用 scoop 方便地管理脚本
scoop shim add msys 'path\to\msys2\msys2_shell.cmd' '--' -defterm -here -no-start -full-path -shell zsh
# 此后只需一个命令和一个参数就能启动对应的环境
msys -ucrt64
msys -mingw64
```

当然你也可以使用别的方式配置、管理你自己的脚本

现在我们可以随时随地非常方便地启动 MSYS 环境了

### 使用命令

当然也可以不使用官方的脚本，自己写命令。

```sh
# 在当前目录、保留原 PATH、使用 Zsh、进入 UCRT64 环境
path\to\msys2\usr\bin\env CHERE_INVOKING=1 MSYS2_PATH_TYPE=inherit MSYSTEM=UCRT64 /usr/bin/zsh -li
```

命令同样很长，也可以用 Scoop 管理。

## 配置终端

目前我们每次要进入 MSYS 环境时，都要先新建一个默认的 PowerShell 终端，然后再输入命令。

这很麻烦。好在大多数编辑器/终端都可以配置启动命令。

启动命令可以参考 [进入环境](#进入环境) 这节

### VSCode Terminal

> [!note] 官方文档
> 有趣的是，MSYS 和 VSCode 都在文档里写了如何配置 VSCode 中 MSYS 的启动命令
>
> - [MSYS2 官方文档](https://www.msys2.org/docs/ides-editors/)
> - [VSCode 官方文档](https://code.visualstudio.com/docs/terminal/profiles#_msys2)

VSCode 有更方便的方式设置环境变量，这样命令就看起来不会很长，而且更易读。

```json
{
  "terminal.integrated.profiles.windows": {
    "MSYS UCRT": {
      "path": "path\\to\\msys2\\usr\\bin\\bash.exe",
      "args": ["--login", "-i"],
      "env": {
        "CHERE_INVOKING": "1",
        "MSYSTEM": "UCRT64",
        "MSYS2_PATH_TYPE": "inherit"
      },
      "overrideName": true,
      "icon": "terminal-bash",
      "color": "terminal.ansiWhite"
    }
  }
}
```

_path_ 填写 `bash.exe` 而不是 `msys2_shell.cmd`，主要是为了让 VSCode 可以自动注入 Shell 集成脚本。不过我不是很喜欢这个功能，这会让启动变慢，且许多功能感觉并不实用。再就是集成脚本自动注入在 Windows 上只支持 PowerShell 和 Bash，使用 Zsh 就得手动注入了。

### Windows Terminal

[MSYS2 官方文档](https://www.msys2.org/docs/terminals/#windows-terminal)

```json
{
  "profiles": {
    "list": [
      {
        "name": "MSYS2 UCRT",
        "commandline": "path/to/msys2/msys2_shell.cmd -defterm -here -no-start -ucrt64",
        "hidden": false,
        "startingDirectory": "%USERNAME%",
        "pathTranslationStyle": "msys2",
        "icon": "path/to/msys2/ucrt64.ico"
      }
    ]
  }
}
```
