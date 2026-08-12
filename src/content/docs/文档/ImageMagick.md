---
title: ImageMagick
---

## 简介

ImageMagick 用于编辑和处理数字图像。它可用于创建、编辑、合成或转换位图图像，并支持多种文件格式，包括 JPEG、PNG、GIF、TIFF 和 Ultra HDR。

## 对比

ImageMagick 还有另一个分支叫 GraphicsMagick，后者更注重速度、稳定和易用，而前者则拥有更多高级功能

另一个我常用的图片处理工具是 chafa，功能比 ImageMagick 要少。而 resvg 处理 SVG 效果通常比 ImageMagick 更好。

## 安装

```sh
# Windows
scoop install imagemagick
scoop install chafa
```

## 使用

这些工具的用法非常多，此处仅展示我自己用过的部分功能，更多细节请阅读对应的官方文档

### 使用 imagemagick

> [!note] 官方文档
> 后文仅展示使用 ImageMagick 的示例。更多内容请参考官方文档
>
> - [ImageMagick 官方文档](https://imagemagick.org/script/command-line-processing.php)
> - [GraphicsMagick 官方文档](http://www.graphicsmagick.org/utilities.html)

图片格式转换

```sh
# 将 svg 转为 png
magick example.svg example.png
# 给 svg 填充透明背景
magick -background none example.svg example.png
# 将 png 转为 jpg
magick example.png example.jpg
```

调整图片尺寸

```sh
# 宽度设为 800，高度按原比例缩放
magick input.png -resize 800 output.png
# 高度设为 600，宽度按原比例缩放
magick input.png -resize x600 output.png
# 保留原比例，可能会缩小宽度或高度
magick input.png -resize 800x600 output.png
# 上述变化后填充背景
magick input.png -resize 800x600 -background white -gravity center -extent 800x600 output.png
# 保留原比例，可能会放大宽度或高度
magick input.png -resize 800x600^ output.png
# 上述变化后裁剪图片
magick input.png -resize 800x600^ -background none -gravity center -extent 800x600 output.png
# 忽略原比例，可能让图片变形
magick input.png -resize 800x600! output.png
# 保留原比例，按百分比缩放
magick input.png -resize 150% output.png
```

生成图片，可以是纯色的，可以是有文字的，也可以是有图案的

```sh
# 图片尺寸 400x300，纯黑色，保存到 black.png
magick -size 400x300 xc:black black.png
# 文字居中、白色、大小 48、无偏转
# 内容为 "Hello World!"
magick -size 400x300 xc:none \
  -gravity center -fill white -pointsize 48 \
  -annotate 0 "Hello World!" text.png
# 图案为棋盘格子
magick -size 400x300 pattern:checkerboard checkerboard.png
```

### 使用 chafa

[官方手册页](https://hpjansson.org/chafa/man/)

在终端显示图片

```sh
chafa example.png
```

制作 ASCII 艺术

```sh
# 使用 braille 符号集，不要颜色
chafa -f symbols --symbols braille -c none example.jpg > example.txt
# 保留前景色
chafa -f symbols --symbols braille --fg-only example.jpg > example.txt
```
