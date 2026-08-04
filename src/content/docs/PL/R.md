---
title: R
---

## 环境搭建

目前我使用 Miniforge + VSCode 来搭建开发环境，Miniforge 用于获取工具链，VSCode 用于编写代码。

### 获取工具链

```sh
# 创建虚拟环境
mamba create -n r
# 激活环境
mamba activate r
# 安装最新版的工具链
mamba install r
# 安装指定版本的工具链
mamba install r==4.4
```

### 编辑器集成

VSCode 上的扩展 [R](https://marketplace.visualstudio.com/items?itemName=REditorSupport.r)
