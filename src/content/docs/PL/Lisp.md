---
title: Lisp
---

## 环境搭建

我使用 Scoop + VSCode 搭建开发环境，Scoop 用于获取工具链，VSCode 用于编写代码。

### 获取工具链

Lisp 的实现非常多。目前我使用的是 `SBCL` 这个解释器，可以通过 `scoop install sbcl` 安装

另外 Lisp 还有一个包管理器 `quicklisp`，可以通过如下方式安装

```sh
curl -O https://beta.quicklisp.org/quicklisp.lisp
sbcl --load quicklisp.lisp
```

启动解释器后，运行如下命令

```lisp
; 安装包管理器，默认安装到 ~/quicklisp
(quicklisp-quickstart:install)
; 自动加载 quicklisp
(ql:add-to-init-file)
; 退出解释器
(quit)
```

这个包管理器本身使用起来也并不麻烦

```lisp
; 添加包
(ql:quickload "vecto")
; 删除包
(ql:uninstall "vecto")
; 查找包
(ql:system-apropos "xml")
```

更多用法请参考 [Quicklisp 官方文档](https://www.quicklisp.org/beta/)

### 编辑器集成

目前我觉得 VSCode 上最好的 Lisp 扩展是 [Common Lisp](https://marketplace.visualstudio.com/items?itemName=qingpeng.common-lisp)。该扩展是开箱即用的，不过它只提供了语言服务，运行程序还需要使用命令行。

如果想通过点击按钮来运行程序，那么可以再安装 [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) 这个扩展。
