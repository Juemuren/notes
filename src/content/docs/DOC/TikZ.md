---
title: TikZ
---

## 简介

TikZ 是 LaTeX 生态的一个软件包，可以通过代码绘制图片

## 对比

TikZ 能够绘制的图片类型远比 Mermaid/PlantUML 丰富

- Mermaid 只能绘制特定类型的图表
- TikZ 理论上能够绘制所有类型的图片

直接对标 TikZ 的是 SVG

- SVG 基于 Web，更适合集成到 Web 应用中。但直接手写 SVG 很麻烦，且缺少包管理，经常要重复造轮子
- TikZ 基于 LaTeX，有相当多的包，适合用于学术论文。同时也有一些项目（比如 TikZJax）尝试借助 WASM 在 Web 页面中实时渲染 TikZ

## 安装

### LaTeX

根据 LaTeX 发行版的不同，TikZ 的安装方式也不同。

对于大多数 LaTeX 发行版，比如 `MikTeX`/`Texlive`，TikZ 都是已安装的。如果未安装，则可使用包管理器

```sh
# Texlive
tlmgr install pgf
# MikTeX
miktex packages install pgf
```

### VSCode

VSCode 扩展 [TikZ in Markdown](https://marketplace.visualstudio.com/items?itemName=kevinyuan.vscode-tikzjax) 可以在 Markdown 预览时，渲染用代码块编写的 TikZ 图片，比如写成这样

````markdown
```tikz
\begin{tikzpicture}[x=1pt, y=1pt, font=\small]
  \draw[gray, thin, ->] (0,0) -- (0,200) node[above] {$A$};
  \draw[gray, thin, ->] (0,0) -- (300,0) node[right] {$f$};
  \node[gray] at (-10, -10) {0};

  \foreach \n in {1,...,5} {
    \node[gray] at (\n*50, -10) {$f_\n$};
    \draw[thick, black] (\n*50, 0) -- (\n*50, 180/\n^2) node[above] {$A_\n$};
  }
\end{tikzpicture}
```
````

### TikZJax

根据 [官网](https://tikzjax.com/) 的说明，对于 HTML 页面，只需在 `<head>` 中添加

```html
<link rel="stylesheet" type="text/css" href="https://tikzjax.com/v1/fonts.css" />
<script src="https://tikzjax.com/v1/tikzjax.js"></script>
```

然后 `<body>` 内就可以如下编写 `tikz` 代码了

```html
<script type="text/tikz">
  \begin{tikzpicture}
    \draw (0,0) circle (1in);
  \end{tikzpicture}
</script>
```

而对于 Markdown 博客来说，集成会更加复杂一点。

我使用的 SSG 是 [Hugo](https://gohugo.io/)，主题为 [PaperMod](https://github.com/adityatelange/hugo-PaperMod/)。我换了个更快的源，并添加了一些样式以实现居中、横向滚动和自动适配黑暗模式

```html
<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.jsdelivr.net/npm/@drgrice1/tikzjax@1.0.0-beta24/dist/fonts.css"
/>
<script
  defer
  src="https://cdn.jsdelivr.net/npm/@drgrice1/tikzjax@1.0.0-beta24/dist/tikzjax.js"
></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".tikz")
    elements.forEach((el) => {
      const wrapper = document.createElement("div")
      wrapper.className = "tikz-container"
      el.parentNode.replaceChild(wrapper, el)
      const script = document.createElement("script")
      script.type = "text/tikz"
      script.textContent = el.textContent.trim()
      wrapper.appendChild(script)
    })
  })
</script>
<style>
  .tikz-container {
    width: fit-content;
    margin: 1em auto;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
  }
  html[data-theme="dark"] .tikz-container svg {
    filter: invert(1);
  }
</style>
```

除此之外还要在 `layouts/partials/extend_head.html` 中添加如下代码

```html
{{ if .Store.Get "hasTikz" }} {{ partial "tikz.html" . }} {{ end }}
```

最后添加 `layouts/_default/_markup/render-codeblock-tikz.html` 文件

```html
<pre class="tikz">
  {{ .Inner | htmlEscape | safeHTML }}
</pre>
{{ .Page.Store.Set "hasTikz" true }}
```

现在就可以像 VSCode 扩展一样，在博客中使用 `tikz` 代码块编写图片了

````markdown
```tikz
\begin{tikzpicture}
  % ...
\end{tikzpicture}
```
````

具体效果可以查看我的博客文章 [《音乐的数学原理：从振动弦到现代乐理》](https://juemuren.github.io/blog/posts/math/%E9%9F%B3%E4%B9%90%E7%9A%84%E6%95%B0%E5%AD%A6%E5%8E%9F%E7%90%86/)

## 使用

TikZ 通常是嵌入学术论文，并随着其一起编译的。

如果只想用 TikZ 做图片，那么可以添加如下代码让它变成独立的文档

```tex
\documentclass[tikz]{standalone}
\usepackage{tikz}
\begin{document}
\begin{tikzpicture}
% ...
\end{tikzpicture}
\end{document}
```

然后编译该 `tex` 文件

```sh
# 生成 dvi
latex tikz.tex
# 转为 svg
dvisvgm "tikz.dvi"
```
