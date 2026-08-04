---
title: Go
---

## 环境搭建

我使用 Mise + VSCode 搭建开发环境，Mise 用于管理工具链，VSCode 用于编写代码。

### 获取工具链

```sh
# 使用最新版的 go
mise use -g go@latest
```

### 编辑器集成

VSCode 上有 Go 官方扩展 [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go)，该扩展几乎是开箱即用的，它会自动帮你安装需要的东西，不需要什么额外的设置。

由于使用 mise 安装 go 时不会直接修改 **PATH** 环境变量，因此扩展可能找不到已安装的 go。最简单的解决方式就是修改 `.vscode/settings.json` 文件

```json
{
  "go.goroot": "path/to/go/root"
}
```

或者使用如下方法之一

- 先在 shell 中 [激活 Mise](../EM/Mise.md#激活)，然后通过 `code .` 打开项目
- 把 Mise 的 [Shims 目录](../EM/Mise.md#激活) 添加到 PATH 中
