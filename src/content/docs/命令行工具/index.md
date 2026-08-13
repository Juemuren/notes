---
title: 命令行工具
---

## 基本概念

**命令行界面**（CLI），是一个和 **图形用户界面**（GUI）相对的概念

- 在命令行界面里，用户输入文本命令来执行操作
- 在图形用户界面里，用户可以点击、拖拽图形元素来执行操作

**终端** 提供了一个访问命令行界面的程序窗口。终端创建时通常会启动一个 Shell。**Shell** 是运行在终端内的命令解释器，负责解析用户的输入、调用操作系统内核或其它程序来执行任务、输出运行结果等。

## 分类

:::caution[分类问题]

我按照用途对工具进行分类，但有些工具用处不止一种，且有些工具用处非常独特。因此下文的分类不够严谨，主要是为了美观。

:::

一些主题鲜明的工具被放到了专门的章节里，包括

- [编辑器](../编辑器/index.md#分类)
- [包管理器](../包管理器/index.md#分类)
- [环境管理器](../环境管理器/index.md#分类)
- [网络工具](../网络/index.md#工具)
- [安全工具](../安全/index.md#工具)
- [文档工具](../文档/index.md#工具)
- [数据处理工具](../数据处理/index.md#工具)
- [语言相关的工具](../编程语言/index.md)，包括语言包管理器、构建工具、格式化工具、静态检查工具、动态分析工具等

另外，[awesome-shell](https://github.com/alebcay/awesome-shell) 和 [awesome-cli-apps](https://github.com/agarrharr/awesome-cli-apps) 中推荐了非常多的工具，我参考了其中的部分内容。

### 脚本编写

用于编写脚本，或提高脚本能力的工具

- coreutils 常用的命令行工具，通常都预装在 Unix 系统中。目前有多种 coreutils 实现，比如 GNU coreutils / uutils coreutils / busybox 等
- [Shell](Shell.md) 命令解释器，提供了与操作系统内核进行交互的环境
- shellcheck 脚本静态检查工具
- shfmt 脚本格式化工具
- gum 用于交互式脚本的辅助工具，可以让脚本拥有华丽的 TUI
- zx 使用 JavaScript 编写脚本
- rush 类似 `xargs` / `parallel`，用于并行执行命令

### 任务运行

用于运行任务，或编排脚本的工具

- [just](Just.md) 任务运行器，语法类似 `Make` 但并不是构建系统
- pueue 任务管理器，可以顺序和并行执行，适合长时间运行的任务
- [prek](Prek.md) 提交前钩子管理器，可以与 `Git` 集成
- [hyperfine](Hyperfine.md) 命令基准测试工具，`time` 的升级版，用于比较不同命令的速度
- watchexec 监视文件，在其更改后自动重新运行命令
- checkexec 比较文件修改时间，若依赖文件比目标文件更新则运行命令

### 命令手册

用于查阅命令手册，或纠正命令错误的工具

- [tldr](Tldr.md) 命令示例手册
- navi 命令备忘录，提供了基于 `fzf` 的 TUI
- thefuck 命令纠错工具

### 文件目录

用于查找文件，管理文件资源，或在目录间进行导航的工具

- [fd](Fd.md) 文件查找器，类似 `find` 但更现代
- [eza](Eza.md) 文件目录查看工具，类似 `ls` 但更现代
- yazi 文件管理器，有非常好用的 TUI
- f2 批量重命名文件
- [zoxide](Zoxide.md) 快速工作目录跳转

### 信息监控

用于实时监控系统，或打印提示信息的工具

- [starship](Starship.md) 用于修改提示符，可跨平台和跨 Shell
- [fastfetch](Fastfetch.md) 能够高度定制的系统信息获取工具
- bottom 系统监控工具，可跨平台，提供了强大的 TUI

### 代码管理

用于管理代码、配置文件甚至密钥的工具

- [dotter](Dotter.md) 点文件管理器。类似的工具还有 `chezmoi`
- [git](Git.md) 分布式版本控制系统，目前的行业标准
- gopass 密钥管理器

### 磁盘分析

用于磁盘占用、健康度查询的工具

- duf 磁盘占用分析工具，现代版的 `df`
- dust 文件占用分析工具，现代版的 `du`
- smartmontools 用于查看磁盘健康状况的工具

### 玩具

除了酷炫以外没什么用的东西

- genact 假活动生成器，可以模拟多种开发活动
- cmatrix 炫酷的终端屏保，灵感来源于《黑客帝国》，不过只有 Linux 可用
- lolcat 给输出着上彩虹色
- cowsay 搞怪版的 `echo`，会让一只牛顶着对话框
- fortune 随机生成名言，可以和前者结合达成奇妙效果
- figlet 把输入文本转为 ASCII 艺术字
