---
title: Pnpm
---

## 简介

Pnpm 是一个 JavaScript 的包管理器

## 对比

pnpm 的 [开发动机](https://pnpm.io/motivation) 以及与 yarn/npm 的 [特性对比](https://pnpm.io/feature-comparison)

简单地说，pnpm 尝试通过符号链接的方式解决 npm 的一些痛点，如 **占用过多磁盘空间**、**安装过程很慢** 等。

## 安装

```sh
# Windows
scoop install pnpm
# Mise
mise use -g pnpm
```

## 配置

```sh
# 列出当前所有配置
pnpm config list
# 获取配置
pnpm config get storeDir
# 删除配置
pnpm config set storeDir
# 修改配置
pnpm config set storeDir path/to/.pnpm-store
```

### 包存储位置

`storeDir` 这个配置用于修改包的存储位置。包存储位置应该和实际安装位置在同一个磁盘和文件系统中，否则由于硬链接的限制，包不会被链接而是被复制，从而无法发挥 pnpm 节省磁盘空间的优势。当包的实际安装位置和 `storeDir` 不在同一磁盘或文件系统中时

- 如果指定了 `storeDir`，那么 pnpm 会选择复制包
- 如果未指定 `storeDir`，那么 pnpm 会在文件系统根目录创建 `.pnpm-store` 并链接到安装位置

参考：https://pnpm.io/faq#does-pnpm-work-across-multiple-drives-or-filesystems

### 版本管理

pnpm 会识别项目中的 `package.json` 中声明的 `packageManager`，且默认会下载要求的 pnpm 版本。如果希望把管理 pnpm 版本的任务全权交给 mise，那么需要修改一下配置

```sh
# 让 mise 能够识别 package.json 中的 packageManager
mise settings add idiomatic_version_file_enable_tools pnpm
# 禁用 pnpm 自动下载声明版本的功能
mise set --global PNPM_CONFIG_PM_ON_FAIL=ignore
```

参考：https://pnpm.io/cli/with#pmonfail

## 使用

[官方文档](https://pnpm.io/pnpm-cli)

pnpm 的用法和 npm 非常类似

```sh
# 初始化 package.json 文件
pnpm init
# 通过 create-xxx 创建项目
pnpm create vite@latest
# 添加依赖
pnpm add react
# 移除依赖
pnpm remove react
# 更新依赖
pnpm update react
# 安装所有依赖
pnpm install
# 列出所有依赖
pnpm list
# 运行 package.json 中定义的命令
pnpm run dev
```
