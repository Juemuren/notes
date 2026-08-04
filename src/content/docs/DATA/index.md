---
title: 数据处理工具
---

## 基本概念

相比于二进制数据，本文更关注文本数据。另外文档、图片、视频等某种程度上也算是数据，但这些内容放到了 [文档](../DOC/index.md) 章节中。

## 格式

### 嵌套型数据

| 特性         | JSON | YAML | TOML | XML  |
| :----------- | :--- | :--- | :--- | :--- |
| **人类读写** | 较难 | 最易 | 较易 | 最难 |
| **解析速度** | 最快 | 最慢 | 较快 | 较慢 |

#### JSON

JSON 全称为 `JavaScript 对象表示法`。顾名思义，JavaScript 就使用这种格式表示对象，因此 JavaScript 序列化和反序列化 JSON 都非常方便。

JSON 是机器友好的，因此解析起来特别快速。但 JSON 不是人类友好的，文件中充斥着各种定界符和分隔符，非常影响阅读和修改。

JSON 经常会在和 JavaScript 有关的场合被用到，比如通过 HTTP 传输的数据、VSCode 的配置文件等。

#### YAML

YAML 很类似 JSON，但为便于人类读写而进行了许多优化，比如使用缩进取代了定界符。

YAML 是人类友好的，内容紧凑且有许多实用的语法特性，比如注释。但这也导致它的解析速度比 JSON 慢很多。

YAML 常被用于配置文件，_Docker_/_Kubernetes_/_GitHub Actions_ 等都选择了 YAML。

#### TOML

TOML 算是 INI 的升级版。TOML 使用键值对，并通过分节和点路径扁平化了树状结构。

TOML 是人类友好的，不过对于非常深的嵌套，可能不如 JSON/YAML/XML 直观。

TOML 被一些新兴语言用作项目配置文件，比如 Rust 和 Julia，而 Python 社区也逐渐接受了 TOML。

#### XML

XML 全称为 `可扩展标记语言`，使用闭合标签和附加属性构成元素，通过嵌套元素来表示层次结构。

XML 不是人类友好的，且由于其特性较多，解析器实现困难，解析速度慢，因此也很难算是机器友好。

XML 早期在 Web 中常用于传输数据，不过目前已几乎被 JSON 取代。现在 XML 更常用作软件的内部格式，比如 Microsoft Office 的 DOCX/PPTX/XLSX 格式解压后其实就是一些包含了 XML 的文件。

### 表格型数据

| 特性       | CSV    | TSV    |
| :--------- | :----- | :----- |
| **分隔符** | 逗号   | 制表符 |
| **可读性** | 一般   | 更好   |
| **通用性** | 更常见 | 不常见 |

#### CSV

CSV 全称为 `逗号分隔值`。顾名思义，CSV 通过逗号隔开每个值。

CSV 在电子表格、数据库导入/导出、数据科学等领域中很常见。

#### TSV

TSV 全称为 `制表符分隔值`。顾名思义，TSV 通过制表符隔开每个值。

TSV 相比 CSV 更易于人工编辑，因为制表符不常出现在数据中，因此很少需要转义，且制表符更容易在编辑器中对齐。

## 工具

### 文本处理

#### 无格式

无格式文本处理工具用于没有特定格式的文本数据。

> [!note] Linux 文本处理工具
> 多数 Linux 系统都预装了一大堆用于文本处理的工具，比如
>
> - 通用处理 `awk`
> - 编辑 `sed`
> - 查找 `grep`
> - 截取 `cut`/`head`/`tail`
> - 合并 `paste`/`join`
> - 拆分 `split`/`csplit`
> - 排序 `sort`
> - 去重 `uniq`
> - 统计 `wc`
> - 替换 `tr`
> - 比较 `comm`/`diff`
> - 格式化 `nl`/`column`
> - 随机化 `shuf`
> - 编码转换 `iconv`/`basenc`
>
> 尽管本文不详细介绍这些工具，但它们同样是非常有用的，并且启发了很多新工具。

- [fzf](Fzf.md) 模糊查找器，可以看作一个交互式的 `grep`。fzf 提供了 shell 集成方法，能够显著改善终端的使用体验
- [ripgrep](Ripgrep.md) 文本查找器，类似 `grep` 但更现代
- [sd](Sd.md) 文本查找替换器，类似 `sed` 但更现代
- [delta](Delta.md) 对 git/diff 等命令的输出进行语法高亮和分页，方便查看
- jc 把很多常用命令的输出转为 JSON 格式，方便后续处理
- argos-translate 命令行离线翻译器，基于神经网络模型

#### 有格式

有格式用于具有特定格式的文本数据。由于格式的存在，这些工具可以包含更多功能，比如验证/转换格式、查询/替换特定字段的值等。

代码存在语法，因此也可以看作一种文本格式，虽说代码算不算数据可能有点争议。

- ast-grep 代码检索和修改工具，其搜索方式类似 `grep`，但匹配 `AST`（抽象语法树）而非文本，因此能够更安全地进行重构
- [bat](Bat.md) 显示文件内容，类似 `cat` 但更现代。支持语法高亮、显示行号等功能
- chroma 语法高亮器，可对输入进行语法高亮，支持非常多的语言和主题
- [cloc](Cloc.md) 统计代码行数，类似的工具还有 `tokei`

用来处理一种文本数据格式的工具

- [jq](Jq.md) 命令行 JSON 处理器
- [yq](Yq.md) 命令行 YAML 处理器
- taplo 命令行 TOML 处理器
- xmlstarlet 命令行 XML 处理器
- mdq 命令行 Markdown 处理器
- qsv 命令行 CSV/TSV 处理器

用来处理多种文本数据格式的工具

- miller 可以处理多种格式的数据，不过更适合表格型数据
- dasel 类似前者，不过更适合嵌套型数据
- [SQLite](SQLite.md) 关系型数据库，用 SQL 处理数据，支持读取 CSV、JSON 等各种文件。数据库本身非常轻量，可以用来处理日常任务或嵌入应用程序中
- Datasette 用于探索和发布数据，可将 CSV、SQLite 等格式的文件变成一个能交互的 Web 页面

> [!note] VSCode 扩展
> 一些 VSCode 扩展可以为数据格式提供语言服务，因此也归类到文本处理工具中。VSCode 已经自带了对 JSON 的支持
>
> - [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml) 提供了 TOML 的语言服务
> - [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) 提供了 YAML 的语言服务
> - [XML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml) 提供了 XML 的语言服务
> - [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) 提供了 CSV/TSV 的语言服务

### 二进制处理

二进制处理工具用来处理二进制数据

- fq 类似 `jq` 但用于二进制数据
- rga 类似 `ripgrep` 但可以处理 PDF、压缩文件等各种非文本数据
- ExifTool 读取和编辑文件的元信息
