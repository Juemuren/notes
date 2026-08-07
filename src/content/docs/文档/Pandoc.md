---
title: Pandoc
---

## 简介

Pandoc 是一个文档格式转换工具，可以处理非常多种的文档格式转换。你可以在 [官网](https://pandoc.org/) 找到 [所有支持的格式转换](https://pandoc.org/diagram.svgz)

## 安装

```sh
# Windows
scoop install pandoc
```

## 使用

Pandoc 的原理其实很简单，就是把输入文件先转成一个内部格式，然后再把内部格式转成另一个指定的格式。部分格式只能作为输入，部分格式只能作为输出，其余的都是可以双向转换的格式

```sh
# 列出所有能作为输入的格式
pandoc --list-input-formats
# 列出所有能作为输出的格式
pandoc --list-output-formats
```

你可以去官网找到更多使用示例，这里只介绍些我平时会用到的格式转换

### DOCX

DOCX 支持双向转换

DOCX 可以转换成别的格式，比如 Markdown，不过可能会丢失部分关于样式的信息。DOCX 也可以转为 PDF，但更建议使用 **Microsoft Word** 完成这个转换，Pandoc 使用第三方 PDF 引擎，可能会有排版上的差异。

```sh
# DOCX 转 Markdown
pandoc example.docx -o example.md
```

别的格式也可以转为 DOCX，并且支持自定义模板

```sh
# Markdown 转 DOCX
pandoc example.md -o example.docx
# 导出默认的 DOCX 模板
pandoc -o custom-reference.docx --print-default-data-file reference.docx
# 使用修改后的模板
pandoc example.md -o example.docx --reference-doc=custom-reference.docx
```

### Markdown

Markdown 也支持双向转换

Markdown 本身没有排版和样式的功能，导出为其它格式时需指定模板。Pandoc 默认的模板效果比较一般。你可以在 [Pandoc templates](https://pandoc-templates.org/) 上搜寻别人分享的模板。如果你不知道该用哪个模板，也许可以试试这个覆盖了几乎所有导出格式的 [学术模板](https://github.com/maehr/academic-pandoc-template)。

#### Markdown 转 HTML

Markdown 转 **HTML** 特别方便，速度也很快，毕竟大多数使用 Markdown 的场景都和 html 有关。

通过 css 参数可以自定义样式。

```sh
# Markdown 转 html
pandoc example.md -o example.html --css="github-markdown.css"
```

#### Markdown 转 PDF

Markdown 转 **PDF** 有点麻烦，因为 Markdown 是个没有排版功能的格式。

事实上，无论源格式是什么，Pandoc 都会将文档转为中间格式，然后再借助 PDF 引擎完成转换。因此关于 PDF 的转换放到了 [单独的部分](#pdf)。

#### Markdown 转 PPTX

Markdown 转 **PPTX** 默认按照 _二级标题_ 分页。因此，每个二级标题后的内容不应太长，否则会显示不下。不过其实用 **Microsoft PowerPoint** 的时候分页也是个很烦人的问题。

```sh
# Markdown 转 pptx
pandoc example.md -o example.pptx
```

另一个工具 [Marp](Marp.md) 专门用来把 Markdown 转为幻灯片，其中也包括了 **PPTX** 格式的幻灯片。在这个特定功能上可能 Marp 更好用一点。

#### Markdown 转 Markdown

虽然看上去这个转换很没意义，但众所周知，Markdown 最大的缺陷就是各标准不统一。

从表面上看，Markdown 规范只有 GFM、CommonMark 这几种；但在现实里，几乎每个应用/平台都有自己的 Markdown 标准。Obsidian/Pandoc 都有自己独特的 Markdown 语法，GFM 标准也不足以完全描述 GitHub 上 `README.md` 的所有特性，更别说还有像知乎这种支持 Markdown 的社交平台，其千奇百怪的 Markdown 特性总能时不时地给你一点惊喜。因此，从 Markdown 到 Markdown 的转换是很有必要的。

虽然进行这种转换的工具非常多，甚至简单的正则替换效果也很不错，但 Pandoc 无疑是功能最强大的。

Pandoc 支持的 Markdown 规范非常多

- **markdown** 为 Pandoc 增强版 Markdown
- **markdown_strict** 为原始 Markdown
- **markdown_phpextra** 为 PHP Markdown Extra
- **markdown_mmd** 为 MultiMarkdown
- **markdown_github** 为旧版 GitHub Flavored Markdown
- **commonmark** 为 CommonMark 基础
- **commonmark_x** 为 CommonMark 扩展
- **gfm** 为新版 GitHub Flavored Markdown

可以列出各标准的所有特性

```sh
# 查看 markdown 的所有特性
pandoc --list-extensions=markdown
# 查看 gfm 的所有特性
pandoc --list-extensions=gfm
# 查看 commonmark 的所有特性
pandoc --list-extensions=commonmark
```

Pandoc 可以通过启用/禁用非常细分的 Markdown 特性来直接转换文件

```sh
# 将所有表格转为简单表格
pandoc input.md -o output.md --from markdown --to markdown+simple_tables-grid_tables-multiline_tables-pipe_tables
```

此外 Pandoc 还支持编写 _Lua_ 脚本以实现自定义过滤

```lua
-- shift-headers.lua
-- 将所有标题级别减一
function Header(el)
  if el.level == 1 then
    return {}
  else
    el.level = el.level - 1
    return el
  end
end
```

通过 `--lua-filter` 指定脚本

```sh
pandoc input.md -o output.md --lua-filter="shift-headers.lua"
```

过滤器的详细写法请参考 [官方文档](https://pandoc.org/lua-filters.html)

#### Markdown 转 Plain

如果不想要 Markdown 中的任何标记，可以用 Pandoc 将其转为平文本

```sh
pandoc input.md -o output.txt -t plain
```

> [!tip] 换行问题
>
> 将文本转为文本时，加上 `--wrap=preserve` 选项，以防止 Pandoc 自动换行

### PDF

Pandoc 通过将文档转为另一种格式，再使用 PDF 引擎生成 PDF。引擎有很多种，[官方文档](https://pandoc.org/MANUAL.html#option--pdf-engine) 里有详细的列表。引擎会决定使用哪种中间格式；或者也可以只指定中间格式，然后使用该格式的默认引擎。

中间格式我一般会选择 LaTeX、Typst 或 HTML 中的一个

- **LaTeX** 推荐使用 _lualatex_ 引擎，对中文、数学公式的支持最好。不过 LaTeX 坑有点多，比如编译慢、安装环境很复杂，且默认的模板效果很差
- **Typst** 引擎指定 _typst_ 就行，默认的排版和样式就很不错。
- **HTML** 引擎默认为 _weasyprint_。最大的优势是样式很丰富 ~~css 太强大了~~，但排版效果不太好。个人认为 pandoc 支持的引擎都不如 `chrome`，因此如果要通过 **HTML** 转 **PDF**，建议先转为 **HTML**，再使用 [chrome-headless 的打印功能](../网络/Chrome.md#无头模式) 生成 **PDF**

```sh
# Markdown 通过 LaTeX 转 PDF
pandoc -s example.md -o example.pdf --pdf-engine=lualatex --template="eisvogel.latex" -V CJKmainfont="Microsoft YaHei UI"
# Markdown 通过 Typst 转 PDF
pandoc -s example.md -o example.pdf --pdf-engine=typst -V mainfont="Microsoft YaHei UI"
# Markdown 通过 HTML 转 PDF
pandoc -s example.md -o example.pdf --pdf-engine=weasyprint --css="github-markdown.css"
```

部分参数说明

- `-V` 参数向 Pandoc 传递了模板变量。模板变量也可以通过 `front-matter` 传递。你可以在 [官方文档](https://pandoc.org/MANUAL.html#variables) 里找到更多的可使用变量。
- `-s` 参数生成带有页眉、页脚的输出。对于 PDF 格式这个参数会自动设置，因此可省略。
- `--template` 用于指定模板，和 `--css` 一样，一般是文件的相对路径。

你可以在 [官方文档](https://pandoc.org/MANUAL.html#templates) 里找到关于使用模板的更详细说明。
