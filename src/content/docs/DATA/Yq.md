---
title: Yq
---

## 简介

yq 是一个命令行 YAML 处理器

## 安装

```sh
# Windows
scoop install yq
```

## 使用

yq 使用类似 [jq](Jq.md) 的路径来访问字段

### 基本使用

测试文件为 `example.yaml`

```yaml
test:
  key: value
  array:
    - 114514
    - 1919180
```

```sh
# 查询，输出 value
yq '.test.key' example.yaml
# 查询，输出 114514
yq '.test.array[0]' example.yaml
# 修改，输出中 value 被修改为 new-value
yq '.test.key = "new-value"' example.yaml
# 将输出写入文件
yq '.test.key = "new-value"' example.yaml > new.yaml
# 或者直接修改文件
yq -i '.test.key = "new-value"' example.yaml
```

### 格式转换

```sh
# YAML 转 JSON
yq -o json example.yaml > example.json
# JSON 转 YAML
yq -o yaml example.json > example.yaml
```
