---
title: Just
---

## 简介

Just 是一个任务运行器，语法类似 `Make` 但更简单。

## 对比

由于 Just 不是构建系统，所以并不能取代 Make。但对于那些把 Make 当任务运行器用的人，显然换 Just 更合适。毕竟把 Make 当作任务运行器其实是对 Make 的滥用。

Just 是专门用来写脚本任务的工具，因此可以为此进行优化让其更易用。

以下是两个简单的比较示例，均来自我自己的真实使用场景

### 构建任务

我想用 Pandoc + Typst 把 Markdown 转为 PDF，我希望可以只输文件的名字，而不用打很长的命令。

以下是 Makefile 的示例，使用 `make example.pdf` 生成文件

```makefile
%.pdf: %.md
	pandoc -s $< -o $@ \
		--from markdown \
		--pdf-engine=typst \
		-V mainfont="Microsoft YaHei UI"
```

而这是 Justfile 的示例，使用 `just make-pdf example` 生成文件

```justfile
make-pdf name:
    pandoc -s {{name}}.md -o {{name}}.pdf \
        --from markdown \
        --pdf-engine=typst \
        -V mainfont="Microsoft YaHei UI"
```

对于这种构建任务，Just 其实没有多少优势。毕竟 Make 是个构建系统，它可以自动比较依赖文件和目标文件的修改日期，判断要不要重新构建，而 Just 得借助别的工具来做到这一点。

### 非构建任务

我想用 YOLO CLI 进行一些简单的模型训练任务，并希望能够在命令行里修改主要的参数。

以下是 `Justfile` 的示例，使用 `just train coco8 yolo11n 50 8 0.01` 传递参数

```justfile
# 模型训练
train data model epochs batch lr:
    cd training && \
    yolo train \
        data="{{data}}.yaml" \
        model="{{model}}.pt" \
        epochs={{epochs}} \
        batch={{batch}} \
        lr0={{lr}} \
        project="runs/{{model}}-{{epochs}}-{{batch}}-{{lr}}" \
        name="train"
```

而 `Makefile` 的示例如下。由于 Make 中没有参数这一概念，所以只能用变量凑合一下。使用时需要用 `make train DATA=coco MODEL=yolo11n EPOCHS=50 BATCH=8 LR=0.001` 覆盖掉默认的变量

```makefile
DATA ?= data
MODEL ?= model
EPOCHS ?= 100
BATCH ?= 16
LR ?= 0.01

.PHONY: train
train:
	cd training && \
	yolo train \
		data="$(DATA).yaml" \
		model="$(MODEL).pt" \
		epochs=$(EPOCHS) \
		batch=$(BATCH) \
		lr0=$(LR) \
		project="runs/$(MODEL)-$(EPOCHS)-$(BATCH)-$(LR)" \
		name="train"
```

由于模型训练本身不是一个构建任务，我们不关注文件间的依赖关系，所以更适合用 Just。

### 对比总结

我其实并不认同 `Just` 是现代版 `Make` 的说法，这是两个用于不同场合的工具

- Make 更适合构建任务
- Just 更适合非构建任务

这两个工具是可以一起使用的：构建任务使用 `Make`，然后用 `Just` 统一管理所有任务。比如对于第一个例子，保留原有的 `Makefile`，然后将 `Justfile` 修改为

```justfile
make-pdf name:
    make {{name}}.pdf
```

这样即利用了 `Make` 作为一个构建系统的功能，又利用了 `Just` 的很多现代特性来统一管理任务。

## 安装

```sh
# Windows
scoop install just
```

## 特性

