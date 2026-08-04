---
title: Dotter
---

## 简介

dotter 是一个用 Rust 编写的点文件管理器

## 对比

在点文件管理器中，更权威的应该是 `chezmoi` 这个工具

chezmoi 官方文档里虽有 [与各种点文件管理器的比较](https://www.chezmoi.io/comparison-table/)，但缺少了 dotter。个人感觉 chezmoi 更全能，但 dotter 相对更易用

## 安装

```sh
# Windows
scoop install dotter
```

## 使用

详细内容请参考 [官方文档](https://github.com/SuperCuber/dotter/wiki/)

### 基本使用

#### 初始化仓库

```sh
# 先创建目录
mkdir dotfiles
cd dotfiles
# 初始化
dotter init
```

然后往 `.gitignore` 里写入如下内容

```ignore
.dotter/local.toml
.dotter/cache.toml
.dotter/cache
```

#### 迁移点文件

首先把想要管理的文件复制过来，可以改个更好记的名字

```sh
cp ~/.vimrc vimrc.vim
```

然后修改 `.dotter/global.toml` 中的 `[default.files]`。等号前面是当前仓库里的相对路径，后面是要存放的位置

```toml
[helpers]

[default]
depends = []

[default.files]
"vimrc.vim" = "~/.vimrc"
"fastfetch/fastfetch.jsonc" = "~/.config/fastfetch/config.jsonc"
```

#### 创建符号链接

上述任务完成后就可以开始创建符号链接了

```sh
# 只查看运行结果，不实际修改
dotter deploy --dry-run -f
# 删除原文件，创建符号链接，并显示详细日志
dotter deploy -v -f
```

`-f` 参数会把原位置存在的文件删除后再创建符号链接。

#### 备份和同步

为了能够备份和同步，可以把仓库上传到云端，比如 Github。仓库可以设成私有的，如果只有自己使用

要在新机器上要同步点文件，首先得把 `git` 和 `dotter` 安装了，然后按如下步骤操作

```sh
git clone https://github.com/xxxxxxx/dotfiles
cd dotfiles
dotter deploy -v -f
```

### 高级特性

dotter 支持很多高级特性，能够满足复杂的点文件管理需求

#### 模板和变量

dotter 可以使用模板替代符号链接。

模板就是把源文件的内容复制到目标文件中，对两边的修改都不会自动同步到另一边。但模板的好处是支持变量，通过 `{{var}}` 使用

```ini
# git.ini
[core]
	editor = code --wait
[user]
	name = {{git_name}}
	email = {{git_email}}
[init]
	defaultBranch = main
```

含有 `{{}}` 的文件自动被视为模板，也可以通过 `type` 字段强制指定类型

```toml
[default.files]
zshrc = { target = "~/.zshrc", type = "symbolic" }
zprofile = { target = "~/.zshrc", type = "template" }
```

变量定义在包的 `variables` 属性里

```toml
# windows.toml
[windows.variables]
scoop_root = "~/scoop"
```

变量也可以被覆盖

```toml
# local.toml
[variables]
scoop_root = "E:/Program/Scoop"
```

关于包及其覆盖规则参见后面的 [文件和包](#文件和包) 这部分

#### 文件和包

dotter 支持两种程度的模块化，即文件和包

包使用如下方式定义。包可以有自己的依赖，并且有 `files`/`variables` 这些属性

```toml
[example]
depends = ["dep"]

[example.files]
"example.toml" = "~/.config/example"

[example.variables]
"example_var" = "example"
```

一个文件中可以定义多个包。`local.toml` 和 `global.toml` 这两个文件比较特殊，完整的包加载规则是

1. 加载 `global.toml` 中的所有包
2. 加载 `local.toml` 中 `includes` 字段指定文件的所有包，这些包会合并 `global.toml` 中包的 `files`/`variables` 属性
3. 保留 `local.toml` 中 `packages` 字段指定的包及其依赖
4. `files`/`variables` 最后和 `local.toml` 中的合并，得到最终值
