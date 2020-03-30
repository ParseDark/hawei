---
title: "关于hook的最佳实践"
date: "2020-1-3"
tag: "react-hook"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# 关于hook的最佳实践

## 使用useState达到forceUpdate
Class组件可以通过forceUpdate实例方法来触发强制重新渲染。使用useState也可以模拟相同的效果：

```js
export default function useForceUpdate() {
  const [, setValue] = useState(0)
  return useCallback(() => {
    // 递增state值，强制React进行重新渲染
    setValue(val => (val + 1) % (Number.MAX_SAFE_INTEGER - 1))
  }, [])
}

```

## 使用react-hook封装localStorage的操作
简而言之， 把store的源放在浏览器的store中， 这是有意义的。

```ts
import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export default function useStorage<T>(
  key: string,
  // 默认值
  defaultValue?: T | (() => T),
  // 是否在窗口关闭后保持数据
  keepOnWindowClosed: boolean = true,
): [T | undefined,Dispatch<SetStateAction<T>>, () => void] {
  const storage = keepOnWindowClosed ? localStorage : sessionStorage

  // 尝试从Storage恢复值(因为在Storeage里的都是String类型)
  const getStorageValue = () => {
    try {
      const storageValue = storage.getItem(key)
      if (storageValue != null) {
        return JSON.parse(storageValue)
      } else if (defaultValue) {
        // 设置默认值
        const value = typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue
        storage.setItem(key, JSON.stringify(value))
        return value
      }
    } catch (err) {
      console.warn(`useStorage 无法获取${key}: `, err)
    }

    return undefined
  }

  const [value, setValue] = useState<T | undefined>(getStorageValue)

  // 更新组件状态并保存到Storage
  const save = useCallback<Dispatch<SetStateAction<T>>>(value => {
    setValue(prev => {
      const finalValue = typeof value === 'function' ? (value as (prev: T | undefined) => T)(prev) : value
      storage.setItem(key, JSON.stringify(finalValue))
      return finalValue
    })
  }, [])

  // 移除状态
  const clear = useCallback(() => {
    storage.removeItem(key)
    setValue(undefined)
  }, [])

  return [value, save, clear]
}
```
```js
// 基于js的实现
import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export default function useStorage(key, defaultValue, keepOnWindowClosed = true) {
    const storage = keepOnWindowClosed ? localStorage : sessionStorage;

    const getStorageValue = () => {
        try {
            const storageValue = storage.getItem(key);
            if(storageValue != null) {
                return JSON.parse(storageValue);
            } else if(defaultValue) {
                const value = defaultValue;
                storage.setItem(key, JSON.stringify(value));
                return value;
            }
        } catch(error) {
            console.warn(`无法获取${key}`, error);
        }

        return undefined;
    }

    const [value, setValue] = useState(getStorageValue)

    const save = useCallback(valeu => {
        setValue(prev => {
            const finalValue = value(prev)
            storage.setItem(key, JSON.stringify(finalValue))
            return finalValue
        })
    }, [])

    const clear = useCallback(() => {
        storage.removeItem(key)
        setValue(undefined)
    })

    return [value, save, clear]
}

```