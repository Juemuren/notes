---
title: Jq
---

## 简介

jq 是一个命令行 JSON 处理器

## 安装

```sh
# Windows
scoop install jq
```

## 使用

jq 使用路径访问 JSON 中的字段，并且可以一直嵌套下去

- `.` 表示整个文件
- `.attr` 如果是对象，表示对象的 attr 字段
- `.[]` 如果是数组，表示数组的所有元素
- `.[1]` 如果是数组，表示数组第 2 个索引的元素
- `.attr.value` 表示 attr 字段的 value 字段

jq 有自己的语言（就像 `awk` 那样），支持函数等高级编程特性，详细说明请阅读 [官方文档](https://jqlang.org/manual/)。

### 查询

```sh
# 输出 114514
echo '{ "num1": 114514, "num2": 1919180 }' | jq '.num1'
# 输出 1919180
echo '[ 114514, 1919180 ]' | jq '.[1]'
```

### 修改

```sh
# 输出 { "num1": 123456, "num2": 1919180 }
echo '{ "num1": 114514, "num2": 1919180 }' | jq '.num1 = 123456'
# 将输出写入新文件
cat old.json | jq '.key = "value"' > new.json
```

### 脚本

```sh
# 运行 script.jq 中的查询/修改
cat data.json | jq -f script.jq
```

jq 语言是有模块系统的，可以跨文件进行代码复用。只需在文件开头写上

```jq
# 导入 utils.jq
include "utils";
# 导入 utils.jq 但使用别名
import "utils" as u;
```

就会自动将 `utils.jq` 作为模块加载进来。如果导入使用了别名，需要借助 `NAME::xxx` 来使用模块。

## 示例

jq 处理 JSON 数据要比传统的 `awk`/`sed` 方便许多。下面展示一些我自己实际使用 jq 的场景。

---

我想要知道 Scoop 的某个包有哪些二进制文件，会不会和 `PATH` 中已存在的程序冲突。这时可以直接查询 manifest 文件

```sh
scoop cat xxxx | jq '.bin.[]'
# 如果输出有路径前缀，进行去除
scoop cat coreutils | jq '.bin.[] | sub(".*\\\\"; null)'
# 如果输出混合了多种类型，进行筛选和预处理
scoop cat unxutils | jq '.bin.[] | strings | sub(".*\\\\"; null)'
# 得到纯净的输出后就可以开始后续处理了
scoop cat xxx | jq '...' | tr -d '\r' | xargs which
```

---

我要为 MAA 准备搓玉/不搓玉、卖玉/不卖玉共 4 份基建配置，但其实这些配置只有几处不同。此时可以选一个配置作为基准来衍生出别的配置。这样修改就能用简单的脚本进行同步，避免遗漏而导致的错误。

首先编写转换脚本

```jq
# both.jq
# 将 不搓玉/不卖玉 转换为 搓玉/卖玉

def update_description:
  .description = "搓玉/卖玉";

def update_manufacture($index; $operators):
  .rooms.manufacture[$index].product = "Originium Shard" |
  .rooms.manufacture[$index].operators = $operators;

def update_trading($index):
  .rooms.trading[$index].product = "Orundum";

update_description |

.plans |= map(
  update_description |
  if .name == "早班" then
    update_manufacture(0; ["艾雅法拉", "地灵", "炎熔"]) |
    update_trading(0)
  elif .name == "晚班" then
    update_manufacture(0; ["火神", "泡泡", "褐果"]) |
    update_trading(0)
  end
)
```

然后执行转换

```sh
jq -f both.jq my-243-2-normal.json > my-243-2-both.json
```

可以借助模块来提高代码的复用性

```jq
# utils.jq
def update_description($description):
  .description = $description;

def update_manufacture($index; $operators):
  .rooms.manufacture[$index].product = "Originium Shard" |
  .rooms.manufacture[$index].operators = $operators;

def update_trading($index):
  .rooms.trading[$index].product = "Orundum";

# both.jq
include "utils";

update_description("搓玉/卖玉") |
.plans |= map(
  update_description("搓玉/卖玉") |
  if .name == "早班" then
    update_manufacture(0; ["艾雅法拉", "地灵", "炎熔"]) |
    update_trading(0)
  elif .name == "晚班" then
    update_manufacture(0; ["火神", "泡泡", "褐果"]) |
    update_trading(0)
  end
)

# make.jq
include "utils";

update_description("搓玉/不卖玉") |
.plans |= map(
  update_description("搓玉/不卖玉") |
  if .name == "早班" then
    update_manufacture(0; ["艾雅法拉", "地灵", "炎熔"])
  elif .name == "晚班" then
    update_manufacture(0; ["火神", "泡泡", "褐果"])
  end
)

# sale.jq
include "utils";

update_description("不搓玉/卖玉") |
.plans |= map(
  update_description("不搓玉/卖玉") |
  if .name == "早班" then
    update_trading(0)
  elif .name == "晚班" then
    update_trading(0)
  end
)
```

---

我有一个 JSON 格式的书签 `bookmarks.json`

```json
{
  "bookmarks": [
    {
      "title": "前言",
      "page": 2
    },
    {
      "title": "目录",
      "page": 11
    },
    {
      "title": "第 1 章 引言",
      "page": 16,
      "kids": [
        {
          "title": "1.1 异构并行计算",
          "page": 17
        },
        {
          "title": "1.2 现代 GPU 的体系结构",
          "page": 21
        },
        {
          "title": "1.3 为什么需要更高的速度和并行化",
          "page": 23
        },
        {
          "title": "1.4 应用程序的加速",
          "page": 24
        },
        {
          "title": "1.5 并行编程语言和模型",
          "page": 26
        },
        {
          "title": "1.6 本书的总体目标",
          "page": 27
        },
        {
          "title": "1.7 本书的组织结构",
          "page": 28
        },
        {
          "title": "参考文献",
          "page": 31
        }
      ]
    },
    {
      "title": "第 2 章 GPU 计算的发展历程",
      "page": 34,
      "kids": [
        {
          "title": "2.1 图形流水线的发展",
          "page": 34,
          "kids": [
            {
              "title": "2.1.1 固定功能的图形流水线时代",
              "page": 35
            },
            {
              "title": "2.1.2 可编程实时图形流水线的发展",
              "page": 38
            },
            {
              "title": "2.1.3 图形与计算结合的处理器",
              "page": 40
            }
          ]
        },
        {
          "title": "2.2 GPGPU：一个中间步骤",
          "page": 42
        },
        {
          "title": "2.3 GPU 计算",
          "page": 43,
          "kids": [
            {
              "title": "2.3.1 可扩展的 GPU",
              "page": 44
            },
            {
              "title": "2.3.2 发展近况",
              "page": 44
            },
            {
              "title": "2.3.3 未来发展趋势",
              "page": 45
            }
          ]
        },
        {
          "title": "参考文献与课外阅读",
          "page": 45
        }
      ]
    }
  ]
}
```

需要转换为一种用制表符间隔的树状的格式

```txt
前言	2
目录	11
第 1 章 引言	16
	1.1 异构并行计算	17
	1.2 现代 GPU 的体系结构	21
	1.3 为什么需要更高的速度和并行化	23
	1.4 应用程序的加速	24
	1.5 并行编程语言和模型	26
	1.6 本书的总体目标	27
	1.7 本书的组织结构	28
	参考文献	31
第 2 章 GPU 计算的发展历程	34
	2.1 图形流水线的发展	34
		2.1.1 固定功能的图形流水线时代	35
		2.1.2 可编程实时图形流水线的发展	38
		2.1.3 图形与计算结合的处理器	40
	2.2 GPGPU：一个中间步骤	42
	2.3 GPU 计算	43
		2.3.1 可扩展的 GPU	44
		2.3.2 发展近况	44
		2.3.3 未来发展趋势	45
	参考文献与课外阅读	45
```

使用 jq 的递归函数，可以轻松处理这种嵌套的数据

```sh
jq -r '
def format($node; $indent):
    ("\t" * $indent) + "\($node.title)\t\($node.page)",
    ($node.kids[]? | format(.; $indent+1));
.bookmarks[] | format(.; 0)
' bookmarks.json > bookmarks.txt
```
