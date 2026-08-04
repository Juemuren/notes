---
title: Hashcat
---

## 简介

hashcat 是一个用于暴力破解哈希算法的工具

## 安装

```sh
# Windows
scoop install hashcat
```

## 使用

hashcat 有多种使用方式

- 已知格式的破解
- 基于字典的破解

通过 `--attack-mode` 参数指定破解的模式，其中

- `0` 已知字典的破解
- `3` 已知格式的破解

通过 `--hash-type` 指定哈希的类型，其中 `0` 表示 `MD5` 算法。如果不指定，hashcat 会自动检测算法，需要较长时间。

### 已知格式

已知哈希值为 `c4d038b4bed09fdb1471ef51ec3a32cd`，哈希算法为 `MD5`，密码格式为 `?d?d?d?d?d?d`，即 _6_ 位数字

```sh
# 破解已知格式的哈希值
hashcat --hash-type 0 --attack-mode 3 c4d038b4bed09fdb1471ef51ec3a32cd "?d?d?d?d?d?d"
```

最终的输出为

```txt
c4d038b4bed09fdb1471ef51ec3a32cd:114514
```

验证一下确实如此

```sh
printf '114514' | md5sum
```

> [!caution] echo 的坑
>
> 运行 `echo '114514' | md5sum` 得到的结果并不是 `c4d038b4bed09fdb1471ef51ec3a32cd`，因为 `echo` 会在末尾添加 `\n` 符号
>
> 正确的做法运行 `echo -n '114514' | md5sum` 或者干脆使用 `printf`

### 已知字典

已知哈希值为 `459b9511a7f650ebd327889c45cc4e9b`，哈希算法为 `MD5`，字典为

```txt
123456
password
114514
i love you
i hate you
```

将字典保存为文件 `wordlist.txt` 并运行

```sh
# 破解已知字典的哈希值
hashcat --hash-type 0 --attack-mode 0 459b9511a7f650ebd327889c45cc4e9b $PWD/wordlist.txt
```

最后的输出为

```txt
459b9511a7f650ebd327889c45cc4e9b:i love you
```

验证一下确实如此

```sh
printf 'i love you' | md5sum
```
