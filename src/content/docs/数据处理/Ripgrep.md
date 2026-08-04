---
title: Ripgrep
---

## 简介

ripgrep 是个类似 grep 的查找器，会递归地搜索目录以查找匹配正则表达式的文本

## 对比

ripgrep 的最大宣传点就是快。但其和 grep 的不同点并不止这一个。个人感觉下来有以下不同

- 速度更快
- 用法更简单
- 默认输出样式更美观
- 以单一二进制文件分发，安装非常方便

## 安装

```sh
# Windows
scoop install ripgrep
# Linux
brew install ripgrep
```

## 使用

ripgrep 功能非常强大，用法很多，还有自己的配置文件，这里只列出我常用的命令。可参考 [官方文档](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md) 获取更多信息

### 正则查找

```sh
# 递归在当前目录下的所有文件中查找匹配 pattern 正则表达式的文本
rg pattern
# 只查找 example.md 文件
rg pattern example.md
```

ripgrep 会自动忽略部分文件，比如隐藏文件、`.gitignore` 中的文件等，你可以添加一些参数来搜索这些隐藏的文件

```sh
# 无视 .gitignore 等文件的要求
rg pattern --no-ignore
# 包含隐藏文件
rg pattern --hidden
# 包含二进制文件
rg pattern --text
# 包含符号链接文件
rg pattern --follow
```

除此之外 ripgrep 还有非常非常多的参数，个人比较常用的有以下几个

```sh
# -v 反向过滤文本
rg -v pattern
# -F 将 pattern 视为字面量而非正则表达式
rg -F pattern
# -C N 在匹配行前后额外显示 N 行
rg -C 5 pattern
# -P 使用 PCRE2 引擎
rg -P pattern
# --crlf 使用 CRLF 处理行尾序列
rg --crlf pattern
```

### 配置文件

ripgrep 的配置文件通常为 `~/.ripgreprc`，这可以让你在不创建别名的情况下，自动为每个 `rg` 命令添加参数

```sh
# 为每个 rg 命令添加 --smart-case 参数
--smart-case
```
