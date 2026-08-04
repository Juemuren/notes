---
title: Shell
---

## 简介

Shell 是一个命令解释器，提供了与操作系统内核进行交互的环境，有时会被翻译为 **外壳** 以对应 **内核**。

## 基本概念

### 使用模式

Shell 有不同的使用模式

- **交互** 模式，或者叫 REPL 模式。比如终端创建时就会启动一个这样的 Shell，不断地读取输入、运行命令、打印结果、循环，这就是 **REPL** 全称 `Read-Eval-Print-Loop` 的含义
- **脚本** 模式，启动一个新的 Shell 进程执行给定的脚本/命令。比如 `sh -c 'echo hello'` 让 Shell 执行 `echo hello` 单条命令，而 `sh test.sh` 则让 Shell 执行 `test.sh` 这个脚本

### 变量和环境变量

Shell 中存在变量和环境变量。两者有点类似，主要的区别在于作用域

- 环境变量作用域更广，会自动传递给子进程
- 变量作用域更窄，只有当前 Shell 会话可用，不会自动传递给子进程

> [!note] 常见变量/环境变量
> 有些变量或环境变量会被系统进程和多数程序拿去使用，因此成为了一种约定。这些变量用处广泛，以 Ubuntu 上的 Bash 为例
>
> - `PATH` 用于查找命令的目录列表
> - `HOME` 家目录
> - `PWD` 工作目录
> - `PS1`/`PS2` 主提示符/次提示符
> - `EDITOR` 默认编辑器
> - `LANG` 默认语言
> - `USER` 用户名
> - `HOST` 主机名
> - `HTTP_PROXY`/`HTTPS_PROXY` HTTP 代理/HTTPS 代理

Shell 通常会自动设置一些变量/环境变量，当然它们也可以被手动创建、修改、求值。大多数 Shell 关于变量/环境变量的语法都是一样的

- 使用 `$VAR` 获取变量/环境变量的值
- 使用 `VAR=xxx` 创建或者修改变量
- 使用 `export VAR=xxx` 创建或者修改环境变量

