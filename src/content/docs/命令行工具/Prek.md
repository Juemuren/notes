---
title: Prek
---

## 简介

Prek 是用 Rust 重写的 `pre-commit`，而 `pre-commit` 是一个用 Python 写的 [提交前钩子](Git.md#钩子) 框架

## 安装

```sh
# Windows
scoop install prek
```

## 使用

prek 是一个钩子运行器，它兼容 pre-commit 的配置文件。因此可能同时需要参考两份文档

- [prek 的文档](https://prek.j178.dev/)
- [pre-commit 的文档](https://pre-commit.com/)

### 仓库中的钩子

首先创建一个配置文件 `.pre-commit-config.yaml`。这个配置文件使用了 [pre-commit 仓库](https://github.com/pre-commit/pre-commit-hooks) 中的 `check-yaml` 和 `end-of-file-fixer` 钩子。关于配置文件的详细说明请阅读 [pre-commit 文档](https://pre-commit.com/#adding-pre-commit-plugins-to-your-project)。

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v6.0.0
    hooks:
      - id: check-yaml
      - id: end-of-file-fixer
```

然后可以使用 `prek run` 运行这些钩子。当然最好的方式是将钩子集成到 Git 中，这样每次提交前就会自动运行这些钩子。prek CLI 的详细用法请阅读 [prek 文档](https://prek.j178.dev/cli/)。

```sh
# 将钩子集成到 Git 中
prek install
# 从 Git 中删除钩子
prek uninstall
```

### 自定义钩子

除了使用社区的钩子外，也可以自己编写钩子。[官方文档](https://pre-commit.com/#new-hooks) 里有详细的说明。

> [!tip] 钩子的幂等性
> 钩子即一段可自动触发的脚本，因此 **幂等性** 在这里非常重要。
>
> 所谓幂等性，指从一个相同初始状态开始，运行 _1_ 次和运行 _n>1_ 次的结果完全相同。如果违反了幂等性，那么这个脚本就不适合作为钩子。
>
> 一个让钩子满足幂等性的简单方法是，首先检查目标是否处于所需的状态，若不处于则改至该状态，若处于则直接退出脚本。

我个人喜欢使用 [just](Just.md) 作为入口，方便统一管理命令。下面是一个结合了 `just` 和 `prek` 的示例

```yaml
repos:
  - repo: local
    hooks:
      - id: lint-sh
        name: Shell Lint
        entry: just lint-sh
        language: system
        pass_filenames: false
        priority: 0
  - repo: local
    hooks:
      - id: update-docs
        name: Docs Update
        entry: just update-docs
        language: system
        pass_filenames: false
```
