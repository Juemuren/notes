---
title: Java
---

## 环境搭建

我使用 Mise + VSCode 搭建开发环境，Mise 用于管理工具链，VSCode 用于编写代码。

### 获取工具链

```sh
# 使用最新版的 java
mise use -g java@latest
```

### 编辑器集成

VSCode 里有一个整合包 [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)，可以一键安装所有常用的 Java 扩展。

如果只需要编辑器提供基本的语言服务，其余操作更喜欢自己写脚本或使用命令行，那么可以只安装 [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) 这个扩展
