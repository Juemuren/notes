---
title: MSYS
---

## 简介

MSYS 为 Windows 平台提供了一个模拟的编程环境，并移植了很多软件到这个环境中，让 Windows 开发者可以有类似 **UNIX** 系统的开发体验。

除去 arm 架构和 32 位的环境，MSYS 里能选的环境有 3 种，分别是 CLANG、UCRT、MINGW。https://www.msys2.org/docs/environments/ 中有对这些环境的详细说明

## 对比

https://www.msys2.org/docs/what-is-msys2/

MSYS 全称为 _Minimal SYStem_，即最小系统，不过这和一般认知中的系统可能有点差别。MSYS 的所谓 _系统_ 可分为 3 个部分

- 模拟环境。MSYS 的模拟环境由运行时和核心工具组成。核心工具部分基于 Cygwin，运行时由 MSYS 项目自己维护。
- 移植软件。MSYS 移植软件的方式很直接。并不会修改软件的源代码，而是直接在这个模拟环境中进行编译和链接。
- 包管理器。MSYS 项目维护着一个仓库，并分发包含了预编译二进制文件的包。这些包可以通过包管理器 Pacman 获取。

### 包管理器

https://github.com/ScoopInstaller/Scoop/wiki/Cygwin-and-MSYS-Comparison

由于 MSYS 有包管理器 Pacman，所以可能部分人会用 MSYS 来在 Windows 系统中安装软件。

