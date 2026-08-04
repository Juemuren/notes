---
title: Fzf
---

## 简介

Fzf 是个模糊查找器，可以对提供的输入进行模糊查找，某种程度上可以看作一个交互式的 grep

## 安装

```sh
# Windows
scoop install fzf
# Linux
brew install fzf
```

## Shell 集成

Fzf 原生只支持 bash、zsh 和 fish 的集成。要启用 Shell 集成，需把以下命令添加到配置文件里

```sh
# bash ~/.bashrc
eval "$(fzf --bash)"
# zsh ~/.zshrc
source <(fzf --zsh)
```

对于 Pwsh，则需要额外安装模块 [PSFzf](https://github.com/kelleyma49/PSFzf) 来启用集成

```sh
Install-Module -Name PSFzf
```

然后可以添加以下命令到配置文件 `$PROFILE` 中

```pwsh
# 启用模块
Import-Module PSFzf
# 覆盖 PSReadline 的按键绑定
Set-PsFzfOption -PSReadlineChordProvider 'Ctrl+t' -PSReadlineChordReverseHistory 'Ctrl+r'
```

## 使用

fzf 的核心是 **模糊匹配算法** 和 **交互式终端界面**，基于这两大支柱 fzf 衍生出了非常多的用法。

[官方文档](https://junegunn.github.io/fzf/getting-started/#an-example) 里有很直观的的演示，建议去看一看。

### 命令历史记录搜索

如果启用了 Shell 集成，那么按下 `Ctrl+r` 就可以逆序搜索命令历史记录。如果你想重复运行之前的某个只有模糊记忆的命令，那么这非常有帮助

### 文件和目录搜索

如果启用了 Shell 集成，那么按下 `Ctrl+t` 就可以搜索当前目录下的文件夹和文件。这让切换目录、搜索文件等许多操作都更加方便了

### 管道

把别的命令的输出通过管道提供给 fzf，就可以交互式搜索该命令的输出。对于那种输出很长，而我们只关注其中一部分的命令而言，非常好用。

比如我想查看当前某个进程的状态，但系统的进程非常多且我不太清楚进程的全名。传统的方法是尝试不同的正则表达式对结果进行过滤，但这样效率很低。而 `ps aux | fzf` 可以在一个交互式的界面中进行过滤。

再比如我想切换到一个 Git 分支，但忘了分支的完整名字。传统的方法需要两步：首先列出所有的 Git 分支名，然后手动复制、粘贴进行切换。而使用 fzf 可以一步完成 `git branch | fzf | cut -c 3- | xargs git checkout`

对于大多数命令的输出，都可以这样交互式地进行探索。

### TUI

fzf 自带 TUI，这个 TUI 是可以高度自定义的。

#### TUI 外观

可以对 TUI 的外观进行调整

- `--style` 调整全局样式。有 `default|minimal|full` 这些预设
- `--color` 调整颜色。有 `dark|light|base16|bw` 这些预设
- `--height` 调整高度，值为行数或百分数。没有这个参数时 fzf 的界面将占用整个终端
- `--layout` 调整布局。有 `default|reverse|reverse-list` 这些预设
- `--margin` 调整外边距，`--padding` 调整内边距，值 `T,R,B,L` 表示上、右、下、左的边距
- `--border`/`--list-border`/`--input-border` 调整全局边框/列表边框/输入边框的样式。有 `rounded|sharp|bold|block|thinblock|double|horizontal|vertical|top|bottom|left|right|line|none` 这些预设
- `--border-label`/`--list-label`/`--input-label` 添加全局边框/列表边框/输入边框标签
- `--border-label-pos`/`--list-label-pos`/`--input-label-pos` 改变全局边框标签/列表边框标签/输入边框标签的位置
- `--info` 调整输入框信息样式。有 `default|right|hidden|inline` 这些预设
- `--prompt` 更改输入框提示符，值为字符串。

还可以为 TUI 添加顶栏和底栏

- `--header=STR`/`--footer=STR` 为顶栏/底栏添加文本
- `--header-border`/`--footer-border` 为顶栏边框/底栏添加边框
- `--header-label`/`--footer-label` 为顶栏边框/底栏边框添加标签
- `--header-label-pos`/`--footer-label-pos` 调整顶栏边框标签/底栏边框标签的位置

#### TUI 行为

可以对 TUI 的行为进行调整

- `--multi` 允许使用 `tab` 进行多选
- `--cycle` 允许循环滚动
- `--warp` 允许自动换行
- `--disabled` 不进行过滤，此时 fzf 只用于选择
- `--ansi` 可以处理 ANSI 颜色转义符

还可以修改 TUI 的预览命令和按键绑定，这使得它可以为别的命令提供交互功能

- `--preview` 修改预览命令。比如 `fzf --preview "bat {}"` 将用 bat 预览文件
- `--bind` 修改按键绑定。比如 `fzf --bind "enter:become(rm {})"` 将按键 `enter` 绑定到 `rm` 命令

> [!note] 占位符
>
> `--preview` 和 `--bind` 中的 `{}` 为占位符，被替换为当前行的单引号字符串。
>
> 对于比较复杂的命令，fzf 支持 `[BEGIN]..[END]` 这样的字段索引表达式，即
>
> - `{1}` 第一个字段
> - `{-1}` 最后一个字段
> - `{3..5}` 从第三个字段到第五个字段
> - `{2..}` 从第二个字段到最后一个字段
> - `{..-3}` 从第一个字段到倒数第三个字段
> - `{..}` 所有字段
>
> 另外还有一些特殊的占位符
>
> - `{+}` 被替换为以空格分隔的已选择项目列表
> - `{*}` 被替换为以空格分隔的已匹配项目列表
> - `{r}` 替换时不添加引号
> - `{s}` 替换时不去除空白
> - `{q}` 被替换为查询字符串，同样支持字段索引表达式
> - `{f}` 被替换为存储已匹配列表的临时文件
> - `{n}` 被替换为当前项的从零开始的序号

预览窗口的外观可以调整，`--preview-border`/`--preview-label`/`--preview-label-pos` 和之前的命令类似，比较特别的是 `--preview-window` 这个参数。该参数较为复杂，既能调整外观也能修改行为。比如

- `up|down|right|left` 可以切换位置
- `wrap` 可以开启自动换行
- `hidden` 默认隐藏，除非触发 `toggle-preview` 操作
- `follow` 自动滚到底部
- `cycle` 允许循环滚动
- 调整高度，值可以为行数或百分数
- 调整偏移，值为 `+`/`-` 后根一个数字，另外可以使用 `/` 进行相对于预览窗口高度的百分比偏移

而按键可绑定到的事件/行动相当多，建议阅读文档。

## 示例

由于 fzf 功能强大，用法丰富，并且可以和很多别的工具集成，因此这里展示一些比较具体的使用场景。

---

参见 [jq](Jq.md) 章节

jq 本身没有交互式功能，但可以借助 fzf 来对 JSON 数据进行交互式探索

```sh
# 展开所有路径，然后用 fzf 进行筛选和预览
jq -r 'paths | @json' data.json | fzf --preview "jq -C getpath({}) data.json" --preview-window=wrap
```

---

参见 [bat](Bat.md) 和 [fd](../命令行工具/Fd.md) 章节

我想要快速浏览一下项目代码，但项目结构嵌很深且代码分散，在目录里来回切换很麻烦。这时就可以用 fzf 配合预览器 bat 来完成这一任务

```sh
fzf --preview "bat --color=always --style=numbers {}" --preview-window=wrap,up,80%
```

还可以更进一步，用 fd 对想预览的文件提前进行一些过滤

```sh
fd -e tsx | fzf --preview "bat --color=always --style=numbers {}" --preview-window=wrap,up,80%
```

---

参见 [rg](Ripgrep.md) 和 [sd](Sd.md) 章节

我很喜欢 VSCode 里的正则替换编辑器，因为它可以实时预览结果，不用担心出错。这个交互功能其实通过 fzf + rg + bat/sd 也能在终端里做到。

这是用 rg + bat 实现的交互式正则查找，没有替换功能。官网上有一个更强大也更复杂的 [示例](https://junegunn.github.io/fzf/tips/ripgrep-integration/)

```sh
fzf --disabled --ansi \
    --bind 'change:reload:rg --column --color=always --smart-case {q}' \
    --delimiter : \
    --preview 'bat --style=numbers --color=always --highlight-line {2} {1}' \
    --preview-window '+{2}/2'
```

这是用 rg + sd 实现的交互式正则替换编辑器，其中用空格分割查询字符串和替换字符串

```sh
fzf --disabled --ansi --multi \
    --bind 'change:reload:rg --files-with-matches {q:1}' \
    --preview 'sd --preview {q:1} {q:2} {+}' \
    --bind 'enter:execute:sd {q:1} {q:2} {+}'
```

---

参见 [git](../命令行工具/Git.md) 章节

git 本身没有交互功能，但 fzf 给了 git 交互的能力

```sh
# 交互式查看提交记录
git log --oneline | fzf --preview 'git show --color=always {1}' --bind 'enter:execute(git show {1} | delta)'
# 交互式查看暂存区更改
git status -s | fzf --preview 'git diff --color=always --staged {2}' --bind 'enter:execute(git diff --staged {2} | delta)'
# 交互式切换分支
git branch | fzf --preview 'git show --color=always {-1}' --bind 'enter:become(git checkout {-1})'
```

类似的例子还有很多。可以说只要有了 fzf 就可以给任何一个没有交互功能的程序添加上交互功能
