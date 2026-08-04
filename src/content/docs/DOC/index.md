---
title: 文档工具
---

## 基本概念

除了传统意义上的文档外，图片、音视频等广义上的文档也放在了本章里。

## 格式

### 文本文档

文本文档指所有内容都以文本形式进行存储的文档。这种方式有一些很明显的好处

- 通用，可以在任何有文本编辑器的设备上对其进行修改和查看
- 版本控制友好，Git 的 diff/merge 等功能都可以正常使用

文本文档本身可以看作一种语言，它们有不同的类型，比如

- 标记语言。这种语言可以标记文档的结构、内容，以及基本的样式/格式，典型例子是 Markdown/HTML
- 排版语言。这种语言不仅可以标记文档，还可以对其进行排版，甚至有函数、变量等编程特性，典型例子是 LaTeX/Typst

#### Markdown

Markdown 是一种标记语言，可理解为语法更简单的 **HTML**，因此算是 _HTMLite_。但同时大多数 Markdown 标准又支持内嵌 **HTML** 元素，因此 HTML 能做的 Markdown 都能做，算是个 _SuperHTML_。

我非常喜欢 Markdown 格式。虽然 Markdown 也有缺点，但我认为这就是最好的格式

1. 优点
   - 以文本形式存储。如前所述，这使得 Markdown 具有极强的通用性，且便于进行版本控制。
   - 语法简单。Markdown 的语法非常接近纯文本，没有需要记忆的关键字。
   - 完美的源格式。Markdown 可以通过格式转换工具转换成 HTML、PDF、PPTX 等适合展示的格式，也可以通过静态网站生成器生成可部署的静态网站。Markdown 配合各种工具真正做到了 **内容和样式的分离**，也真正做到了 **一种形式编写多种形式展示**。
   - 应用广泛。Markdown 是软件工程里最主流的文档格式，同时 Github 的自述文件、LLM 的原始输出也基本都是 Markdown 格式。
2. 缺点
   - 没有统一的标准。Github、Obsidian、Pandoc 等都有自己扩展的 Markdown 语法。如果过度依赖某个专有的特性，那么文档迁移会有点麻烦。
   - 排版和样式的功能欠缺。这导致 Markdown 转换为 PDF 会比较麻烦，通常要借助别的格式。

#### HTML

HTML 全称为 `超文本标记语言`。HTML 相比 PDF 更注重内容和样式而不是排版，因此不适合对排版有严格要求的场合。

HTML 使用基于 XML 的语法，并且可以嵌入或引用 CSS/JavaScript。浏览器能够渲染 HTML、解析 CSS、运行 JavaScript。JavaScript 使得 HTML 可以交互，因此 HTML 不仅是一个文档，更是一个应用。

HTML 可以直接用文本编辑器编辑，也可以通过 Markdown 等格式转换而来。HTML 是 Web 应用的核心，有很多框架可以快速制作 Web 应用，可阅读 [Web 开发](../APP/Web.md) 章节了解更多。

#### LaTeX

LaTeX 是一个强大的写作排版系统，其相比 Markdown 有一些显著的区别

- 语法更复杂。Markdown 使用直观简洁的符号，而 LaTeX 使用冗长的命令，学习曲线很陡峭
- 排版功能更好。Markdown 事实上并没有排版功能，而 LaTeX 则是排版领域的顶点
- 应用更局限。静态网站生成器、自述文件等对 Markdown 支持度很高，对 LaTeX 则几乎没有支持

LaTeX 最大的贡献也许就是完整定义了一套数学符号的语法。数学公式算是排版中最大的难题，而 LaTeX 则很好地解决了。这种语法在一些别的格式中也得到了支持，比如 Markdown。下面就是我用 Markdown 内嵌 TeX 写的麦克斯韦方程组微分形式，而这被静态网站生成器转为 **HTML** 后由 `KaTeX` 进行了渲染

源代码

```tex
\begin{aligned}
\nabla \times \vec{\mathbf{B}} - \frac1c \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}} + \frac1c \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{aligned}
```

渲染效果

$$
\begin{aligned}
\nabla \times \vec{\mathbf{B}} - \frac1c \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\
\nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}} + \frac1c \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0
\end{aligned}
$$

LaTeX 有很多的发行版，比如 `Texlive` 和 `MikTeX`，我个人更喜欢后者。另外还有一个更现代的工具 `Tectonic`，它不安装完整的 TeX 系统，而是在编译时自动获取宏包并缓存到本地。

#### Typst

Typst 类似 LaTeX，不过针对 LaTeX 的许多问题进行了改进。个人体验下来，相比 LaTeX 的主要优势为

