---
title: OCaml
---

## 环境搭建

使用 opam + VSCode 搭建开发环境

### 获取工具链

https://ocaml.org/docs/installing-ocaml

首先安装 opam

```sh
# Windows
scoop install opam
```

然后通过 `opam` 获取工具链

```sh
opam init
```

最后修改环境

```sh
# Bash
eval $(opam env)
# Pwsh
opam env | Invoke-Expression
```

### 编辑器集成

安装 VSCode 扩展 [OCaml Platform](https://marketplace.visualstudio.com/items?itemName=ocamllabs.ocaml-platform)