虽然确实可以这么做，但由于是软件其实是在模拟环境中运行，因此会有一点性能损失。并且由于移植方式比较简单，部分工具使用起来会有点麻烦，比如 [Git](https://www.msys2.org/docs/git/)。而 Git for Windows 这个项目则专门针对 Windows 平台移植了 Git，实际体验会更好一点。

Scoop 是另一种常用的 Windows 包管理器，通常 Windows Native 体验会更好。我一般只用 MSYS 安装那些只发布源代码，且没有针对 Windows 移植版本的软件。此时别的安装方式事实上也只能从 MSYS 仓库里下载预构建的软件包。这时使用 MSYS 可以省一点硬盘空间，不用下载重复的文件；且 MSYS 的类 UNIX 环境使得除了 exe 外别的文件也能被利用到，比如 man 手册通过 Scoop 安装时无法查看，但通过 MSYS 安装就可以使用 `man.exe xxx` 查看手册页。

### 开发环境

[与 WSL 的对比](https://www.msys2.org/docs/what-is-msys2/#msys2-vs-wsl)

由于 MSYS 可以轻松地获取 GCC/CLANG 编译工具，所以也有人用 MSYS 搭建 C/C++ 的开发环境。

与自己手动安装 MinGW 相比，使用 MSYS 无疑是更好的。后者不仅可以使用 Pacman 安装 C/C++ 包，而且可以进入隔离的编译环境，避免因为系统 PATH 污染导致的链接错误。

不过在 Windows 里 Visual Studio 才是事实上的标准，如果你接触的东西够多，总会遇到不支持 MinGW 的东西，比如 Windows 上的 _CUDA_。因此我个人还是会安装一个 **VS 生成工具**，并使用 **CLANG** 作为编译器前端。

而 WSL 是另一种在 Windows 上配置 C/C++ 开发环境的方式。但 WSL 要想编译出可以在原生 Windows 上运行的程序需要使用交叉编译，会比较麻烦；而 MSYS 可以轻松地编译出能在 Windows 上运行的程序。但 WSL 提供的是完整的 Linux 环境，这比 MSYS 模拟的 POSIX 环境要强上不少。

## 安装

使用 [官方的安装程序](https://www.msys2.org/)。

## 更改设置

### 修改 HOME

参考 [Cygwin 用户手册](https://cygwin.com/cygwin-ug-net/ntsec.html)

修改 MSYS2 的 `/etc/nsswitch.conf` 文件

```ini
# 默认
db_home: cygwin desc
# 使用 windows 家目录
db_home: windows cygwin desc
```

### 启用符号链接

https://www.msys2.org/docs/symlinks

设置环境变量 `MSYS=winsymlinks:nativestrict`

```pwsh
[System.Environment]::SetEnvironmentVariable('MSYS', "winsymlinks:nativestrict", 'User')
```

### 安装 ZSH

```sh
pacman -S zsh
```

## 进入环境

[MSYS2 官方文档](https://www.msys2.org/wiki/Launchers/)

可以使用官方提供的脚本 `msys2_shell.cmd` 进入 MSYS 环境，也可以通过 `env` 命令进入环境。

### 使用脚本

```sh
# 使用默认终端、不启动新窗口、在当前目录、保留原 PATH、进入 UCRT64 环境、使用 Zsh
path\to\msys2\msys2_shell.cmd -defterm -no-start -here -full-path -ucrt64 -shell zsh
```

- `-ucrt64` 换成 `-mingw64` / `-clang64` 就可以进入不同的环境，省略时进入默认的 MSYS 环境。
- `-shell zsh` 换成 `-shell fish` 就可以使用不同的 shell，省略时使用默认的 bash。
- 更详细的说明，可以运行 `path\to\msys2\msys2_shell.cmd -help` 来获取。

启动命令很长，而且还要记脚本路径，用起来非常麻烦

可以用 scoop 创建一个 shim，方便后续使用

```sh
# 用 scoop 创建 shim
scoop shim add msys2 'path\to\msys2\msys2_shell.cmd' '--' -defterm -here -no-start -full-path
# 此后只需一个短命令就能启动对应的环境，并使用指定的 shell
msys2 -ucrt64 -shell zsh
msys2 -mingw64
```

当然你也可以自己包装一个脚本，然后放到 PATH 里。比如下面这个 cmd 脚本就和 scoop 的 shim 完全等价

```cmd
@"path\to\msys2\msys2_shell.cmd" -defterm -here -no-start -full-path %*
```

### 使用命令

```sh
# 在当前目录、保留原 PATH、进入 UCRT64 环境、使用 Zsh
path\to\msys2\usr\bin\env CHERE_INVOKING=1 MSYS2_PATH_TYPE=inherit MSYSTEM=UCRT64 /usr/bin/zsh -li
```

- `MSYSTEM=UCRT64` 换成 `MSYSTEM=MINGW64` / `MSYSTEM=CLANG64` 就可以进入不同的环境。
- `/usr/bin/zsh` 换成 `/usr/bin/bash` / `/usr/bin/fish` 就可以使用不同的 shell。

这条命令同样很长，可以用 Scoop 创建 shim 或者自己编写脚本，此处不再重复。

## 配置终端

目前我们每次要进入 MSYS 环境时，都要先新建一个默认的 PowerShell 终端，然后再输入命令。这很麻烦。好在大多数编辑器/终端都可以配置启动命令。

启动命令可以参考 [进入环境](#进入环境) 这节

### VSCode Terminal

> [!note] 官方文档
> 有趣的是，MSYS 和 VSCode 都在文档里写了如何配置 VSCode 中 MSYS 的启动命令
>
> - [MSYS2 官方文档](https://www.msys2.org/docs/ides-editors/)
> - [VSCode 官方文档](https://code.visualstudio.com/docs/terminal/profiles#_msys2)

这里的 VSCode 的配置其实就是把前面的 [env 命令](#使用命令) 翻译成了 JSON，因此需要不同环境或不同 shell 的话照着修改就行。

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
            }
        }
    }
}
```

### Windows Terminal

[MSYS2 官方文档](https://www.msys2.org/docs/terminals/#windows-terminal)

这个脚本 [msys2_shell.cmd 的用法](#使用脚本) 已在前文提及，因此需要不同环境或不同 shell 的话照着修改就行。

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
