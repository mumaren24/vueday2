# Vue.js - Day2



## 今天主要学习目标
1. 能够定义和使用 `过滤器`
2. 了解实例 `生命周期` 和 `生命周期函数`
3. 能够使用 `axios` 发起 Ajax 请求
4. 能够使用 Vue 中常见的 `过渡动画`




## 1. Vue指令之`v-if`和`v-show`

- v-if 和 v-show 的作用，都是切换界面上元素的显示或隐藏的；

> 一般来说，v-if 有更高的**切换消耗** 而  v-show 有更高的**初始渲染消耗**。

> 因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好。

- 根据应用场景区分：

> 举例：袜子要不要洗的问题



## 2. `Vue.$set()` 动态添加数据绑定

> 语法：[Vue.$set( target, key, value )](https://cn.vuejs.org/v2/api/#Vue-set)

> 作用：设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，**同时触发视图更新**。这个方法主要用于避开 Vue 不能检测属性被添加的限制。

> 注意：对象不能是 Vue 实例，或者 Vue 实例的根数据对象。



## 3. `Vue.$mount()` 动态挂载实例【了解】

> 语法：Vue.$mount("选择器 - 指定要控制的区域")



## 4. `template`属性指定模板

注意：如果 在 `new Vue` 实例的时候，既指定了 `el` 又指定了 `template`，则 会把 `template` 指定的模板结构，替换掉 `el` 的模板结构；



## 3. 过滤器
+ `"2018-01-25T02:10:02.945Z"`    =>   `2018-01-25 `
+ 概念：Vue.js 允许你自定义过滤器，**可被用作一些常见的文本格式化**。
+ 过滤器只可以用在两个地方：**mustache 插值和 v-bind 表达式**。
+ 过滤器应该被添加在 JavaScript 表达式的尾部，由**“管道”符**指示；

### 3.1 全局过滤器
1. **定义全局过滤器的语法**
   + `Vue.filter('过滤器的名称', function(originVal){ /* 对数据进行处理的过程，在这个 function 中，最后必须 return 一个处理的结果 */ })`
2. **使用全局过滤器的语法**
   + `<span>{{ dt | 过滤器的名称 }}</span>`
3. **使用过滤器的注意事项：**
   + 如果想拿管道符前面的值，通过 function 的第一个形参来拿
   + 过滤器中，一定要返回一个处理的结果，否则就是一个无效的过滤器
   + 在调用过滤器的时候，直接通过 () 调用就能传参； 从过滤器处理函数的第二个形参开始接收传递过来的参数
   + 可以 多次 使用 | 管道符 一次调用多个过滤器

### 3.2 私有过滤器
+ 语法：
```js
var vm = new Vue({
  el: '#app',
  data: {},
  filters: {
  	// 这是 古老的 ES3写法
    过滤器的名称: function(originVal){},
    // 这是最新的ES6写法【推荐】
    过滤器的名称(originVal){
        return 处理的结果
    }
  }
})
```

> 注意过滤器查找顺序问题：就近原则


## 4. [vue实例的生命周期](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期)
### 4.1 什么是生命周期（每个实例的一辈子）
概念：每一个Vue实例创建、运行、销毁的过程，就是生命周期；在实例的生命周期中，总是伴随着各种事件，这些事件就是生命周期函数；

生命周期：实例的生命周期，就是一个阶段，从创建到运行，再到销毁的阶段；

生命周期函数：在实例的生命周期中，在特定阶段执行的一些特定的事件，这些事件，叫做 生命周期函数；

> [生命周期钩子](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)：就是生命周期事件的别名而已；

> 生命周期钩子 = 生命周期函数 = 生命周期事件

### 4.2 主要的生命周期函数分类
 - **创建期间**的生命周期函数：(特点：每个实例一辈子只执行一次)
   + beforeCreate：创建之前，此时 data 和 methods 尚未初始化
   + **created**(第一个重要的函数，此时，data 和 methods 已经创建好了，可以被访问了)
   + beforeMount：挂载模板结构之前，此时，页面还没有被渲染到浏览器中；
   + **mounted**（第二个重要的函数，此时，页面刚刚被渲染出来；如果要操作DOM元素，最好在这个阶段）
 - **运行期间**的生命周期函数：（特点：按需被调用 至少0次，最多N次）
   + beforeUpdate：数据是最新的，页面是旧的
   + updated：页面和数据都是最新的
 - **销毁期间**的生命周期函数：(特点：每个实例一辈子只执行一次)
   + beforeDestroy：销毁之前，实例还正常可用
   + destroyed：销毁之后，实例已经不工作了



## 5. [axios 实现数据接口请求](https://www.npmjs.com/package/axios)
1. 之前的学习中，如何发起数据请求？
   1. 最开始自己 new XHR
   2. 使用Jquery中提供的工具函数 `$.ajax({配置对象})`, `$.post(url地址, function(){})`， `$.get(url地址, 处理函数)`
   3. `axios`发起请求；只支持`get`和`post`请求，无法发起`JSONP`请求;如果涉及到 JSONP请求，可以让后端启用 `cors` 跨域资源共享即可；


2. 常见的数据请求类型？
   + get请求
   + post请求
   + jsonp请求
3. 在Vue中，可以使用`vue-resource`或`axios`发起数据请求
   + `vue-resource` 支持 get, post, jsonp请求【官方不推荐使用这个包了！】
4. 用于测试的URL请求资源地址：


```
get 请求地址：  http://www.escook.cn:3000/api/getlunbo
post请求地址：  http://www.escook.cn:3000/api/post
```
1. 使用 `axios.get()` 和 `axios.post()` 发起请求
2. 使用拦截器实现 loading 效果【拓展 - 了解即可】
3. 使用 async 和 await 结合 axios 发起 Ajax 请求


## 6. 品牌管理案例
### 展示品牌列表

### 添加品牌数据

### 删除品牌数据

### 根据品牌名称筛选



## 7. [Vue中的动画](https://cn.vuejs.org/v2/guide/transitions.html)
> 为什么要有动画：

### 7.1 使用过渡类名

### 7.2 [使用第三方 CSS 动画库](https://cn.vuejs.org/v2/guide/transitions.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D)

### 7.3 使用动画钩子函数

### 7.4 [v-for 的列表过渡](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1)


### 7.5 列表的排序过渡
`<transition-group>` 组件还有一个特殊之处。不仅可以进入和离开动画，**还可以改变定位**。要使用这个新功能只需了解新增的 `v-move` 特性，**它会在元素的改变定位的过程中应用**。
+ `v-move` 和 `v-leave-active` 结合使用，能够让列表的过渡更加平缓柔和：
```
.v-move{
  transition: all 0.8s ease;
}
.v-leave-active{
  position: absolute;
}
```



## 相关文章
1. [vue.js 1.x 文档](https://v1-cn.vuejs.org/)
2. [vue.js 2.x 文档](https://cn.vuejs.org/)
3. [String.prototype.padStart(maxLength, fillString)](http://www.css88.com/archives/7715)
4. [js 里面的键盘事件对应的键码](http://www.cnblogs.com/wuhua1/p/6686237.html)
5. [pagekit/vue-resource](https://github.com/pagekit/vue-resource)
6. [navicat如何导入sql文件和导出sql文件](https://jingyan.baidu.com/article/a65957f4976aad24e67f9b9b.html)
7. [贝塞尔在线生成器](http://cubic-bezier.com/#.4,-0.3,1,.33)