---
title: JavaScript
---

## 环境搭建

我使用 Mise + VSCode 搭建开发环境，Mise 用于管理工具链，VSCode 用于编写代码。

### 获取工具链

JavaScript 的运行时一般选择 _nodejs_，不过 _deno_、_bun_ 也是不错的。浏览器的控制台里也可以运行 JavaScript 代码，如果只是想写点浏览器脚本发到 GreasyFork，甚至都没必要本地搭建环境

:::caution[不管理运行时版本]

如果不需要管理运行时版本，那么直接通过 scoop 直接安装即可，这默认会下载最新版

```sh
scoop install nodejs
# deno 和 bun 安装方式是一样的
scoop install deno
scoop install bun
```

但现代 JavaScript 项目通常都对版本有所要求，因此非常不建议使用这种安装方式。

:::

建议使用工具来管理语言运行时，比如 `nvm` 可以用来管理不同版本的 `nodejs`。不过我个人更喜欢 [mise](../环境管理器/Mise.md)，这是一个可以管理多种语言运行时版本的工具。对于 **JavaScript**，它支持管理 `nodejs`、`deno`、`bun` 的运行时版本

mise 的以下命令可以安装并使用不同版本的运行时

```sh
# 使用 node latest
mise use -g node
# 使用 node lts
mise use -g node@lts
# 使用 node 20
mise use -g node@20
# 使用 deno latest
mise use -g deno
# 使用 bun latest
mise use -g bun
```

:::tip[安装 pnpm]

虽然安装 node 时附带 npm 作为包管理器，但现代 Node.js 项目通常使用 pnpm 作为包管理器。因此，建议把 pnpm 一起安装了

```sh
mise use -g pnpm
```

pnpm 可以管理自身的版本，不过我更喜欢让 mise 来管理

```sh
# 让 mise 能够识别 package.json 中的 packageManager
mise settings add idiomatic_version_file_enable_tools pnpm
# 禁用 pnpm 自动下载声明版本的功能
mise set --global PNPM_CONFIG_PM_ON_FAIL=ignore
```

更详细的设置请参考 [Pnpm](../包管理器/Pnpm.md) 和 [Mise](../环境管理器/Mise.md) 部分的内容

:::

### 编辑器集成

对于 JavaScript，VSCode 几乎是开箱即用的，不需要安装任何额外扩展

## 命令行工具

JavaScript 中专门用于前端/后端开发的框架/库/工具被放到了别的章节。

- [前端](../应用开发/Web.md#开发资源)
- [后端](../应用开发/API.md#开发资源)

### 包管理器

- npm `nodejs` 的官方包管理器
- [pnpm](../包管理器/Pnpm.md) 改进的 `npm`，优点是更快和更节省硬盘空间
- aube 完全用 Rust 写的包管理器
- ncu 增加了 `npm` 没有的功能。它会检查 `package.json` 文件，然后列出所有可以更新的依赖，也可以加个 `-u` 参数一键更新。不过这个工具只更新 `package.json` 文件，还要重新运行 `npm install` 来安装新版本的依赖

### 静态检查和格式化

- ESLint 代码静态检查
- Prettier 格式化
- Biome 可以视为 ESLint 和 Prettier 的结合体，由于使用 Rust 编写所以速度非常快

### 调试

- nodemon 文件监视，并在更改后重新运行，让开发更方便
- cross-env 用了设置环境变量的工具，可以自动识别不同系统和不同 Shell，用起来很省心

### 代码生成工具

- Yeoman 快速搭建起项目骨架，有许多社区维护的生成器可选择

## 库和框架

### 测试框架

- Vitest 单元测试框架
- Jest 也是单元测试框架

### 网络请求

- Axios 一个语法简单的网络请求库

### 状态管理

- Redux 一个用于全局状态管理的库

### 轻型实用库

- dotenv 加载 .env 文件的
- lodash 函数式编程库，让数组、对象等操作更加简单
