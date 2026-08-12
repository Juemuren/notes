---
title: Codex
---

## 简介

Codex 是一个编程智能体，有 CLI、IDE Extension、Desktop APP 等多种形式。

本文只介绍其 CLI 版本。

## 对比

目前最火的 Code Agent 就是 Codex / Claude Code / OpenCode 这三个。简单对比如下

| 角度       | Codex | Claude Code | OpenCode   |
| ---------- | ----- | ----------- | ---------- |
| 实现语言   | Rust  | TypeScript  | TypeScript |
| 开源       | 是    | 否          | 是         |
| 模型兼容性 | 弱    | 弱          | 强         |

关于模型兼容性，显然 Codex 和 Claude Code 都是使用自家模型效果最好，而 OpenCode 则更加模型中立。因此，如果要使用别的模型，通常选择 OpenCode 最好。

除此之外这些 Code Agent 的用户体验几乎没什么区别，界面、快捷键、内置命令等都是相同的，用习惯了一个后完全可以无感地切换到另一个。

## 安装

Windows 系统建议在 WSL 里使用 Codex，否则 Codex 默认使用 pwsh。而 pwsh 启动慢、命令长、训练数据少，对于 Agent 来说我觉得各方面都不如 bash/zsh。

```sh
# Windows
scoop install codex
# Linux/macOS
brew install --cask codex
# npm
npm install -g @openai/codex
```

## 使用

可以运行 `codex --help` 查看详细的帮助

```sh
# 直接运行进入交互模式
codex
# 恢复之前的对话
codex resume
```

在交互界面中，输入 `/` 可以执行命令。一些常用的命令有

```sh
# 更换模型
/model
# 更改权限
/permissions
# 更改键位
/keymap
# 管理 memory
/memories
# 管理 hooks
/hooks
# 管理 skills
/skills
# 管理 mcp
/mcp
# 管理 plugins
/plugins
# 清空终端并开始新聊天
/clear
# 复制回复
/copy
# 查看会话配置和 token 用量
/status
# 退出交互
/exit # 或者 /quit
```

此外

- 输入 `@` 可以查找文件
- 输入 `!` 可以执行 Shell 命令
- 输入 `$` 可以执行 Skill
- 输入 `?` 打开帮助界面

而帮助界面又提到了一些有用的快捷键，比如

- `ctrl + g` 用外部编辑器编辑 prompt
- `ctrl + r` 反向搜索 prompt 历史记录
- `ctrl + t` 查看完整会话记录 transcript
