---
title: "webWorker 入坑"
date: "2020-03-29"
tag: "worker"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# webworker
我们知道js是单线程语言,虽然我们有类似于Promise/async/await/generator这样的语法，让我们进行一些异步操作.
但是，对于一些大计算量的任务，js还无法胜任。
于是我们有了webworker,webworker, 从主线程触发， 开辟独立于主线程之外的线程, 两者独立运行， 互不干扰。
我们把一些阻塞UI渲染的操作放到worker中去进行计算，完成后返回给主线程， 主线程执行接下来的操作(一般都是异步的啊)。比较常见的应用有：文件上传， 接口调用， 独立渲染图层， 多线程渲染canvas不同区域.

## 定义
定义一个webworker非常简单， 使用浏览器自带的api即可.
```js
// 1. 文件
const worker = new Worker('http://~.js')
// 2. String
const data = `
    //  worker线程 do something
    `;
// 转成二进制对象
const blob = new Blob([data]);
// 生成url
const url = window.URL.createObjectURL(blob);
// 加载url
const worker = new Worker(url);
```
worker存在的限制：
>分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。

>worker 不能读取本地的文件(不能打开本机的文件系统file://)，它所加载的脚本必须来自网络。

## worker与主进程通信
```js
// worker->主
// 可以传递的信息包括： 对象和数组。（你肯定知道， 传递对象的时候要序列化数组， 所以你的对象不能包含function)
worker.postMessage({
    hello: ['hello', 'world']
})
```
```js
// 主->worker:主线程监听worker线程回调函数
worker.onmessage = function (e) {
    console.log('父进程接收的数据：', e.data);
    // doSomething();
}
```

## 关闭worker
这个肯定啊， 开启一个线程需要系统资源，不用了肯定关闭资源， 释放内存啊。
```js
worker.terminate(); // 主线程关闭worker线程
```

## 错误处理
对于异步操作我们都需要进行错误处理， promise我们使用catch， async/await我们使用try-catch语句.
```js
// worker线程报错
worker.onerror = e => {
    // e.filename - 发生错误的脚本文件名；e.lineno - 出现错误的行号；以及 e.message - 可读性良好的错误消息
    console.log('onerror', e);
};
```

## worker内部
1. self/WorkerGlobalScope.
像web对象， 我们有window， 指向当前上下文， 在webworker里， 我们使用self指向自己本身.

```js
// 监听主线程传递过来的消息
self.onmessage = e => {
    console.log("主->work")
}
// 发送消息给主线程
self.postMessage({
    hello: [ '这条信息', '来自worker线程' ]
});
//关闭自身
self.close()

// 线程加载外部脚本
// 这里注意两点
// 脚本中的全局变量都能被 worker 线程使用。
// 脚本的下载顺序是不固定的，但执行时会按照传入 importScripts() 中的文件名顺序进行，这个过程是同步的。
importScripts('http~.js','http~2.js');
```

## webworker线程限制
因为 worker 创造了另外一个线程，不在主线程上，相应的会有一些限制，

我们无法使用下列对象：
1. window 对象
2. document 对象
3. DOM 对象
4. parent 对象

我们可以使用：

1. 浏览器：navigator 对象
2. URL：location 对象，只读
3. 发送请求：XMLHttpRequest 对象
4. 定时器：setTimeout/setInterval，在 worker 线程轮询也是很棒！
5. `应用缓存：Application Cache

