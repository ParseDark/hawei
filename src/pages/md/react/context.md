---
title: "hook基础-context"
date: "2020-1-3"
tag: "react-hook"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# context
context是针对中小型应用，没有复杂的状态管理的需求， 提供的内置状态管理工具.
>官方定义： Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

如果没有context我们的数据流会变成， 在每一级的组件中， 去使用props传递我们需要的值.

使用基本分为：创建context=>注入=>在组件内引入=>使用

## 1. 创建context
新建context.js
```js
import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
```

## 2. 注入context
```js
// 在最外层的组件注入
// 这个才是他妈的重点， 注入的时候， 必须要把整个useStateHook注入进去， 不然set函数就没有
const themeContenxtContainer = useState('default')

return (
    <ThemeContext.Provider value={themeContextContainer}>
    </ThemeContext.Provider>
)
```

## 3. 使用context

```js
() => {
    // 只有上面把reactHook注入了， 在这里才能获取到theme和setTheme
    const [theme, setTheme] = useContext(ThemeContext)
    return (
        <div>
            {theme}
            <button onClick={() => setTheme('red')}></button>
        </div>
    ) 
}

```
