---
title: Hugo
---

## 简介

Hugo 是个静态网站生成器，用 Go 实现

## 对比

和 Hugo 定位最接近的 SSG 是 Zola，二者之间存在一些区别

- Hugo 使用 Go 实现，Zola 使用 Rust 实现。二者构建速度都很快，但 Hugo 在大型项目中更快一点
- Hugo 使用 Go Template 模板语言，Zola 使用 Tera 模板语言。二者都很灵活，但 Zola 的模板相对心智负担更低，而 Hugo 的模板则语言能力更强

## 安装

```sh
# Windows
scoop install hugo-extended
```

## 使用

这个示例来自 [官方快速入门教学](https://gohugo.io/getting-started/quick-start/)，不过我换了个主题。官网上可以查看 [更多主题](https://themes.gohugo.io/)。

```sh
# 初始化目录并进入
hugo new site quickstart
cd quickstart
# 初始化仓库
git init
# 复制别人的主题并写入配置文件
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
echo "theme = 'PaperMod'" >> hugo.toml
# 启动本地服务器
hugo server
# 添加一篇贴文，在编辑器里修改它
hugo new content content/posts/my-first-post.md
# 启动包含草稿的本地服务器
hugo server -D
```
