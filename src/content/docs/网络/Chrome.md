---
title: Chrome
---

## 简介

Chrome 是 Google 开发的一款浏览器。该浏览器应该是目前使用最广泛的。

## 对比

Chrome 的内核 Chromium 是开源的。这一内核也被很多其它的浏览器使用，比如 Microsoft Edge。

Microsoft Edge 是 Windows 系统自带的。由于和 Chrome 内核相同，因此几乎所有功能都是互相兼容的，没必要再额外安装一个浏览器。

## 安装

Windows 用户建议上 [官网](https://www.google.com/chrome/) 去下载安装程序

命令行爱好者也可以尝试用脚本进行安装

```sh
# Ubuntu
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install ./google-chrome-stable_current_amd64.deb
```

## 使用

### 浏览器扩展

Chrome 支持安装扩展。大多数扩展都可以在 [Chrome 扩展商店](https://chromewebstore.google.com/category/extensions) 中获取

> [!note] Microsoft Edge 的扩展
> Microsoft Edge 可以安装 Chrome 扩展商店中的扩展，同时它还有自己的 [扩展商店](https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home)。

以下是一些我常用的扩展，进行了简单的分类

#### 实用

- uBlock Origin 一个高效的网络请求过滤工具，可以自定义规则
- Vimium 用类似 Vim 的纯键盘操作浏览网页
- Immersive Translate 一个沉浸式翻译器。该项目已不再开源，如果介意可以找个替代品，比如 [简约翻译](https://github.com/fishjar/kiss-translator)
- Force Copy 用于解除网页的复制限制

#### 美化

- Dark Reader 强制转为暗色模式，可以对不同网站启用不同的方式
- Tabliss 一个美观的 New Tab 页面，可高度自定义

#### 管理器

- Stylus 一个用户样式管理器，而 [UserStyles.world](https://userstyles.world/) 是最大的用户样式分享网站
- Tampermonkey 一个用户脚本管理器，而 [Greasy Fork](https://greasyfork.org/) 是最大的用户脚本分享网站

### 开发者工具

DevTools 是给 Web 开发者使用的调试面版，有非常多的功能。

> [!note] Microsoft Edge 的开发者工具
> Microsoft Edge 的开发者工具功能和 Chrome 几乎一样，只是界面略有不同。

在 [Web 开发](../应用开发/Web.md#浏览器) 章节有简略的介绍，更多内容详见 [官方文档](https://developer.chrome.com/docs/devtools)。

### 无头模式

Headless Chrome 是 Chrome 浏览器的无头模式。无头模式即没有图形界面，便于编写脚本进行自动化操作。

> [!note] Microsoft Edge 的无头模式
> Microsoft Edge 的无头模式用法和 Chrome 几乎相同。
>
> Windows 系统自带了 Microsoft Edge，但它并不在 `PATH` 中。可以 [使用 Scoop 添加 shim](../包管理器/Scoop.md#管理脚本和命令) 来方便地使用 Microsoft Edge 的无头模式
>
> ```sh
> scoop shim add msedge 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
> ```
>
> 这样做后，下面的 `chrome` 都可以替换为 `msedge`

我用无头模式最多的场景就是打印 PDF。由于 Headless Chrome 不支持相对路径，因此必须得添加 `$PWD`

```sh
# 将本地 HTML 打印为 PDF
chrome --headless --print-to-pdf="$PWD/file.pdf" "file:///path/to/file.html"
# 将 Web 页面打印为 PDF
chrome --headless --print-to-pdf="$PWD/example.pdf" "https://example.com"
```

添加参数 `--no-pdf-header-footer` 可以在打印时省略掉页眉和页脚

更多内容请参考 [官方文档](https://developer.chrome.com/docs/chromium/headless)
