---
title: "hook基础-useRef/useCallback/useMemo/useReducer"
date: "2020-1-3"
tag: "react-hook"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# hook-非常见


## useRef
顾名思义，ref获取引用.该hook作用是获取一个可变变量的引用.并且保持它最新的值， 它的结构是：{current: ....}, current永远都是最新的， 不受闭包的影响。

一句话， 获取最新的状态改变，但你不希望它改变的时候你收到通知, 并重新渲染.（像effect)

userRef两个应用
1. 用于变量： 类似定时器id啊之类的， 需要时刻更新它最新的值.
2. 用于dom元素：获取ref
[ref](https://codesandbox.io/s/github/btholt/react-hooks-examples/tree/master/?module=%2Fsrc%2FRef.js)
```js
import React, { useState, useEffect, useRef } from "react";

const RefComponent = () => {
  const [stateNumber, setStateNumber] = useState(0);
  const numRef = useRef(0);

  function incrementAndDelayLogging() {
    setStateNumber(stateNumber + 1);
    numRef.current++;
    setTimeout(
        // 在alert内 stateNumber受闭包影响
        // numRef总是最新的， 不受闭包影响
      () => alert(`state: ${stateNumber} | ref: ${numRef.current}`),
      1000
    );
  }

  return (
    <div>
      <h1>useRef Example</h1>
      <button onClick={incrementAndDelayLogging}>delay logging</button>
      <h4>state: {stateNumber}</h4>
      <h4>ref: {numRef.current}</h4>
    </div>
  );
};

export default RefComponent;

```
```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);// 用useState？当时还未渲染呢， 怎么使用, 用ref存元素算是最常用的方法了
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## useReducer
用过redux吗？那么useReducer就是一个简化版本的redux.

同时，useReducer也是增强版的useState.相比于使用useState来保存哈希表， 我更倾向于使用useReducer.让数据的变化易于管理.

1. 定义reducer, reducer包含两个参数， state状态本身， action对state操作的行为
2. 初始化reducer, useReducer(arg1, arg2) 参数1为reducer, 参数2为数据初始化值
3. userReducer返回一个数组， 0为双向绑定的数据， 1为dispatch， 我们通过dispatch改变state
```js
const initialState = {count: 0};

// 每次操作返回一个新的state
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## useMemo
运用缓存.我们写的是纯函数.如果依赖项(一般是入参)不改变，那么就从缓存中取值.useMemo(fn)立即返回结果。

常见的使用手段是： 先正常写， 写完后，加入useMemo,达到性能优化的目的.
API解析：
```js
// arg1: 必选参数： 复杂或有性能问题的计算
// arg2: 可选参数： 如果不传则每次进行计算
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
```js
import React, { useState, useMemo } from "react";

const fibonacci = n => {
  if (n <= 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const MemoComponent = () => {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const fib = useMemo(() => fibonacci(num), [num]);

  return (
    <div>
      <h1
        onClick={() => setIsGreen(!isGreen)}
        style={{ color: isGreen ? "limegreen" : "crimson" }}
      >
        useMemo Example
      </h1>
      <h2>
        Fibonacci of {num} is {fib}
      </h2>
      <button onClick={() => setNum(num + 1)}>➕</button>
    </div>
  );
};

export default MemoComponent;
```

## useCallback
useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
