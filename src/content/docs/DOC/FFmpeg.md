---
title: FFmpeg
---

## 简介

FFmpeg 是一个知名的多媒体处理库，可以对音视频进行合成、解码、格式转换、剪辑等多种功能。

## 安装

```sh
# Windows
scoop install ffmpeg
```

## 使用

MP4 转 Gif

```sh
ffmpeg -i input.mp4 output.gif
# 帧率 10fps，宽度 640px，高度保持比例
ffmpeg -i input.mp4 -vf "fps=10,scale=640:-1" output.gif
# 裁剪左上角 200x200 的区域
ffmpeg -i input.mp4 -vf "crop=200:200:0:0" output.gif
# 变为 2 倍速
ffmpeg -i input.mp4 -vf "[0:v]setpts=0.5*PTS" output.gif
# 变为 0.5 倍速
ffmpeg -i input.mp4 -vf "[0:v]setpts=2*PTS" output.gif
# 截取 30 秒的后 5 秒
ffmpeg -i input.mp4 -ss 00:00:30 -t 5 output.gif
# 左上角添加水印
ffmpeg -i input.mp4 -vf "drawtext=text='Your Text':x=10:y=10:fontsize=24:fontcolor=white" output-7.gif
```
