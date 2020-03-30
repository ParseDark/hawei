---
title: "ES新语法点: entries | Map "
date: "2020-03-29"
tag: "ES6"
banner: "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/04/0B/ChMlWl0-oHmIDZvqAAdz3RsOKEYAAMMNwPQhEkAB3P1417.jpg"
---

## Object.entries
入参： 对象
作用： 获取对象的枚举属性， 并且返回一个数组，数组包含一个二元组
注意： 原型链上的key-value不可枚举
```js
// 基本栗子
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

// property上不可枚举, 设置枚举属性为false的key不可枚举
// getFoo is property which isn't enumerable
const myObj = Object.create({}, { getFoo: { value() { return this.foo; } } });
myObj.foo = 'bar';
console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]

// 把object转换成map
var obj = { foo: "bar", baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

## Map
Map保存键值对.

语法
```js
// iterabel: 可迭代对象
new Map([iterable])
```
特征：
1. 可以使用for..of遍历Map
2. key值不相等

Object和Map区别
1. Object的key只能是字符串或者Symbol, 但是Map则可以是任意值
2. Map的值是有序的，返回的顺序是根据插入顺序， 而增加到对象上的key则是无序的
3. 你可以通过 size 属性直接获取一个 Map 的键值对个数，而 Object 的键值对个数只能手动计算。
4. Map 可直接进行迭代，而 Object 的迭代需要先获取它的键数组，然后再进行迭代。
5. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。虽然 ES5 开始可以用 map = Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见。
6. Map 在涉及频繁增删键值对的场景下会有些性能优势。

### 方法
1. Map.prototype.clear(): 移除所有key-value
2. Map.prototype.delete(key): 删除key这一条属性， 如果存在， 返回true, 不存在返回false
3. Map.entries(): 返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
```js
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.entries();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```
4. Map.prototype.forEach(callbackFn(, thisArg)): 按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。
```js
function logMapElements(value, key, map) {
    console.log("m[" + key + "] = " + value);
}
Map([["foo", 3], ["bar", {}], ["baz", undefined]]).forEach(logMapElements);
// logs:
// "m[foo] = 3"
// "m[bar] = [object Object]"
// "m[baz] = undefined"
```
5. Map.prototype.get: 根据key获取value
6. Map.prototype.has: 判断一个key是否存在Map中
7. Map.prototype.keys: 包含map中所有的keys, 按插入顺序排序
```js
var myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

var mapIter = myMap.keys();

console.log(mapIter.next().value); // "0"
console.log(mapIter.next().value); // 1
console.log(mapIter.next().value); // Object
```
8. Map.prototype.set: 设置一个key/value
9. Map.prototype.values: 包含所有map的value值， 按插入顺序排序， 是一个迭代对象
10. Map.prototype[@@iterator](): 设置自定义的iterator

```js
var kvArray = [["key1", "value1"], ["key2", "value2"]];

// 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
var myMap = new Map(kvArray);

myMap.get("key1"); // 返回值为 "value1"

// 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
console.log(Array.from(myMap)); // 输出和kvArray相同的数组

// 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
```
