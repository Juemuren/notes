---
title: Ollama
---

## 简介

ollama 是一个 LLM 运行器，可以把 LLM 下载到本地运行

## 安装

```sh
# Windows
scoop install ollama
```

然后可以修改一下 `OLLAMA_MODELS` 环境变量，这个环境变量决定了模型保存到哪里

## 使用

ollama 采用 **C/S** 架构，因此本地跑模型得启动一个服务端和客户端

```sh
# 在一个 shell 会话中启动服务器
ollama serve
# 在另一个 shell 会话中运行大模型
ollama run deepseek-r1:1.5b
```

演示中使用的模型是 _1.5b_ 参数的 **deepseek r1** 。这个模型太弱了，建议换个更强的模型，选来演示纯粹是因为它几乎没有硬件要求
