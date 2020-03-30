---
title: "hook基础-Portals"
date: "2020-01-03"
tag: "react-hook"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# Portals
提供渲染与root节点之外的方法.

## API
```js
// arg1: 可渲染的React组件
// arg2: 要渲染的容器
ReactDOM.createPortal(child, container);
```

## 用法
最常见的用法是模态框， 全局的loading
```js
// 日常我们使用react的时候， 都是return一个jsx， 供react渲染
render() {
    return (
        <div>
            {this.props.children} 
        </div>
    )
}

// 但有时候， 把我们的组件渲染在父节点之外是有必要的
render() {
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    )
}
```
一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

## 注意： 
如果使用了事件， 那么在父节点是可以捕获到对应的事件的.