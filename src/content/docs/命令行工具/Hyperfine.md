---
title: Hyperfine
---

## 简介

hyperfine 是一个命令行基准测试工具

## 对比

相比 `time`，hyperfine 是专为基准测试使用的

- 可以指定运行的次数，统计均值和方差，且检测异常值
- 可以一次比较多条命令，并支持使用参数
- 可以指定 Shell，并且可以预热和清除缓存
- 有更好看的输出，且可导出为多种格式

## 安装

```sh
# Windows
scoop install hyperfine
```

## 使用

参考 [官方文档](https://github.com/sharkdp/hyperfine)

最基本的用法

```sh
# 对 command 进行基准测试
hyperfine 'command'
# 指定运行次数为 20
hyperfine -r 20 'command'
```

可以热启动或冷启动。热启动就是先让程序运行数次，填充缓存；冷启动就是先清楚缓存，然后再启动。

```sh
# 热启动，测试前先运行 5 次
hyperfine -w 5 'command'
# 冷启动，测试前运行先清除缓存，clear-cache 命令因系统而异
hyperfine -p 'clear-cache' 'command'
```

默认情况下会使用一个新的 Shell 进程运行命令，可以指定 Shell 的类型，或者直接在当前 Shell 运行

```sh
# 指定 shell
hyperfine -S pwsh 'command'
# 直接在当前 shell 运行
hyperfine -N 'command'
```

可以一次对多个命令进行基准测试，并且支持使用参数

```sh
# 对 command1 和 command2 进行测试
hyperfine 'command1' 'command2'
# 对 test1.ps1 ... test3.ps1 进行测试
hyperfine -N -P num 1 3 'pwsh -nop -f test{num}.ps1'
```
