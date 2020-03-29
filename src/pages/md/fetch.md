---
title: "基于node-fetch二次封装"
date: "2017-08-10"
tag: "ES6"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

背景：项目中我们使用 koa2 作为静态资源+转发代理服务器.前端 react.

冲突：后端对于某些业务逻辑执着于状态返回 500/400， 而不是使用统一的错误码， 我们又必须拿到错误信息.
我们在 koa2 使用的 fetch 库为：request-promise-native. 一个 promise 请求库的实现.这个库的特点在于，

1. 请求数据后自动解析
2. 返回一个 promise
3. 遇到非 200-300 自动抛出错误

由于我们前端从 koa2 走了一层转发，基于 request-promise-native 库的特性， 那么对于后端返回的 500/400 此时被当作错误抛出。我们前端此时拿到了只有 500， 和一个 server error.于是和 leader 商量了一下，作出以下决定：

1. 后端返回统一格式：

```json
{
  "code": "int",
  "body": "Object"
  // other info
}
```

2. koa2 层抛弃 request-promise-native.统一使用标准的 fetch 实现.
3. 封装统一的错误处理（主要是前端， koa2 主要做日志记录）

经过技术调研，我们选择了 node-fetch 这个第三方实现.达到了在 node 端实现了 fetch 的功能。当然也会存在一些不一致，在 github 主页也已经提出.
[已知差异](https://github.com/bitinn/node-fetch/blob/master/LIMITS.md)

技术选型确定就是确定 feature 的范围，除了本身的 fetch 的标准功能还包括以下 feature:

1. 支持 https 的 rejectUnauthorized
2. 给出默认的 content-type
3. 集成日志： 请求耗时/请求记录/请求详细信息/请求错误
4. 返回数据解析为：json/text/form/blob

### 支持 https 的 rejectUnauthorized

为什么要支持...因为我们的基础建设没有做好. [解决方案](https://yongqiang.live/javascript/node-fetch/)

在 issus 上也有相关的讨论，不在赘述
[issus](https://github.com/bitinn/node-fetch/issues/453)

### 给出默认的 content-type

思路很简单，判定请求类型和请求参数的 content-type 字段， 如果有 content-type 那么优先选择用户自定的 content-type， 如果没有给则根据请求类型给 defautl content-type.

### 集成日志

这个很关键，因为我们在服务端之间又隔了一层，我们就要做日志，万一出问题方便 debug， 留下解题信息，我们用的是 winston，大部分都用这个吧.这个就是在封装 fetch 不同阶段去打印日志，没啥难度， 怎么选择看大家.

### 返回数据解析

这个就是在 content-type 确定后我们就可以知道默认要解析的 response 的类型是什么，可以把这一步做了，把最后结果直接返回.~~（但是这里我有个疑问，是否真的需要这个步骤，因为在 koa2 我们返回给前端的还是没解析过的数据啊.但我不可以直接在 koa2 层把 response 直接丢给前端， 返回的 body 好像有问题， ctx.body 好像不能接收一个 stream。）~~ 直接把返回的 response 转成 buffer 往前端丢就可以了。

代码如下：
前端也可以用，只不过要去掉日志部分，并且把解析那部分加上去，在再 handleRes 上做错误捕获， 和对应的错误处理即可.

```js
const fetch = require("node-fetch")
const logger = require("winston")
const uniqid = require("uniqid")
// node-fetch use rejectUnauthorized option : https://yongqiang.live/javascript/node-fetch/
// Difference from client-side fetch : https://github.com/bitinn/node-fetch/blob/master/LIMITS.md
const https = require("https")
const agent = new https.Agent({
  rejectUnauthorized: false,
})

const HttpMethod = {
  post: "POST",
  get: "GET",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
}

const ContentType = {
  json: "application/json;charset=UTF-8",
  form: "application/x-www-form-urlencoded; charset=UTF-8",
}

// request time log
// 1. next() init timer
// 2. next() start timeStamp
// 3. next() end timeStamp
const timerStep = function*(id, url) {
  yield
  const start = new Date()
  logger.info(`Request\t#${id}\t@${start.toISOString()}\t${url}`)
  yield
  const end = new Date()
  const delta = end.getTime() - start.getTime()
  logger.info(`Response\t#${id}\t@${end.toISOString()}\t△${delta}ms`)
}

const fetchF = async (url, config = { headers: {} }) => {
  let promise, contentTypeValue
  const id = uniqid()
  const timer = timerStep(id, url)
  timer.next()
  const isHttps = new URL(url).protocol === "https:"

  // set default Content-Type
  let contentType = config && config.headers && config.headers["Content-Type"]
  if (contentType) {
    contentTypeValue = config["Content-Type"]
  } else if (config.method === HttpMethod.post) {
    contentTypeValue = ContentType.form
  } else {
    contentTypeValue = ContentType.json
  }

  const headers = {
    ...config.headers,
    "Content-Type": contentTypeValue,
  }

  logger.info(`header is ${JSON.stringify(headers)}`)
  timer.next()

  console.log('"Request body: "', JSON.stringify(config.body))

  if (!config.method || config.method === HttpMethod.get) {
    promise = await fetch(url, {
      headers,
      agent: isHttps ? agent : false,
    })
  } else if (config.method === HttpMethod.post) {
    promise = await fetch(url, {
      body: JSON.stringify(config.body),
      headers,
      method: HttpMethod.post,
      agent: isHttps ? agent : false,
    })
  } else {
    promise = await fetch(url, {
      body: JSON.stringify(config.body),
      headers,
      method: config.method,
      agent: isHttps ? agent : false,
    })
  }

  timer.next()
  return promise.buffer()
}

const parseRes = async res => {
  const contentType = res.headers.get("Content-Type")
  if (contentType) {
    if (contentType.indexOf("json") > -1) {
      return res.json()
    }
    if (contentType.indexOf("text") > -1) {
      return res.text()
    }
    if (contentType.indexOf("form") > -1) {
      return res.formData()
    }
    if (contentType.indexOf("video") > -1) {
      return res.blob()
    }
  }
  return res.text
}

const handleRes = async res => {
  const parsedRes = await parseRes(res)
  return parsedRes
  // if (res.ok) {
  //     return parsedRes;
  // }
  // const err = parsedRes;
  // throw err;
}

module.exports = fetchF
```

另外这个小姐姐的 ts 封装 fetch 是关键啊：
[fetch 简单封装(基于 ts)](https://juejin.im/post/5bed21e36fb9a049b77fee1f)
