---
title: Mise
---

## 简介

Mise 是个用来管理工具链版本和切换环境的工具，也可以充当任务运行器。

## 对比

作为工具链管理器，Mise 可以替代许多工具，比如 `nvm`、`pyenv` 等。这些程序通常只用来管理一个工具的版本，而 Mise 可以管理多种工具的版本。你可以在 [Mise Registry](https://mise.jdx.dev/registry.html#tools) 上查看 Mise 能够管理的所有工具。如果你正在使用多个不同工具的版本管理器，那么 Mise 可能非常适合你，它让你不再需要记忆每种工具的用法，只需知道 Mise 怎么用就行了。

作为环境切换工具，Mise 是 `direnv` 的替代品。功能很简单，就是修改 _环境变量_ 而已。对于部分工具，比如 Python，Mise 还能在进入目录时自动激活虚拟环境。

作为任务运行器，Mise 通过 `toml` 定义任务，语法和 `Make`、`Just` 差异很大。作为写习惯了 Make 的人，我还是更喜欢 [Just](../命令行工具/Just.md)，它改善了 Make 且语法类似。不过，大多数时候使用 Mise 也很方便。

## 安装

```sh
# Windows
scoop install mise
```

## 配置

环境变量 `MISE_DATA_DIR` 决定了 Mise 的数据保存在哪里。

### 激活

Mise 的一些功能需要与 Shell 集成（官方说法是激活）后才能使用。你可以阅读 [官方文档](https://mise.jdx.dev/getting-started.html#activate-mise) 了解如何激活 Mise

```sh
# pwsh
(&mise activate pwsh) | Out-String | Invoke-Expression
# bash
eval "$(mise activate bash)"
# zsh
eval "$(mise activate zsh)"
```

在上述激活方式中，Mise 通过修改 _PATH_ 切换运行时版本。Mise 还有另一种切换运行时版本的方式，就是修改 _Shims_，它和修改 _PATH_ 的方法略有不同，详细的比对可参考 [官方文档](https://mise.jdx.dev/dev-tools/shims.html#mise-activate-shims)。

_PATH_ 更适合交互式 Shell 环境，而 _Shims_ 推荐用于非交互式环境。同时使用二者也没有问题。使用 _Shims_ 的方式就是在把 `$MISE_DATA_DIR/shims` 目录添加到 _PATH_ 中。

## 使用

> [!note] 官方文档
> Mise 的功能很多，这里无法全面介绍，你可以阅读对应的文档来详细了解。
>
> - [开发工具](https://mise.jdx.dev/dev-tools/)
> - [环境变量](https://mise.jdx.dev/environments/)
> - [任务](https://mise.jdx.dev/tasks/)

### 开发工具

Mise 可以用来管理多种编程语言运行时的不同版本，也可以用来管理本地开发工具的不同版本。

Mise 会自动更新 _PATH_ 或 _Shims_ 以确保你使用了正确的版本，不过该功能需要激活。

#### 语言运行时

> [!tip] 支持的语言
>
> 可以在 [官方文档](https://mise.jdx.dev/core-tools.html#core-tools) 里找到目前 Mise 能够管理的所有语言。

Mise 可以更改全局使用的运行时版本

```sh
# 全局使用 python latest
mise use -g python
# 全局使用 nodejs lts
mise use -g node@lts
# 全局使用 java 17
mise use -g java@17
```

这会修改 `~/.config/mise/config.toml` 文件，添加类似这样的内容

```toml
[tools]
java = "17"
node = "lts"
python = "latest"
```

也可以更改当前项目使用的运行时版本

```sh
# 当前项目使用 nodejs 20
mise use node@20
```

这会在当前目录下创建 `mise.toml` 文件，并添加如下内容

```toml
[tools]
node = "20"
```

如果激活了 Mise，则只要处于这个项目中，Mise 就会自动使用这个运行时的版本。

#### 命令行工具

> [!tip] 命令行工具别名
>
> 可以在 [官方文档](https://mise.jdx.dev/registry.html#tools) 里找到 Mise 提供了别名的命令行工具。

有些需要全局使用的 CLI 工具不在系统包管理器中，必须通过其它包管理器获取，或手动去资源发布处下载并安装。此时可以使用 Mise 统一管理这些 CLI 工具，而不必记忆每种工具的安装方式。

不过 Mise 并不直接管理 CLI 工具，而是借助被称为后端的包管理器或生态系统。所有可用的后端可以在 [官方文档](https://mise.jdx.dev/dev-tools/backends/) 中查看。

我主要使用 Mise 管理 Python 和 NodeJS 生态的 CLI 工具。个人偏爱 Rust 写的工具，因此先用 Mise 安装相关的包管理器 `uv` 和 `aube`

```sh
# 安装 uv
mise use -g uv
# 安装 aube
mise use -g aube
```

这会在文件 `~/.config/mise/config.toml` 中添加如下内容

```toml
[tools]
aube = "latest"
uv = "latest"
```

然后在 `~/.config/mise/config.toml` 中更改配置，以替代 `pipx` 和 `npm` 后端的默认工具

```toml
[settings.pipx]
uvx = true

[settings.npm]
package_manager = "aube"
```

然后正常安装工具即可

```sh
mise use -g npm:@mermaid-js/mermaid-cli
mise use -g pipx:argostranslate
```

对于 `pipx` 后端，如果安装工具时存在额外依赖，那么要先在 `~/.config/mise/config.toml` 中描述工具的安装需求

```toml
[tools]
"pipx:markitdown" = { version = "latest", extras = "all" }
```

然后再安装

```sh
mise use -g pipx:markitdown
```

#### 高级设置

Mise 允许在语言运行时更新后，自动安装一些包。比如对于 NodeJS，可以在 `~/.default-npm-packages` 中写入

```txt
lodash
request
express
```

这种默认安装适合那些需要全局使用通用编程库，而非命令行工具。后者可能用 `mise use -g npm:xxx` 更好。

如果希望 Mise 能够支持 `.nvmrc`、`.python-version` 等文件，需要添加一些设置。这样当你和别人协作时，如果别人的项目里有这些文件，你不需要安装对应的工具，也不需要在项目里添加 `mise.toml`，就可以和别人的体验一样，实现无缝的工具替换。

```sh
# 让 mise 能够支持 .python-version 等文件
mise settings add idiomatic_version_file_enable_tools python
# 让 mise 能够支持 .nvmrc 等文件
mise settings add idiomatic_version_file_enable_tools node
```

对于 Python，如果希望 mise 和 uv 配合体验更好的话，那么可以添加一些设置。详细说明请参考 [官方文档](https://mise.jdx.dev/mise-cookbook/python.html#mise-uv)

```sh
# 让 mise 自动激活 uv 创建的虚拟环境
mise add settings python.uv_venv_auto source
```

### 环境变量

mise 会自动在当前 shell 会话中设置环境变量，这个功能同样需要激活。

```sh
# 进入当前项目后自动设置
mise set NODE_ENV=production
```

这会在 `mise.toml` 中添加如下内容

```toml
[env]
NODE_ENV = "production"
```

有一些环境变量比较特殊，比如 `_.python.venv`。若将其设置为虚拟环境的路径，mise 就会在进入项目目录后自动激活虚拟环境 ~~不过这样似乎无法通过 `deactivate` 退出虚拟环境了~~

```toml
[env]
_.python.venv = "venv" # 这是虚拟环境的相对路径
```

你可以在 [这里](https://mise.jdx.dev/environments/#env-directives) 找到更多的特殊环境变量

### 任务

可以通过 `mise tasks add build -- mkdocs build` 设置任务，这会在 `mise.toml` 中添加如下内容

```toml
[tasks.build]
run = "mkdocs build"
```

当然也可以直接在该文件里手写任务，并且可以单独设置环境变量、添加描述信息等，如下所示

```toml
[tasks.build]
description = "Build the website" # 添加描述信息
env = { "MY_VAR" = "my variable" } # 添加环境变量
run = "mkdocs build"
```

`mise run build` 就可以运行 build 任务，`mise tasks ls` 会显示所有的任务，以及对应的描述信息