- 编译速度更快。Typst 生成 PDF 的速度比 LaTeX 快非常多
- 语法更简单。Typst 语法比 LaTeX 更简洁和直观，学习曲线也更平缓。当然这一点两者都比不了 Markdown
- 中文支持更友好。LaTeX 编译中文文档会比较麻烦，而 Typst 则根本不需要额外设置，原生就支持 UTF-8 字符集

当然，Typst 也有一些缺点，这些缺点主要是因为 Typst 太年轻。LaTeX 有丰富的模板，无数的宏包，到处都是教程和指南，出版社、期刊等接受度也更高。不过我还是希望 Typst 能够成功，让写作排版多一个选择。

### 二进制文档

二进制文档指使用二进制格式进行存储的文档。相对于文本文档，这样做会有一些缺点

- 不通用，文件必须使用特定的软件才能编辑和查看
- 版本控制不友好，Git 无法使用 diff/merge 等功能

二进制文档也有不同的实现方式

- 容器格式。这种格式本质上也用文本存储所有内容，只不过进行了打包和压缩，典型例子是 DOCX/PPTX/EPUB
- 平面格式。这种格式使用指令来描述页面如何绘制，并可能对文本、资源进行压缩，典型例子是 PDF

#### DOCX

DOCX 类似 LaTeX，是一个写作排版系统。DOCX 以 _所见即所得_ 的方式进行写作排版，因此经常被滥用：很多人将 DOCX 作为最终交付的文档格式，尽管它是为写作而非阅读设计的。

DOCX 是一种开放的文档格式，其本质是一个压缩包，解压后会看到 XML 等各种文件。

一般不直接修改 DOCX 的内部文件，而是使用专门的软件进行编辑，比如 **Microsoft Word** 或 **LibreOffice Writer**。Markdown、LaTeX 等也可以借助工具转为 DOCX。

尽管 DOCX 在普通用户中非常流行，但多数开发者都不喜欢这种格式。原因有很多，比如

- 不以纯文本形式存储。如前所述，这使得 DOCX 不通用且版本控制不友好。
- 没有强制的规范，容易写出低质量的文档。比如，对于样式的更改，很多人只是选中几个字然后手动调整，不懂得应该先创建一个新的样式，然后再将选中的文字改成自定义样式，这会让后续的修改、维护变得麻烦

#### PPTX

PPTX 将内容以幻灯片的方式进行展示，一般用于现场演示。

