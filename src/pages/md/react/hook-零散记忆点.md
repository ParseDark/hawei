---
title: "零散记忆点"
date: "2020-01-03"
tag: "待分类"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# 基本hook-useState/useEffect/useContext
注意点：
	1. useState： 永远返回一个数组，0是数据本身， 1是封装修改数据的方法.
	2. useEffect: 
		a. 副作用， 至少执行一次.
		b. 注意return 中是卸载方法：例如某些消息源的订阅
		c. 注意第二参数， 我理解第二参数指的是监听。传入的state会被监听， 如果被监听的元素发生改动，则触发effect。
		d. 执行顺序： 成对执行，下一次effect执行前会把上一次的effect 加载和卸载完成.
	3. useContext: 
		a. 类似一个全局可访问可修改的state.
		b. 使用顺序： 定义-注入-引用

# redux
store->reducer->action->dispatch.

store里初始化reducer, 并定义出action.

在action中显式的调用dispatch. // 外部(react)从action, 获取每个操作.action->reducer->state改变


# react-router-dom    exact
exact: 严格匹配
exact是Route下的一条属性，一般而言，react路由会匹配所有匹配到的路由组价，exact能够使得路由的匹配更严格一些。
```js
<Route path='/' component={Home} />
<Route path='/page' component={Page}>
// 这种情况下，如果匹配路由path='/page'，那么会把Home也会展示出来。
```
