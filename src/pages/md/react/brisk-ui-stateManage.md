---
title: "基于hook的状态管理tools"
date: "2020-01-03"
tag: "react-hook, state-manage"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# Brisk-ui-stateManage

### 1. `combineReducers`---合并reducer
这个是redux中的合并reducer函数.作用是把多个reducer合并成一个.一个application只有一个reducer.

关键点： 
1. 检测reducers类型错误->
2. 合并reducer->
3. 每个action计算每次最新的state并且返回->Done
*实现*
```js
reducerMap
const combineReducer = (reducerMap) => {
    // reducersMap转换二元组
    const reducers = Object.entries(reducerMap);
    // 校验reducers合法性： function类型
    reducers.forEach(([name, reducer]) => {
        if(typeof reducer !== 'function') {
            throw Error(`reducer ${name} is not a functon.`);
        }
    })
    // 合并reducers
    return (prevCombinedState = {}, action)  => {
        // 浅拷贝
        const newCombinedState = {...prevCombinedState};
        reducers.forEach(([name, reducer]) => {
            const pervState = prevCombinedState[name];
            const newState = reducer(pervCombinedState[name], action);
            if(newState !== prevState) {
                newCombinedState[name] = newState;
            }
        })

        return newCombinedState;
    }
}
```

### 2. `StoreProvider`---完成store的链接与注入
这个是一个封装的Provider的jsx组件， 在里面完成了reducer/store的初始化和链接, 以及children的传递.

关键点：
1. useReducer初始化reduers->
2. useStoreMiddleware自定义hook挂载中间件->
3. useRef链接初始state->Done

疑惑点： 
- useStoreMiddleware在这里做了什么事？
```js
import React, { createContext, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import useStoreMiddleware from './useStoreMiddleware';

// 创建一个空的Context对象对。当 React 渲染订阅这 个Context 对象的组件时，它将从组件树中匹配最接近的 Provider 中读取当前的 context 值。
// 在组件中使用provider注入.相当于容器
// 使用export暴露出去主要是用于之后使用useContext()
export const StoreContext = createContext();

const StoreProvider = ({
  children, reducer, middleware,
}) => {
  // 从StoreProvide参数中获取reducer并且使用useReducer初始化
  const [state, dispatch] = useReducer(reducer);
  // 挂载中间件
  const wrappedDispatcher = useStoreMiddleware([state, dispatch], middleware);
  // 初始化store
  const store = [state, wrappedDispatcher];
  // 初始化store默认值
  const storeInitialized = useRef(false);

  if (storeInitialized.current === false) {
    storeInitialized.current = true;
    wrappedDispatcher({ type: 'store/initialize' });
  }

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
```

### 3. useStoreMiddleware --- 中间件挂载
提供了一个useStore自定义hook来完成中间件的挂载。

挂载流程：
1. 检测中间件list(如果没有中间件，返回对应的dispacth函数)->
2. 执行中间件->
3. 执行检查(看是否需要初始化---创建的生命周期)->
4. 执行依赖挂载(对于state用effect进行监听， 如果产生变化， 则重新执行中间件的计算)->
5. 返回包裹了中间件改变前需要触发的检查(dispatch前的生命周期)->Done