> [!tip] 环境变量持久化
> 通过 `export VAR=xxx` 设置的环境变量只在当前 Shell 进程及子进程中有效。如果希望持久化设置，需要把命令添加到 [配置文件](#配置文件) 中。

可以使用 `env` 命令查看当前会话中所有的环境变量，而 `set` 命令可以查看所有的变量

> [!note] Pwsh 的环境变量
> Pwsh 中变量和环境变量的用法与 UNIX Shell 存在较大的区别
>
> - 对于变量用 `$VAR` 获取值，用 `$VAR=xxx` 创建或修改值
> - 对于环境变量用 `$env:VAR` 获取值，用 `$env:VAR=xxx` 创建或修改值

### 查找命令

Shell 中命令查找通常遵循以下的优先级

1. 别名。Shell 可以添加命令别名，以便简写常用的命令
2. 关键字。Shell 会存在一些关键字，比如 `if`/`while` 等
3. 函数。Shell 可以定义函数，比别名更适合应对复杂的命令
4. 内置命令。Shell 会有一些内置命令，通常包括 `cd`/`echo`/`pwd`/`type` 等
5. 外部命令。Shell 会在环境变量 `PATH` 中按目录顺序来寻找外部命令

### 工作目录

工作目录是 Shell 进程当前所在的目录路径，所谓的相对路径就是相对于工作目录的。

终端新建 Shell 时的初始工作目录一般都是家目录。大多数 Shell 都可以

- 使用 `cd` 切换工作目录
- 使用 `pwd` 打印工作目录
- 使用 `PWD` 环境变量获取工作目录

### 提示符

在 REPL 模式中，Shell 会在每个循环的开始打印提示符。这些提示符中可能包含当前的用户名、主机名、工作目录、权限级别等各种信息。

提示符可以高度自定义。有很多工具（比如 [starship](Starship.md)）能够帮助我们快速定制出既美观又实用的提示符，也可以直接使用别人制作好的主题。

### 配置文件

Shell 通常都支持使用文件进行配置。不同 Shell 的配置文件可能不一样

- Bash 的配置文件为 `~/.bashrc`
- Zsh 的配置文件为 `~/.zshrc`
- Pwsh 的配置文件路径保存在变量 `$PROFILE` 中

提示符、别名、环境变量等都可以在配置文件中修改。不过一般不需要在配置文件中写特别复杂的脚本，因为社区里总会有工具能够解决这些问题。

### 管道和重定向

多数 Shell 都支持管道。所谓管道就是把前一个命令的输出作为后一个命令的输入，语法通常都是 `command1 | command2`

多数 Shell 也都支持重定向。所谓重定向就是把命令的输出写入文件中，或者从文件中读取输入，语法通常都是

- `command > file` 将输出写入文件，会覆盖原有内容
- `command >> file` 将输出追加写入文件，不覆盖原有内容
- `command < file` 从文件中读取输入

> [!note] Pwsh 的重定向
> Pwsh 不支持 `<` 重定向，通常可以使用管道 `cat file | command` 进行替代。

## 替换 Shell

Shell 只是一个运行在用户空间的普通 CLI 程序，并不是操作系统内核的一部分。因此尽管系统安装时自带了 Shell，但这是可替换的。

### Linux

Linux 系统通常自带 _Bash_，这是事实上的标准。

Linux 使用其它 Shell 只需用系统包管理器安装然后修改登录 Shell 即可。以 Ubuntu + Zsh 为例，操作如下

```sh
# 安装 zsh
apt install zsh
# 修改登录 shell 为 zsh
chsh -s $(which zsh)
```

### Windows

Windows 系统通常自带了 _CMD_ 和 _PowerShell_。日常使用推荐优先选择后者。

Windows 如果要使用别的 Shell，可能需要配置 UNIX 环境。目前有两种主流的方法，当然后者应该更主流一点

- 通过 [MSYS](../EM/MSYS.md) 在一个模拟的 UNIX 环境中使用移植的 Shell
- 通过 [WSL](../EM/WSL.md) 在一个 Linux 子系统里使用 Shell

### macOS

macOS 系统通常自带 _Zsh_。

macOS 使用其它 Shell 也只需简单安装即可，因为 macOS 是标准的类 UNIX 系统。具体方式和 Linux 类似。

## 常用 Shell

| 名称    | 系统自带 | 主要特点                     |
| :------ | :------- | :--------------------------- |
| Bash    | Linux    | 脚本标准，兼容性最好         |
| Pwsh    | Windows  | 基于对象，擅长处理复杂数据   |
| Zsh     | macOS    | 高度可定制，有强大的生态     |
| Fish    | 无       | 开箱即用，提供良好的交互体验 |
| Nushell | 无       | 现代的交互设计和数据处理     |

现代 Shell 的发展趋势主要有以下几个

- 改善交互体验。增强 REPL 模式，降低使用门槛。比如 Fish 自带了 **命令补全**、**语法高亮**、**自动建议** 等功能
- 优化数据处理。用 **结构化数据** 替代纯文本流，提高数据处理的可靠性和效率。比如 Nushell 为数据添加了类型，并提供强大的、基于类型的操作
- 实现跨平台一致。不再绑定操作系统，并减少环境差异所产生的问题。比如 Pwsh 就是旧的 PowerShell 改进架构后的可跨平台版本
- 打造开源生态。通过 **平台** 和 **框架**，形成社区驱动的共享生态。比如 Zsh 通过 GitHub 和 Oh My Zsh 让用户可以轻松分享并获取主题、插件等配置

### Bash

Bash 是 Linux 的默认 Shell。使用 Windows 配置的 UNIX 环境（比如 WSL、MSYS 和 Git for Windows）也将 Bash 作为默认 Shell。

Bash 的生态比较一般，但还是有一些不错的工具

- blesh 行编辑器，有语法高亮和自动建议等功能，非常强大。但在 Windows 上性能问题有点严重

### Pwsh

如果喜欢在 Windows 中使用 PowerShell，那么最好去 [安装新 PowerShell](https://learn.microsoft.com/powershell/scripting/install/install-powershell-on-windows)。这比自带的旧 PowerShell 好用很多。

> [!note] 新旧 PowerShell 的区别
> 微软官方用如下两个名称区分新旧 PowerShell
>
> - PowerShell 基于新版本的 .NET 而不是 .NET Framework，可在 Windows、Linux 和 macOS 上运行
> - Windows PowerShell 是 Windows 中自带的 PowerShell 版本，使用了仅可在 Windows 上运行的完整 .NET Framework
>
> 本文使用 Pwsh 称呼新 PowerShell，且不关注旧 PowerShell
>
> Pwsh 相比旧 PowerShell 有以下主要区别
>
> - 交互体验更好，比如错误提示更精确、内置命令的输出有高亮
> - 生态更好，因为开源和社区驱动
> - 可跨平台，因为改进了架构

Pwsh 自带了模块的管理框架，通过 `Install-Module PSReadLine` 命令就可以安装新的模块。以下是一些推荐的模块

- PSReadLine 改善使用体验的模块。有语法高亮、命令补全（只支持 `PowerShell` 内置命令）、自动建议等功能，体验上不如 Zsh 的类似插件，但也算够用。
- PSFzf 集成 fzf 的模块，需要先安装 [fzf](../DATA/Fzf.md)。
- PSCompletions 命令补全模块，提供了常用命令（包括 git、npm、scoop 等）的补全，并且可以管理这些补全。

### Zsh

Zsh 是 macOS 的默认 Shell。其余系统可手动安装 Zsh。而 Windows 需要先配置类 UNIX 环境

```sh
# Arch/MSYS
pacman -S zsh
# Ubuntu
apt install zsh
```

Zsh 的特色就是高度可定制。而 `Oh My Zsh` 是一个 Zsh 的框架，可以用于管理配置，同时自带了很多插件。安装方法可参考 [官方文档](https://github.com/ohmyzsh/ohmyzsh/?tab=readme-ov-file#basic-installation)。

以下是一些常用的但 `Oh My Zsh` 中没有的插件

- zsh-autosuggestions 自动建议。可以 [使用 Oh My Zsh 安装](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)。
- zsh-syntax-highlight 语法高亮。同样可以 [使用 Oh My Zsh 安装](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md#oh-my-zsh)。
- zsh-completions 额外的命令补全。一般来说没必要装这个插件，因为 zsh 自带的补全已经够多了。建议先去 [仓库](https://github.com/zsh-users/zsh-completions/tree/master/src) 里看看有没有需要的补全。

### Fish

Fish 通常不会自带，需要手动安装。Windows 同样得先配置类 UNIX 环境

```sh
# Arch/MSYS
pacman -S fish
# Ubuntu
apt install fish
# macOS
brew install fish
```

Fish 是开箱即用的，不过同样可以进行配置。Fish 有 `Oh My Fish` 这个框架，但生态不如 Zsh。

### Nushell

Nushell 通常也不会自带，需要手动安装。不过 Windows 可以直接安装，不需要配置类 UNIX 环境

```sh
# Windows
scoop install nu
# macOS/Linux
brew install nushell
```

目前 Nushell 的生态还在发展。官方维护的 [awesome-nu](https://github.com/nushell/awesome-nu) 记录了一些好用的 Nushell 工具，包括插件、脚本、编辑器扩展等。
