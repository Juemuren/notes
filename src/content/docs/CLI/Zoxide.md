---
title: Zoxide
---

## 简介

Zoxide 是一个目录跳转工具，可以快速跳转目录。

## 对比

启用 Shell 集成后，Zoxide 会在你更换工作目录时增加该目录的分数，随后你可以使用 `z example` 进行快速目录跳转，会自动进入分数最高的那个。

fzf 也可以快速切换工作目录，但 fzf 只会在当前工作目录的子目录下搜索目录和文件，且不记录分数等信息。

## 安装

```sh
# Windows
scoop install zoxide
```

## 使用

### Shell 集成

显然，Zoxide 要能够正常工作，首先得能够集成到 Shell 里。Zoxide 支持非常多的 Shell，可以在 [官网](https://github.com/ajeetdsouza/zoxide) 找到集成方法

对于 Pwsh，添加如下命令到 `$PROFILE` 里

```pwsh
Invoke-Expression (& { (zoxide init powershell | Out-String) })
```

### 跳转

使用起来非常简单。

使用 `z foo bar` 它会自动匹配路径里包含 `foo` 和 `bar` 这些字符的目录，并选择权重最高的那个进入。

### 修改数据库

Zoxide 也提供了方法修改数据库。使用 `zoxide edit` 后会打开一个 `TUI`，你可以在其中删除目录记录、增加或减少某个目录的分数等。
