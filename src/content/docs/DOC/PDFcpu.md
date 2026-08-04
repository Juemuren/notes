---
title: PDFcpu
---

## 简介

PDFcpu 是一个用 Go 编写的 PDF 处理器

## 对比

类似的命令行 PDF 处理工具有很多，比如

- `qpdf`
- `poppler`
- `MuPDF`
- `GhostScript`

## 安装

```sh
scoop install pdfcpu
scoop install qpdf
```

## 使用

这些工具的用法非常多，此处仅展示我自己用过的部分功能，更多细节请阅读对应的官方文档

### 使用 pdfcpu

[官方文档](https://pdfcpu.io/about/command_set)

[导入/导出书签](https://pdfcpu.io/bookmarks/bookmarks)

```sh
# 导出书签，文件默认为 out.json
pdfcpu bookmarks export example.pdf
# 导入书签，添加 -r 参数替换原有书签，并以新名字保存
pdfcpu bookmarks import -r example.pdf out.json example.new.pdf
```

### 使用 qpdf

[官方文档](https://qpdf.readthedocs.io/en/stable/cli.html#pdf-transformation)

[添加/删除附件](https://qpdf.readthedocs.io/en/stable/cli.html#embedded-files-attachments)

```sh
# 列出附件
qpdf example.pdf --list-attachments
# 添加附件
qpdf example.pdf --add-attachment attachment.zip -- example.new.pdf
# 删除附件
qpdf example.pdf --remove-attachment=attachment.zip example.new.pdf
```

[重新编排页码](https://qpdf.readthedocs.io/en/stable/cli.html#option-set-page-labels)

```sh
# 所有页码为 1 2 3 ...
qpdf example.pdf --set-page-labels 1:D -- example.new.pdf
# 前四页为 i ii iii iv 之后都为 1 2 3 ...
qpdf example.pdf --set-page-labels 1:r 5:D -- example.new.pdf
```
