---
title: Quarto
---

## 简介

Quarto 是个基于 Pandoc 和 Jupyter 构建的开源科技出版系统

Quarto 自创了 qmd 这个 Markdown 文件格式，并组合了 Pandoc 和 Jupyter。简单地说，构建时，Quarto 会解析 qmd 并将其中的代码交给 Jupyter 运行，然后把得到的结果保留在一个临时文档内，最后用 Pandoc 对其进行转换。Quarto 就这样封装了易用的接口，并实现了不错的出版效果。

## 对比

Quarto 将 `qmd` 作为源文件，而 `ipynb`/`html`/`pdf`/`pptx` 等都是构建产物。

相比 Jupyter 直接维护 `ipynb` 文件并用 `nbconvert` 进行转换，Quarto 的做法有很大不同

| 角度     | Quarto                            | Jupyter                      |
| -------- | --------------------------------- | ---------------------------- |
| 版本控制 | 好，Markdown 的简单扩展，文件清晰 | 差，JSON 格式，难以直接阅读  |
| 输出目标 | 好，基于 pandoc                   | 差，基于 nbconvert           |
| 交互体验 | 差，编辑 - 运行 - 渲染流程较长    | 好，可视化即时，适合快速探索 |

总之就是，Quarto 更适合工程项目，Jupyter 更适合个人使用。

## 安装

```sh
# Windows
scoop bucket add extras
scoop install quarto
```

Quarto 里捆绑了 `pandoc`/`typst`/`deno`/`dart` 等工具，所以体积会相对大点

## 使用

不同的编辑器使用方法不太一样，建议参考 [官方文档](https://quarto.org/docs/get-started/)

对于 VSCode，建议安装 [Quarto](https://marketplace.visualstudio.com/items?itemName=quarto.quarto) 扩展，并在虚拟环境中安装 `jupyter`/`matplotlib`/`plotly`

如果只使用命令行的话，要先激活相应的环境，然后再使用命令。
