---
title: VSCode
---

## 简介

VSCode 是一个开源的代码编辑器，基于 Web 且有着非常强大的扩展生态。

## 安装

建议使用 [官网](https://code.visualstudio.com/) 的安装程序。VSCode 的安装程序还是非常友好的

## 扩展推荐

和特定 [编程语言](../编程语言/index.md)/特定 [工具](../命令行工具/index.md) 有关的扩展就不列举在这里了，可以在相应的章节中查看

### 本地化

- [Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans) 中文本地化扩展

### 实用

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 可以在不同的编辑器间使用相同的配置，包括缩进格式、编码方式、行尾序列等。如果参与开源项目的协作，通常都会要求安装这个扩展。
- [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager) 可以对项目进行分类，并提供了一个项目管理视图
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) 识别代码中所有类似 `TODO`、`FIXME` 这样的特殊注释，并在一个视图中显示所有待办事项
- [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) 可以为代码添加书签，并在一个视图中展示
- [VSCode Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-neovim) 将 Neovim 作为后端，提供强大的无鼠标编辑体验

### 外观

- [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap) 生成好看的代码截图
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) 把错误/警告/信息等直接显示在代码的同一行，而不是要打开别的面板才能查看
- [ident-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow) 给缩进高亮，让你能够清楚地看出缩进层数
- [Output Colorizer](https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer) 为 VSCode 的输出面板和 log 文件着色

### 主题

美化就是生产力！

- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) 比默认文件图标更好看（主观）的文件图标
- [Material Product Icons](https://marketplace.visualstudio.com/items?itemName=PKief.material-product-icons) 比默认产品图标更好看的（主观）的产品图标
- [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme) 比默认颜色主题更好看（主观）的颜色主题
- [Catppuccin for VSCode](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc) 一个基于 Catppuccin 的颜色主题，非常酷炫
- [Tokyo Night](https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night) 一个基于 Tokyo Night 的颜色主题

### 版本控制

我平常只使用 VSCode 自带的 Git 功能以及命令行 Git 操作，很少使用 Git 相关扩展

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) 可以图形的方式显示 Git 提交历史，并支持丰富的操作。
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) 提供了非常多基于 Git 的功能，感觉有点臃肿。

### 远程开发

远程开发似乎是 VSCode 的最大优势，也是很多人看中 VSCode 的原因。不过我个人很少用到远程开发

- [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) 包含了下面 4 个扩展的扩展包
  - **WSL** 支持在 VSCode 中打开 WSL 中的文件夹
  - **Dev Containers** 支持在 VSCode 中打开容器中的文件夹
  - **Remote - SSH** 支持在 VSCode 中通过 SSH 连接到远程机器
  - **Remote - Tunnels** 支持在 VSCode 中通过 Tunnel 连接到远程机器
- [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-repositories) 包含了下面 2 个扩展的扩展包
  - **GitHub Repositories** 远程浏览和编辑 GitHub 仓库。如果某些仓库特别大不适合 clone 到本地的话，这个扩展非常方便
  - **Azure Repos** 远程浏览和编辑 Azure 仓库
- [Remote Explorer](https://marketplace.visualstudio.com/items?itemName=ms-vscode.remote-explorer) 提供了一个视图显示可连接的远程机器列表，让 _Remote - SSH_ 和 _Remote - Tunnels_ 用起来更方便

## 配置文件管理

启用太多扩展可能会导致一些问题，比如占用内存变大、启动变慢等。但每打开一个不同的项目就要手动禁用、启用扩展又过于麻烦。配置文件的出现就是为了解决这个问题的，不仅支持为不同的项目配置不同的扩展，还可以配置不同的设置、键盘快捷方式、任务、代码片段等，功能非常强大

配置文件的具体使用方式取决于个人习惯，而且目前功能似乎不太完善，比如 [配置文件不能继承](https://code.visualstudio.com/docs/configure/profiles#_can-i-inherit-settings-from-another-profile)。有需求的话建议去阅读 [官方文档](https://code.visualstudio.com/docs/configure/profiles)

## 命令行

VSCode 还提供了命令行工具 `code`，用法和其它的命令行编辑器很类似

```sh
# 打开当前目录
code .
# 打开单个文件
code text.c
```

除此之外这个工具还有很多别的功能

```sh
# 从市场中安装扩展
code --install-extension rust-lang.rust-analyzer
# 从文件中安装扩展
code --install-extension my-extension-0.0.1.vsix
# 卸载扩展
code --uninstall-extension rust-lang.rust-analyzer
# 列出所有已安装扩展
code --list-extensions
# 同时显示版本
code --list-extensions --show-versions
# 比较文件差异
code --diff file1 file2
```

可以运行 `code --help` 或阅读 [官方文档](https://code.visualstudio.com/docs/configure/command-line) 了解更多功能

## 制作自己的扩展

虽然 VSCode 的扩展生态非常丰富，但仍可能存在一些特殊需求无法满足。这时一种解决方式是自己制作扩展。VSCode 官方有非常详细的、关于制作扩展的 [文档](https://code.visualstudio.com/api#how-to-build-extensions)

扩展有一套标准的项目结构。VSCode 官方提供了代码生成工具，可以快速搭建起项目的骨架

```sh
npm install -g yo generator-code
# 生成代码
yo code
```

扩展制作完成后可以打包、安装和发布，VSCode 官方同样提供了易用的工具。其中发布扩展需要比较繁琐的步骤，建议阅读 [官方文档](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions)

```sh
npm install -g @vscode/vsce
# 打包扩展
vsce package
# 直接从打包文件中安装扩展
code --install-extension my-extension-0.0.1.vsix
# 发布扩展
vsce publish
```
