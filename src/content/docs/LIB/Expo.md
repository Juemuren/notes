---
title: Expo
---

## 简介

Expo 是一个全栈 React Native 框架，可以开发 Android/iOS 原生应用。

## 安装

Expo 帮忙解决了很多事情，使得配置开发环境很简单。

安装 Expo 本身只需要运行

```sh
npx create-expo-app <project-name> --template
```

然后就会出现一个 `TUI` 让你选择想要使用的模板。

不过，如果要调试应用的话，还需要安装额外的东西。

## 调试

### Web 调试

在浏览器里调试应用是最简单的

```sh
npx expo install react-dom react-native-web
```

安装完这些包后就可以在浏览器里调试应用了

可以输入 `npm run web` 直接启动 Web 调试，或者先 `npm start`，等启动成功后再按 `w` 来开始调试。

### Android 调试

[官方文档](https://docs.expo.dev/get-started/set-up-your-environment/) 里只介绍了两种方法

- 使用 **真实安卓设备**。需要下载 **Expo Go**（可通过 Google Play 或手动上 [官网下载](https://expo.dev/go)），然后扫码即可调试应用。我认为这是最方便的方法，体验也比模拟设备好。不过缺点就是必须得有一台安卓设备，且该设备要和开发主机在同一个网络环境中。
- 使用 **Android Studio 的模拟器**。我不是很喜欢这个方法，因为很麻烦（得安装一个完整的 IDE 并配置 Java 环境），而且模拟器体验还不太好。最大优点就是与 Expo 集成很好，配置成功后可以直接 `npm run android` 启动模拟器调试，并且能够进行本地构建。

另外还有别的方法，就是使用其它模拟器，会更方便些，但相比 Android Studio 集成度就不是很好

- 玩游戏用的安卓模拟器。性能比 Android Studio 的更好，还有键位映射（毕竟是玩用来游戏的）。不过需要手动下载 Expo Go 然后侧载进模拟器里。调试时，需要手动复制 URL 到 Expo Go 中才能连接，且无法通过 _摇一摇_ 在模拟器里启动开发者面版（如果模拟器支持摇一摇应该是能用这个面版的）。
- WSA。与 Windows 集成最好，但微软已经停止支持，不过社区仍然在维护。可以参照指南 [安装 WSA](https://github.com/MustardChef/WSABuilds) 并 [侧载应用](https://github.com/MustardChef/WSABuilds/blob/master/Documentation/Usage%20Guides/Sideloading%20Guides/WSAFiles.md)。缺点同上。

### iOS 调试

苹果是高贵的系统，只有 macOS 才可以运行 iOS 模拟器，其它平台都不行。

如果手里没有苹果公司的机器，建议放弃调试苹果应用。虽然可能存在一些歪门邪道，但我不推荐继续折腾。

## 构建

可以选择 [本地构建](https://docs.expo.dev/guides/local-app-overview/) 或 [云端构建](https://docs.expo.dev/build/setup/)。

云端构建需要注册 Expo 账号，并且可能有免费额度。本地构建需要配置 Android Studio 和 Java 环境，或者拉取 Docker 镜像。