```js
import { useEffect, useRef, useMemo } from 'react';

const useStoreMiddleware = (store, middlewareSettings) => {
  const middlewareWaitingForInitialization = useRef(true);
  const useEffectFirstLoad = useRef(true);
  const [state, dispatch] = store;

  // 如果没有中间件, 直接返回dispatch函数， 供reducer操作， 完成store的修改
  if (middlewareSettings === undefined
    || (Array.isArray(middlewareSettings) && middlewareSettings.length === 0)) {
    return dispatch;
  }

  // 如果存在中间件， 那么执行中间件， 并且使用useMemo进行缓存处理
  // useMemo: 
  // 疑问： 在这里就把它计算出来了吗?
  // 是的，没错
  const middlewareList = useMemo(
    () => (Symbol.iterator in middlewareSettings
      ? [...middlewareSettings].map(middleware => middleware(store))
      : [middlewareSettings(store)]),
    [middlewareSettings],
  );

  // 如果是首次加载， 并且提供了中间件初始化函数， 那么进行数据的初始化， 并且把标识是否初始化的flag改为false, 类似数据初始化的生命周期
  if (middlewareWaitingForInitialization.current) {
    middlewareList.forEach((middleware) => {
      if (typeof middleware.initialize === 'function') {
        middleware.initialize(store);
      }
    });
    middlewareWaitingForInitialization.current = false;
  }
  // 数据监听， 监听state的变化， 如果发生改变， 并且不是首次执行， 则说明数据发生了改变， 触发中间件中的提交后函数（我觉得类似数据改变时触发的生命周期）
  useEffect(
    () => {
      if (!useEffectFirstLoad.current) {
        middlewareList.forEach((middleware) => {
          if (typeof middleware.afterDispatch === 'function') {
            middleware.afterDispatch(state);
          }
        });
      }
      useEffectFirstLoad.current = false;
    },
    [state],
  );

  return (action) => {
    // 那么这个就是reducer触发dispatch，之前的生命周期
    middlewareList.forEach((middleware) => {
      if (typeof middleware.beforeDispatch === 'function') {
        middleware.beforeDispatch(state, action);
      }
    });
    // 通过这种方式， 在dispatch前增加了一个动作， 其实这就是钩子， 在dispatch前增加了一个钩子
    return dispatch(action);
  };
};
// 那么总结一下： 对于redux的中间件包含： initialize-afterDispatch-beforeDispatch 三个周期(或者说函数)， 需要重点关注
```
一个常见的中间件
```js
const logger = () => {
  let trace = {};
  return ({
    beforeDispatch: (prevState, action) => {
      trace = {
        prevState,
        action,
      };
    },
    afterDispatch: (nextState) => {
      trace = {
        ...trace,
        nextState,
      };
      // eslint-disable-next-line no-console
      console.table(trace);
    },
  });
};

export default logger;
```

### 4. `useStore`
这个相当于访问总Store的门口，而我们的钥匙就是对应的filed字段.

疑问：
入参为store的文件路径？是reduce的name值.

出参类似useState的出参， 一个二元组， 0为对应的数据本身， 1为修改该数据的方法.

解析：
1. 用useContext从StoreContext取出二元组[state, dispatch`]
2. 根据入参从state取出对应的值subState(并且使用useMemo进行缓存, 保证大store下的性能)
3. 入参增强了useStore, 可以对数据进行一步处理
4. 返回subState， 与dispatch的二元组， 符合hook规范

```js
import { useContext, useMemo } from 'react';
import { StoreContext } from './StoreProvider';

/**
 * @param {string} [field]
 *   give a field name to get a sub-state
 *
 * @param {function} [selector]
 *   a selector function that'll be memoized,
 *   or a string of state property.
 */
const useStore = (...args) => {
  // 这里会返回一个二元组： 1. state本身 2. 返回修改state的函数， 也就是dispatch
  const store = useContext(StoreContext);

  const [state, dispatch] = store;
  // 这相当于从state取东西的时候做一个缓存
  // 根据入参判断：
  // 1. 如果第一个参数类型为string, 把它当作state的一个filed
  //    1. 1如果第二个参数为函数， 那么把它当作一个过滤函数(state) => {return filter(state)}
  // 2. 如果第1个参数为函数， 那么把它当作一个过滤函数(state) => {return filter(state)}
  // 3. 如果第一个参函数为空， 报错
  // 返回值：
  // 所以这里的返回值是一个二元组：[带缓存的state, dispatch]
  // 总结
  // 我的理解啊，在这里dispatch并没做啥改动， 就做了一个传递
  // 在useStore里，我们主要是对从state中取值进行了一个增强， 基本功能是通过filed取对应的state, 
  // 增强功能是增加了一个数据处理器， 可以先对数据进行粗粒度的处理
  // 然后再用hook常用的形式返回，便于调用
  const memoizedSubState = useMemo(() => {
    let subState = state;
    const firstParamType = typeof args[0];
    if (firstParamType === 'string') {
      // if first param is string, take it as 'field' name
      const field = args[0];
      subState = state && state[field];

      // only when first param is string, second param could be a selector function.
      if (typeof args[1] === 'function') {
        const selector = args[1];
        subState = selector(subState);
      }
    } else if (firstParamType === 'function') {
      // if first parameter is a function, take it as the selector.
      const selector = args[0];
      subState = selector(state);
    } else if (firstParamType !== 'undefined') {
      console.error(`Selector should either be a string or a function but received ${firstParamType}.`);
    }
    return subState;
  }, [state, ...args]);

  return [memoizedSubState, dispatch];
};

export default useStore;
```
至此， 对于brisk-stateManage的源码就算结束了。很精妙和精巧.