这里只列出我常用的几个 Just 特性，[官方文档](https://just.systems/man/en/) 里有全部的 Just 特性介绍。

在 Just 中，任务被称作配方。

### [属性](https://just.systems/man/en/attributes.html)

Just 为配方提供了许多属性，在配方的定义前添加 `[xxx]` 即可设置属性。

属性可用于规定默认配方、修改配方描述等，详细用法请阅读文档。

### [设置](https://just.systems/man/en/settings.html)

Just 提供了多个设置项，使用 `set name := value` 即可修改默认值。

设置可用于修改运行 Shell、改变工作目录等，详细用法请阅读文档。

### [函数](https://just.systems/man/en/built-in-functions.html)

Just 提供了许多内置函数，通过 `func()` 即可调用。

函数可用于运行外部命令、获取环境变量等，详细用法请阅读文档

### [字符串](https://just.systems/man/en/strings.html)/[表达式](https://just.systems/man/en/expressions-and-substitutions.html)/[条件表达式](https://just.systems/man/en/conditional-expressions.html)/[命令表达式](https://just.systems/man/en/command-evaluation-using-backticks.html)

在 Justfile 中可以使用 `'single'`、`"double"` 或 `'''triple'''` 得到字符串

字符串支持多种运算

- `+` 连接字符串
- `/` 连接路径
- `&&` 逻辑与
- `||` 逻辑或

可以通过 `f` 使用格式化字符串

```justfile
name := "world"
message := f'Hello, {{name}}!'
```

可以通过 `if`/`else` 和 `==`/`!=`/`=~` 使用条件表达式，最后一个运算为正则匹配

```justfile
# 是否等于
year := if `expr 2 + 2` == "5" { "1984" } else { datetime("%Y") }
# 是否不等于
year := if `expr 2 + 2` != "5" { datetime("%Y") } else { "1984" }
# 是否匹配正则表达式
foo := if "114514" =~ '[0-9]+' { "match" } else { "mismatch" }
```

可以通过 `` `command` `` 或 `shell(command)` 使用命令表达式，后者支持传递变量 `shell(command, var)`

```justfile
# 使用 `
size := `numfmt --to=iec 114514`
# 使用 shell()
file := "log.txt"
lines := shell('wc -l $1 | cut -d " " -f 1', file)
```

### [工作目录](https://just.systems/man/en/working-directory.html)

默认工作目录为 Justfile 所在目录。有多种方式修改工作目录

- 添加 `[no-cd]` 属性让配方的工作目录为调用 `just` 时所在的目录
- 使用 `set working-directory := 'path'` 修改所有配方的工作目录
- 使用 `[working-directory]` 属性修改单个配方的工作目录

### [参数](https://just.systems/man/en/recipe-parameters.html)/[变量](https://just.systems/man/en/setting-variables-from-the-command-line.html)/[环境变量](https://just.systems/man/en/getting-and-setting-environment-variables.html)

参数、变量、环境变量三者有点类似，主要区别为

|   类型   |      作用域      |       来源        |
| :------: | :--------------: | :---------------: |
|   参数   |     单个配方     |     Justfile      |
|   变量   |     所有配方     |     Justfile      |
| 环境变量 | 所有配方和子进程 | Justfile 和父进程 |

- 变量和参数只能在 **Justfile** 中定义，而环境变量还可以从 **父进程** 里继承过来
- 变量和环境变量能用于所有配方，而参数只能用于单个配方
- 环境变量还会传递到由 `just` 创建的子进程中

对于参数

- 在配方中用 `{{param}}` 获取参数的值
- 用 `task param:` 定义带参数的配方，运行时用 `just task arg` 为参数设置值
- 用 `task param="arg":` 让参数具有默认值，运行时可省略为 `just task`

对于变量

- 在配方中用 `{{param}}` 获取变量的值
- 用 `var := "aaa"` 设置变量。运行时可通过 `just var=bbb` 覆盖变量值

对于环境变量

- 在配方中用 `${VAR}` 或 `env(VAR)` 获取环境变量的值，后者支持设置默认值 `env(VAR, default)`
- 用 `export VAR := "aaa"` 设置环境变量，用 `unexport VAR` 取消已有的环境变量
- 用 `task $VAR="aaa":` 将配方参数同时添加为环境变量

### [依赖](https://just.systems/man/en/dependencies.html)

Just 可以为配方添加依赖

- 用 `task: dep` 为配方添加依赖
- 用 `task: (dep "arg")` 为依赖的参数设置值
- 用 `task param: (dep param)` 将命令的参数传递给依赖
- 用 `task: a b c` 添加多个依赖

### [默认配方](https://just.systems/man/en/the-default-recipe.html)

默认配方为输入 `just` 时运行的配方。

可以通过 `[default]` 属性来设置默认配方，否则第一个配方为默认配方。

### [列出配方](https://just.systems/man/en/listing-available-recipes.html)/[配方描述](https://just.systems/man/en/documentation-comments.html)/[配方分组](https://just.systems/man/en/groups.html)/[私有配方](https://just.systems/man/en/private-recipes.html)

运行 `just --list` 可以列出所有配方。同时该命令会打印出每个配方的参数、描述，并分组展示。

在配方上方的注释会自动成为配方描述，也可以通过 `[doc]` 属性修改或隐藏配方描述。

使用 `[group]` 属性可以对配方进行分组。`just --groups` 可以列出所有分组。

私有配方不会被列出。名称以 `_` 开头的配方自动成为私有配方，也可以通过 `[private]` 属性设置私有配方。

### [多行结构](https://just.systems/man/en/multi-line-constructs.html)

在配方中可以用 `\` 对较长的表达式、命令等语句进行分行

### [命令回显](https://just.systems/man/en/quiet-recipes.html)

默认情况下 Just 会显示每个配方具体运行的命令。有很多种方式进行调整

- 在命令开头添加 `@` 可以关闭回显。在配方开头添加 `@` 会反转回显功能，即只显示添加了 `@` 的命令
- 设置 `set quiet` 则只会显示添加了 `[no-quiet]` 属性的配方
