---
title: Marp
---

## 简介

Marp 是一个专门用来把 Markdown 文档转为幻灯片的工具，支持导出为 **PDF**、**HTML**、**PPTX** 等格式

## 对比

pandoc 是通用的格式转换工具，也能将 markdown 转为 pptx 格式。而 Marp 更专注于幻灯片这种展示形式，并对此做出了一些优化

- 内置了多个幻灯片主题
- 即使导出为 PDF/HTML 也仍然使用幻灯片的样式和排版风格
- 提供了 VSCode 扩展，能够实时预览，显著改善编辑体验

因此针对该特定需求可能 Marp 用起来更方便、效果更好

## 安装

```sh
# Windows
scoop install marp
```

下载 VSCode 扩展 [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)

## 配置

Marp 支持自定义主题。如果不太熟悉 CSS，可以去社区下载别人分享的主题。在 GitHub 上搜索 [marp theme](https://github.com/search?q=marp+theme&type=repositories) 就能找到许多主题。

我目前使用 [Awesome Marp](https://github.com/favourhong/Awesome-Marp) 这个主题。首先到 [仓库](https://github.com/favourhong/Awesome-Marp/tree/main/themes) 中下载 [am_template.scss](https://github.com/favourhong/Awesome-Marp/blob/main/themes/am_template.scss) 和 [am_dark.scss](https://github.com/favourhong/Awesome-Marp/blob/main/themes/am_dark.scss) 这两个文件，然后修改工作区的 `.vscode/settings.json` 文件

```json
{
  "markdown.marp.themes": [
    "./themes/marp/am_dark.scss",
    "./themes/marp/am_template.scss"
  ]
}
```

## 使用

```sh
# HTML
marp example.md
# PPTX
marp example.md --pptx
# PDF
marp example.md --pdf
```