> [!note] PPT 和幻灯片
> 对于幻灯片（Slide），[维基百科](https://en.wikipedia.org/wiki/Presentation_slide) 上的解释是
>
> > 幻灯片是演示文稿的单页。一组幻灯片称为幻灯片套件。幻灯片演示是在电子设备或投影屏幕上展示一系列幻灯片或图像。
>
> 因此虽然 PPT/PPTX 现在成为了幻灯片的同义词，但它始终只是一种能进行幻灯片演示的格式。
>
> 如果你只是需要以幻灯片的方式展示内容，那么你不一定非得选择 PPTX。HTML 同样能进行幻灯片演示，而且效果并不差。

PPTX 和 DOCX 的实现类似，本质也是个包含了 XML 等各种文件的压缩包。

PPTX 通常要使用别的软件进行编辑，比如 **Microsoft PowerPoint** 或 **LibreOffice Impress**。LaTeX 可以用 Beamer 制作 PPTX，Markdown 也能借助工具转成 PPTX。

#### EPUB

EPUB 全称为 `电子出版物`。EPUB 类似 HTML 专门为电子设备的阅读体验而设计，不像 PDF 那种专门为打印成纸张而设计。

EPUB 本质上也是一个压缩包，里面包含了 HTML、CSS、XHTML、XML 等文件，可以看作是对静态 Web 应用的打包。

EPUB 通常要使用别的工具进行编辑，比如 **Sigil** 或 **calibre**。Markdown 和 HTML 等格式也能借助工具制作 EPUB。

#### PDF

PDF 全称为 `可携带文档格式`。对排版有严格需求的场合（比如书籍出版、论文打印）通常都会使用 PDF 格式。

PDF 内部使用类似 PostScript 的语言来定义页面的内容和样式，并对文本、资源等数据进行了压缩，整个文档是自包含和扁平化的。

虽然有软件可以直接编辑 PDF 文件，但一般不这么做，而是将别的更易编辑的格式转为 PDF 格式。DOCX、LaTeX、Typst 直接就可以将文档转为 PDF 格式，而 Markdown、HTML 等借助工具也可以做到。

### 矢量图

矢量图本质是数学描述，渲染器会根据这些描述绘制出图片。这种设计使其具有以下特性

- 可以无限放大而不变模糊
- 文件大小不因图形尺寸而改变
- 可以编辑图形对象

#### SVG

SVG 是一种流行的矢量图格式，直接用文本进行存储。

SVG 使用基于 XML 的语法，支持编写 CSS 来控制外观，并且可以绘制动画。

SVG 非常适合 Web 应用，由于其直接以文本进行存储，因此可以通过代码控制图形，从而实现非常强大的交互。

### 位图

位图本质是像素阵列，渲染器会将每个像素放置在一个网格中。这种设计使其具有以下特性

- 放大后会变模糊
- 图形尺寸越大，占用的空间就越大
- 只能进行像素级的编辑

#### PNG

PNG 是一种流行的位图格式，存储为复杂的二进制格式。

PNG 可以无损压缩，支持多种颜色模式，支持透明通道。

PNG 适合需要无损压缩或者透明通道的场合，比如有透明背景的图片、需要无损保存细节的图像等。

## 工具

### 转换

用来在不同格式之间进行转换的工具

- [Pandoc](Pandoc.md) 文档转换工具，支持多种格式，包括 Markdown、LaTeX、Typst、DOCX、HTML、PDF、PPTX 等
- MarkItDown 微软开源的将各种格式转为 Markdown 的工具。OCR 功能需要安装插件并配置 LLM Client
- Tesseract 将图片转为文字的工具，使用 OCR 技术，可识别多种语言
- OCRmyPDF 在 PDF 上添加文本层，OCR 引擎为 Tesseract
- [Chrome](../NET/Chrome.md) 虽然是浏览器，但提供了 Headless 模式，可以用脚本批量将 HTML 打印为 PDF

### 文档

#### 文档阅读

用于阅读文档的工具

- glow 终端 Markdown 渲染器，功能非常有限，但至少比直接阅读源代码更舒服一点
- [bat](../DATA/Bat.md) 更现代的 cat，也能用于在终端阅读 Markdown，但功能上远不止于 Markdown
- SumatraPDF 开源的 PDF/EPUB 阅读器，非常轻量和快速，没有臃肿的功能。只能用于 Windows 平台
- Readest 功能丰富的电子书阅读器，可跨平台，支持桌面端和移动端

#### 文档编辑

用于制作或编辑文档的工具。

对于 Markdown、HTML、LaTeX、Typst 这种存储为纯文本的文档，所有文本编辑器都可以对其进行修改。此处不列举这些文本编辑器，详见 [编辑器](../EDITOR/index.md) 章节

- LibreOffice 可以认为是开源版的 `Microsoft Office`，包含了 DOCX、PPTX、PDF 等格式的编辑器
- [Marp](Marp.md) 一个用 Markdown 制作幻灯片的工具，有丰富的社区主题且提供 VSCode 扩展
- Sigil 一个 EPUB 编辑器
- StirlingPDF 一个 PDF 编辑器
- [PDFcpu](PDFcpu.md) 一个可以对 PDF 文档进行各种处理的命令行工具。类似的还有 `qpdf`、`poppler`、`MuPDF`、`GhostScript`

> [!note] VSCode 扩展
> 一些 VSCode 扩展能为文档编辑提供便利，甚至可以为原有的文档格式提供新的特性，因此将其归类到文档编辑工具中
>
> - [Foam](https://marketplace.visualstudio.com/items?itemName=foam.foam-vscode) 为 Markdown 扩展 **双链**、**区块**、**嵌入** 等语法，并新增 **图谱**、**查询**、**链接预览**、**每日笔记** 等功能，目标是类似 `Obsidian` 那样用 Markdown 打造个人知识库。
> - [Markdown Extended](https://marketplace.visualstudio.com/items?itemName=jebbs.markdown-extended) 为 Markdown 扩展 **上标**、**下标**、**下划线**、**标记**、**缩写**、**属性** 等语法
> - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) 全面的 Markdown 增强，提供了创建和更新目录、数学公式自动补全、常用快捷键等功能
> - [Markdown Word Count](https://marketplace.visualstudio.com/items?itemName=CurlyBrackets.markdown-word-count) 统计 Markdown 中的字符数量
> - [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable) 增强了 Markdown 的表格功能，包括快速插入行/列、格式化/美化表格、将 CSV/TSV 转为 Markdown 表格等
> - [Markdown Image](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image) 增强了 Markdown 的图片功能，可以更方便地将图片插入 Markdown 文档中
> - [Markmap](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) 把 Markdown 文档变成思维导图
> - [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop) 为 LaTeX 提供了编辑器支持
> - [Tinymist Typst](https://marketplace.visualstudio.com/items?itemName=myriad-dreamin.tinymist) 为 Typst 提供了编辑器支持
> - [GitDoc](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.gitdoc) 使用 Git 功能自动备份文档

#### 质量检查

用于拼写检查的工具

- typos 一个拼写检查工具，提供 CLI 和 VSCode 扩展。使用黑名单机制，只检查常见的拼写错误，未知单词不视为错误
- cspell 一个拼写检查工具，提供 CLI 和 VSCode 扩展。使用白名单机制，词典以外的全部视作错误

用于标点检查的工具

- autocorrect 专门针对 CJK 和英文混合编写的场景，主要用于检查标点或空格是否规范

用于语法检查的工具

- ltex+ 基于 LanguageTool 的语法检查工具，提供 CLI 和 VSCode 扩展。适用于包括中文、英文在内的多种语言

用于格式检查的工具

- [markdownlint](Markdownlint.md) 一个 Markdown 静态检查工具，提供 CLI 和 VSCode 扩展
- dprint 格式化工具，支持包括 Markdown / YAML 等多种语言，可以看作 prettier 的 Rust 改进版

#### 代码嵌入

让文档里嵌入可执行代码的工具。这些工具通常都会使用自定义的文件格式。

- [Jupyter](../EDITOR/Jupyter.md) 交互式编程笔记本，功能非常强大。我把它放入了 _编辑器_ 这一章节
- [Quarto](Quarto.md) 基于 Pandoc 和 Jupyter 构建的开源科技出版系统

#### 代码文档生成器

能够根据源代码自动生成文档的工具。这些工具能够理解语言的接口定义，但通常还需要以约定好的注释格式提供额外的接口信息。

大多数编程语言都有官方的文档生成工具，通常这就是最好的。只有某些无官方实现的语言（点名 _C/C++_）才需要使用别的工具。

- [Doxygen](Doxygen.md) 可以导出 PDF、HTML 等格式，支持多种语言，但一般只用于 C/C++ 项目

#### 静态网站生成器

用于生成静态网站的工具。这些工具通常会根据配置文件中指定的主题、样式等信息，将 Markdown 文档转为可直接部署的静态网站。

静态网站可以分为几种常见的类型，每种类型都有相对最合适的静态网站生成器

- 文档，内容高度结构化，按清晰的层级目录自上而下组织，可能存在深度嵌套的树状结构
- 博客，内容由相对独立的文章组成，通过时间线、分类、标签和归档形成扁平结构
- 笔记，内容之间互相关联，依靠链接、反向链接、标签和主题聚合等方式形成复杂的网络状结构

适合文档的

- [MkDocs](MkDocs.md) 用 Python 实现的静态网站生成器
- VitePress 基于 Vite 和 Vue 的静态网站生成器，适合需要现代前端体验的文档网站

适合博客的

- [Hugo](Hugo.md) 用 Go 实现的静态网站生成器，使用 Go Template 模板语言
- Zola 用 Rust 实现的静态网站生成器，使用 Tera 模板语言

适合笔记的

- Quartz 用于将笔记发布到 Web 的静态网站生成器，能够兼容 Obsidian 的许多特性

相对通用的

- Astro 内容驱动 Web 框架，可以集成 React / Vue / Svelte 等其余的框架

### 图片

#### 图片查看

用于查看图片的工具

- ImageGlass 开源的跨平台图片查看器，附带了简易的编辑功能

#### 图片编辑

用于制作或编辑图片的工具

- [Mermaid](Mermaid.md) 一个基于 JavaScript 的代码生成图表工具，只能制作特定类型的图表。类似的工具还有 `plantUML`
- [TikZ](TikZ.md) 一个 LaTeX 生态的代码生成图片工具，理论上可以绘制所有类型的图片
- Graphviz 代码生成图片的工具，`Doxygen`/`plantUML` 等都使用它作为底层引擎
- QRencode 二维码生成工具，可对输入的文本进行编码
- Krita 数字绘画工具
- Inkscape 矢量图编辑器
- GIMP 位图编辑器
- [ImageMagick](ImageMagick.md) 一个可以对图片进行各种处理的命令行工具。类似的还有 `chafa`、`resvg`

### 音视频

#### 音视频播放

用于播放音视频的工具

- VLC 开源的多媒体播放器

#### 音视频编辑

用于制作或编辑音视频的工具

- Manim 用来生成数学动画的 Python 库，最初由 3blue1brown 制作，现在更推荐使用社区维护的版本
- VHS 终端录像生成工具。和 `script`、`asciinema` 等工具不同，vhs 可根据配置文件自动生成录像，而非手动录制屏幕
- OBS 屏幕录制和实时推流工具
- Ardour 数字音频工作站
- MuseScore 记谱与作曲工具
- Kdenlive 视频编辑器。类似的工具还有 `DaVinci Resolve`，不过没有开源
- Audacity 音频编辑器
- Blender 一个 3D 创作套件，包括建模、绑定、动画、仿真、渲染、合成、运动跟踪和视频剪辑
- [FFmpeg](FFmpeg.md) 一种可以对音视频进行各种处理的命令行工具
