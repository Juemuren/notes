---
title: Haskell
---

## 环境搭建

使用 GHCup + VSCode 搭建开发环境

### 获取工具链

https://www.haskell.org/ghcup/install/manual

首先安装 GHCup

```sh
# Windows
scoop install ghcup
```

然后使用 `ghcup` 获取工具链

```sh
ghcup install ghc && ghcup set ghc
ghcup install hls && ghcup set hls
ghcup install cabal && ghcup set cabal
ghcup install stack && ghcup set stack
```

这会下载各个工具的 `recommended` 版本，并创建一个 shim 指向该版本。

### 编辑器集成

安装 Haskell 的官方 VSCode 扩展 [Haskell](https://marketplace.visualstudio.com/items?itemName=haskell.haskell)

如果已经自己手动安装了 `hls`，那么 `Haskell: Manage HLS` 这个配置项建议选择默认的 `PATH`，否则扩展还会自己下载一个。
