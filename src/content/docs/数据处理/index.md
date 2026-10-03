---
title: 数据处理
---

## 基本概念

本文中的数据处理特指使用工具对结构化或半结构化的静态数据进行操作。并且相比于二进制数据，本文更关注文本数据。另外文档、图片、视频等某种程度上也算是数据，但这些内容放到了 [文档](../文档/index.md) 章节中。

## 数据类型

数据类型包括多个部分，其中文件格式、结构模式、数据模型是我认为比较重要的部分。

### 文件格式

文件格式可以按编码方式进一步分为文本格式和二进制格式。

- 文本格式按照一种语法规范把数据编码为 ASCII、Unicode 等字符。
- 二进制格式把数据编码为二进制字节。

常见的文本数据格式包括 JSON / TOML / YAML / XML / CSV / TSV 等。

常见的二进制数据格式包括 Protobuf / Parquet 等。

### 结构模式

对于同一种格式，不同文件可以有不同的 schema。

schema 是数据的结构，或者说模式，其包括很多信息：

- 数据的字段数量
- 每个字段的键名
- 每个字段的值类型
- 字段是否可以为空
- 字段如何嵌套

比如对于如下 JSON 数据

```json
{
    "id": 1,
    "name": "Alice",
    "age": 25
}
```

其 schema 可以是

```txt
id: 整数，不能为空或者重复
name: 字符串，不能为空
age: 整数，不能为空，不能小于 0
```

### 数据模型

数据模型主要有三种，分别是表型数据、树型数据和图型数据。

- 表型数据，形状像表，具有记录式结构

    ```json
    [
        { "id": 1, "name": "张三", "age": 10 },
        { "id": 2, "name": "李四", "age": 11 },
        { "id": 3, "name": "王五", "age": 12 }
    ]
    ```

- 树型数据，形状像树，具有嵌套式结构

    ```json
    {
        "name": "学校",
        "children": [
            {
                "name": "一年级",
                "children": [{ "name": "张三" }, { "name": "李四" }]
            },
            {
                "name": "二年级",
                "children": [{ "name": "王五" }]
            }
        ]
    }
    ```

- 图型数据，形状像图，具有网络式结构

    ```json
    {
        "nodes": [
            { "id": 1, "name": "张三" },
            { "id": 2, "name": "李四" },
            { "id": 3, "name": "王五" }
        ],
        "edges": [
            { "source": 1, "target": 2, "type": "认识" },
            { "source": 1, "target": 3, "type": "讨厌" },
            { "source": 2, "target": 3, "type": "爱慕" }
        ]
    }
    ```

## 具体数据格式

### 表型数据

表型数据的文本格式通常使用 CSV / TSV

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

### 树型数据

树型数据的文本格式通常使用 JSON / YAML / TOML / XML

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

## 数据处理语言

对于数据处理，最主要的操作就是增删改查，或者称为 CRUD。

- Create 创建、增加
- Read 读取、查询
- Update 更新、修改
- Delete 删除

随着数据处理的各种工具不断发展，涌现出了一批用于数据处理的 DSL。其中最出名的两类 DSL 就是 jq 和 SQL。

### jq

jq 是用于查询 JSON 的 DSL，但其中的设计思路被广泛借鉴，形成了一系列 jq-like 语言。

查询 JSON 是一个无副作用的纯计算过程，因此 jq 天然就适合函数式编程。jq 本身也非常函数式。

- jq 的许多查询语句可以看作一个输入 JSON 输出 JSON 的匿名函数，因此可以通过管道进行组合
- jq 的 `map` / `select` / `reduce` 等接口也设计得非常标准。
- jq 变量更是默认不可变。

### SQL

SQL 是结构化查询语言，通常用来查询数据库、CSV、JSON 等结构化的数据，存在非常多种方言。

尽管 SQL 最初就是奔着声明式查询去设计的，但仍存在许多设计缺陷

