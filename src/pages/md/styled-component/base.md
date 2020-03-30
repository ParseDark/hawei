---
title: "styled-components基础"
date: "2020-1-3"
tag: "css-in-js"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

# styled-components 

是什么？ 
# Styled-Components是解决css-in-js较为成熟的npm包.  
为什么， 解决了什么问题？ 
# 主要解决的问题： css-in-js中的组织方式，把单纯的样式组件很好的使用可读性高的语法组织起来. 并且赋予简单并且强大的逻辑.
怎么做， 如何使用？ 
## 使用
### 1. 安装
```shell
npm install --save styled-components
```
### 2. 基本语法
```js
// 导入
import styled from 'styled-components';

// 使用styled关键字, 生成对应的样式组件
const Title = styled.h1`
    font-size: 1.5em;
`

const Wrapper = styled.section`
    padding: 4rem;
`

() => {
    // 在render函数中直接使用对应组件
    return (
        <Wrapper>
            <Title>
            </Title>
        </Wrapper>
    )
}
```

### 3. 适应Props
使用styled-components时， 我们可以对样式组件加入一些简单的样式. 在我们的模板字符串中， 我们可以获取默认的props.

来看个例子
```js
const Button = styled.button`
  background: ${ props => props.primary ? 'palevioletred' : 'white'}
  color: ${ props => props.primary ? 'white' :'palevioletred'}
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

() => {
    return (
        <div>
            <Button>whte background-color and palevioletred color</Button> 
            <Button primary>palevioletred background-color and white color</Button>
        </div>
    )
}

```

### 4. 扩展样式
对于原有的样式增加个性化的扩展.例如button的不同status.

```js
const Button = style.button`
  background: ${ props => props.primary ? 'palevioletred' : 'white'}
  color: ${ props => props.primary ? 'white' :'palevioletred'}
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const TomatoButton = styled(Button)`
    color: tomato;
    border-color: tomato;
`

() => {

    return (
        <div>
            <Button></Button>
            <TomatoButton></TomatoButton>
        </div>
    )
}
```

### 5. 元素转换
替换原有规则的标签.例如你的Button切换成a标签或许更合适.
ps: 注意，这条规则同时应用于用户自定义的元素.
```js
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="/">Link with Button styles</Button>
    <TomatoButton as="a" href="/">Link with Tomato Button styles</TomatoButton>
  </div>
);  
```

### 6. 对任意的样式进行重写和扩展
对于任意的第三方UI库， 我们可以通过扩展语法自定义UI样式.
```js
// This could be react-router-dom's Link for example
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);
const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;
render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```

### 7. 属性传递
对于我们需要自定义的属性值， 我们可以通过props进行传递.// 例如color
```js
// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
// Render a styled text input with the standard input color, and one with a custom input color
render(
  <div>
    <Input defaultValue="@probablyup" type="text" />
    <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
  </div>
);
```

### 8. 推荐的样式管理
如果你常用css-in-modules， 那么你肯定习惯于使用scss或者less类似这样的库来进行样式分离, 然后把分离后的文件导入js/jsx.而在css-in-js中， 我们使用的是一种样式分离的风格来解决样式和代码分开.
```js
import React from 'react'
import styled from 'styled-components'

const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  /* ... */
`
const Button = styled.button`
  /* ... */
`

export default class Counter extends React.Component {
  state = { count: 0 }

  increment = () => this.setState({ count: this.state.count + 1 })
  decrement = () => this.setState({ count: this.state.count - 1 })

  render() {
    return (
      <StyledCounter>
        <Paragraph>{this.state.count}</Paragraph>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </StyledCounter>
    )
  }
}

```

### 9. 把你的css-in-js代码写在组件体外.否则会有性能问题.
这个很好理解，如果是经常被调用的组件，每次都重新创建一次静态的样式组件， 那么就会产生性能损耗.
```js
// 我们推荐的写法
const StyledWrapper = styled.div`
  /* ... */
`

const Wrapper = ({ message }) => {
  return <StyledWrapper>{message}</StyledWrapper>
}
```

```js
// 反例: 把静态展示组件写在stateless组件中
const Wrapper = ({ message }) => {
  // WARNING: THIS IS VERY VERY BAD AND SLOW, DO NOT DO THIS!!!
  const StyledWrapper = styled.div`
    /* ... */
  `

  return <StyledWrapper>{message}</StyledWrapper>
}
```
### 10. 样式的嵌套/伪类/伪元素 规则
对于伪类和伪元素可以直接使用对应的语法
```js

const Thing = styled.button`
  color: blue;

  ::before {
    content: '🚀';
  }

  :hover {
    color: red;
  }
`

render(
  <Thing>Hello world!</Thing>
)
```
对于嵌套样式， 我们使用的是scss类似的嵌套语法.
```js
const Thing = styled.div`
  color: blue;

  .something {
    border: 1px solid; // an element labeled ".something" inside <Thing>
    display: block;
  }
`

render(
  <Thing>
    <label htmlFor="foo-button" className="something">Mystery button</label>
    <button id="foo-button">What do I do?</button>
  </Thing>
)
```
类似scss， 他也有&符号， 熟悉Scss的都知道&代表自己的意思.

### 11. 对元素的属性进行编辑___attrs
我们可以对标签上的原生属性进行操作， 比如input标签的type/placeholder属性等.
```js
const Input = styled.input.attrs(props => ({
  type: 'password',
  size: props.size || '1em'
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`

() => {
  <div>
    <Input size='2em'></Input>
  </div>
}
```

### 12.animations____keyframes
在styled-components中，我们使用keyframes方法来模拟css3中的@keyframes.写法一致.
```js
const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`

const Rotate = styled.div`
  display : inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
  font-size: 1.2rem;
`;

() => {
  return (
    <Rotate></Rotate>
  )
}
```
