---
title: React
---

## 简介

React 是一个 `用于构建 Web 和原生交互界面的库`，不过社区里更喜欢称其为 **前端框架**。该框架非常流行，生态很好

## 安装

我比较习惯使用 `Vite` 来初始化 React 应用

```sh
npm create vite@latest my-react-app -- --template react
```

这会使用 `react` 模板新建一个名为 `my-react-app` 的项目，然后可以使用 `npm install` 一键安装所有的依赖。新版的 `Vite` 可以自动帮你安装依赖

另外 `create-react-app` 也是种选择，而且这似乎是官方的工具

```sh
npx create-react-app my-app
```

## 特点

### 组件和 JSX

React 使用组件，即自定义的 _HTML 标签_ 作为基本的代码复用模块。

React 还扩展了 _JavaScript_ 的语法，使得我们可以直接在 _JavaScript_ 中编写类似 _HTML_ 的元素。由于这种语法浏览器无法理解，因此一般会把用到扩展语法的文件后缀改为 `jsx`，表明该文件需要特殊处理。

```jsx
// JSX 扩展语法
const element = <div>JSX Example</div>;

// 组件
const App = () => {
  const name = "React";
  return (
    <div>
      <h1>Hello, {name}!</h1>
      {element}
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
```

### 虚拟 DOM 和 Native

React 还有一个重要概念，就是 **虚拟 DOM**。真实 DOM 可能很庞大，React 使用更轻量的虚拟 DOM 去模拟，这使得在 React 中操作 DOM 更加快速。当然了，虚拟 DOM 最终还是要映射回真实 DOM 的，因此使用 React 很难比纯 JavaScript 更快。

不过也正是因为虚拟 DOM，才使得 React 可以通过 **React Native** 开发 Android/iOS 原生应用。其原理就是把虚拟 DOM 映射到原生的 Android/iOS UI，和映射到 HTML DOM 是类似的。

## 最佳实践

React 本身发展很快，接口一直在变，最佳实践也一直在变。早些时候 React 使用类组件，现在最佳实践已经变成函数组件了

React 主要用于渲染界面，同时也提供了状态管理功能，以便辅助渲染。这些状态管理主要是通过 _hook_ 和 _context_ 实现的。

- hook 由钩子定义的状态如果发生改变，组件就会自动重新渲染。React 提供了基本的 _hook_，并可以据此自定义 hook。
- context 当某些状态需要在组件间层层传递时，可以使用上下文来简化代码，这其实就是定义了全局状态。

一个最佳实践的启发性原则是，将渲染和逻辑分离。所有的逻辑都放到自定义 hook 里实现，而组件只使用这些 hook，并编写和渲染相关的代码。

## 相关工具

React 最大的优势也许就是生态好。有很多基于 React 的库，它们通常都以 _react-xxx_ 开头，比如

- react-router 处理路由
- react-query 管理异步查询的前端状态
- react-redux 使用 redux 进行状态管理

React 本身算是个框架，但同时还衍生出了一些框架的框架，比如 `Next` 和 `Expo`
