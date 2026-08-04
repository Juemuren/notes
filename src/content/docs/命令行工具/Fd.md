---
title: Fd
---

## 简介

fd 是个文件查找器，功能和 `find` 类似，但使用起来更友好

## 安装

```sh
# Windows
scoop install fd
```

## 使用

基本使用

```sh
# 列出当前目录下的所有文件
fd
# 限制递归深度
fd -d 2
# 指定扩展名
fd -e md
# 指定搜索路径
fd --search-path docs
# 修改输出格式
fd --format "* {}"
```

> [!note] 占位符
> `{}` 作为占位符，表示文件的完整路径。这个占位符有一些变种
>
> - `{/}` 去除父目录
> - `{//}` 父目录
> - `{.}` 不带扩展名
> - `{/.}` 去除父目录且不带扩展名

fd 还集成了 `xargs` 的功能，可以让运行脚本更方便。其中占位符的用法是相同的

```sh
# 将查找到的每条结果分别传给 command
fd -x command "{}"
# 对查找到的所有结果一起传给 command
fd -X command "{}"
```

## 示例

fd 的特点就是用法简单，比起 `find` 要好写、好理解。由于 fd 的用法非常多，我无法一一介绍，就举几个我自己实际使用 fd 的场景。

---

我有一个用 LaTeX 写的学习笔记，现在想全部迁移到 Markdown，因为后者更适配静态网站生成器。以下命令可以将当前目录下（包括子目录）的所有 tex 文件转为 md 格式，并以展平的结构移动到一个新的目录里

```sh
fd -e tex -x pandoc "{}" -o "{.}.md"
mkdir markdown
fd -e md -x mv "{}" markdown/
```

---

我想统计这个仓库中的所有 markdown 文件加起来有多少字，就可以使用如下命令

```sh
fd -e md -X wc
```

---

我要检查某条 PATH 中是否有 exe 文件或 dll 文件被覆盖，可以运行以下命令

```sh
fd -e exe -e dll -d 1 --search-path "search/path" -x which '{/}' | rg -v -F "search/path"
# Windows 系统需要额外处理后一个路径，比如改为 rg -v -F "$(cygpath 'search/path')"
```