- SELECT-first 违反实际的查询逻辑，显然我们需要先确定 FROM 哪个数据源，然后才能确定 SELECT 哪些字段
- SELECT 中嵌套了过多的逻辑，严重影响可读性
- 聚合与分组联系紧密，但前者写在 SELECT 里，后者是单独的 GROUP BY 操作
- 聚合后的数据无法使用 WHERE 进行筛选，必须改为 HAVING。

如今这些问题显然都被广泛注意到了。现在已经有一些 SQL 支持 FROM-first，甚至还有像 GoogleSQL 这种使用管道的 SQL 方言——每个操作的输入和输出都是表，所以各个操作可以在管道里自由组合。

## 工具

### jq 相关工具

- [jq](Jq.md) 命令行 JSON 处理器。jq 本体
- jaq 更现代的 jq，使用相同的 jq 语言但可以处理多种格式。类似的还有 `qq`
- [yq](Yq.md) 命令行 YAML 处理器。yq 目前有两种实现，其中 `mikefarah/yq` 使用不兼容 jq 的 jq-like 语言直接处理 YAML，而 `kislyuk/yq` 先把 YAML 转为 JSON 用 jq 处理后再转为 YAML
- sq 命令行 DB 处理器。jq 和 SQL 的缝合，用 jq 的语法实现 SQL 的功能
- mq 命令行 Markdown 处理器
- fq 命令行 Binaries 处理器。使用兼容 jq 的语言
- jnv 一个 jq 的交互式前端，可以实时查看查询结果

### SQL 相关工具

- [SQLite](SQLite.md) 关系型数据库，用 SQL 处理数据，支持读取 CSV、JSON 等各种文件。数据库本身非常轻量，可以用来处理日常任务或嵌入应用程序中
- DuckDB 更现代的关系型数据库，支持 FROM-first、列式存储等特性，很适合 OLAP
- usql 数据库客户端，提供统一的交互式 SQL Shell，有语法高亮、自动补全等功能
- sqruff 用于格式化 SQL 代码

### 纯文本

纯文本处理工具可以处理任意文本，并不要求数据本身具有某种格式。

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

### 代码

代码存在语法，因此可以看作一种结构化的文本——虽然这种结构并不明显。

- ast-grep 代码检索和修改工具，其搜索方式类似 `grep`，但匹配 `AST`（抽象语法树）而非文本，因此能够更安全地进行重构
- [bat](Bat.md) 显示文件内容，类似 `cat` 但更现代。支持语法高亮、显示行号等功能
- chroma 语法高亮器，可对输入进行语法高亮，支持非常多的语言和主题
- [cloc](Cloc.md) 统计代码行数，类似的工具还有 `tokei`

### 结构化数据

结构化数据处理工具用于具有特定格式的文本数据。由于格式的存在，这些工具可以包含更多功能，比如验证/转换格式、查询/替换特定字段的值等。

与 [jq](#jq-相关工具) / [sql](#sql-相关工具) 相关的工具已放入专门的小节中。

- taplo 命令行 TOML 处理器
- xq 命令行 XML 处理器
- qsv 命令行 CSV/TSV 处理器
- miller 可以处理多种格式的数据，不过更适合表格型数据
- dasel 类似前者，不过更适合嵌套型数据
- Datasette 用于探索和发布数据，可将 CSV、SQLite 等格式的文件变成一个能交互的 Web 页面

> [!note] VSCode 扩展
> 一些 VSCode 扩展可以为数据格式提供语言服务，因此也归类到文本处理工具中。VSCode 已经自带了对 JSON 的支持
>
> - [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml) 提供了 TOML 的语言服务
> - [YAML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) 提供了 YAML 的语言服务
> - [XML](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml) 提供了 XML 的语言服务
> - [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) 提供了 CSV/TSV 的语言服务

### 二进制

二进制处理工具用来处理二进制数据

与 [jq](#jq-相关工具) / [sql](#sql-相关工具) 相关的工具已放入专门的的小节中。

- rga 类似 `ripgrep` 但可以处理 PDF、压缩文件等各种非文本数据
- ExifTool 读取和编辑文件的元信息
