## 目录结构

```
│  App.vue
│  main.js
│  manifest.json
│  package-lock.json
│  package.json
│  pages.json
│  uni.scss /* 全局 scss */
├─.hbuilderx
├─common /* 可复用的css或js */
│  ├─css
│  └─js
│      ├─api /* 请求的封装 */
│      └─mock /* mock数据 */
├─components /* 组件按 组件名/组件名.vue 的命名格式可以免去引入和声明 */
│  ├─authorList
│  ├─testComponents /* 测试组件 */
│  ├─trendPostFrom
│  ├─trendsImageGroup
│  ├─trendsList
│  ├─worksList
│  └─worksSkeleton
├─pages /* 主页(底部导航栏对应的页面)放pages目录下 在主页跳转的子页放主页文件夹下的subpages目录
│  ├─home
|  |  └─subpages 
│  ├─index
│  ├─testPage /* 测试页面 */
│  └─trending
├─static /* 静态资源文件夹 */
│  ├─images
│  └─mp-weixin
├─unpackage
├─uview-ui /* uview框架 */
└─wxcomponents /* 存放微信小程序格式的组件 */

```



## 注意事项

### uni-app

- 安装的插件：eslint-js,eslint-plugin-vue,git插件,htmlhint,prettier,scss/sass编译,Vue/Vuex/Vue Router代码块

- 官方文档列举了很多会出现bug的情况，出bug可以去官网搜索

- 页面跳转使用API方式(uni.)
- 用<template>替代<block>
- [长列表优化示例](https://ext.dcloud.net.cn/plugin?id=2863#detail)
- 如需要左右滑动的长列表，请在HBuilderX新建uni-app项目选新闻模板，那是一个标杆实现。自己用swiper和scroll-view做很容易引发性能问题
- 尽量减少组件数量
- 减少 scroll-view 组件的 scroll 事件监听，当监听 scroll-view 的滚动事件时，视图层会频繁的向逻辑层发送数据
- 监听 scroll-view 组件的滚动事件时，不要实时的改变 scroll-top/scroll-left 属性，因为监听滚动时，视图层向逻辑层通讯，改变 scroll-top/scroll-left 时，逻辑层又向视图层通讯，这样就可能造成通讯卡顿
- 注意 onPageScroll 的使用，onPageScroll 进行监听时，视图层会频繁的向逻辑层发送数据
- 原生组件无法在 scroll-view、swiper、picker-view、movable-view 中使用。

### vue

- 在 `uni-app` 中，定义在 data 里面的数据每次变化时都会通知视图层重新渲染页面。所以如果不是视图所需要的变量，可以不定义在 data 中，可在外部定义变量或直接挂载在vue实例上，以避免造成资源浪费
- 因为需求随时都在变动，尽可能多把代码封装成一个组件，同时写好组件的注释

### css

- 常用的复用的代码写在uni.scss
- css命名用-作分隔符

### js

- 变量命名用驼峰法

- 不要省略代表区块的{}

  比如：

  ```javascript
  if(a)
  return 1
  ```

- 不要省略代码后的分号(;)

- 全局变量的名称用全大写

- 把所有变量的声明都放在头部

- 使用严格相等(===)避免类型转换

- 自增（++）和自减（--）运算符尽量使用+=和-=代替

- 尽量避免在嵌套多层的地方使用this


- 在一些复杂功能的函数的上方使用以下注释

  ```javascript
  /**
  *函数功能
  *@param {参数类型} 描述信息
  *@return {返回类型} 描述信息
  **/
  ```

### 打包

#### this.getOptions is not a function

卸载node-sass 安装node-sass@5.0.0和sass-loader@10.1.1

#### h5

manifest.json

```json
  "h5": {
      "publicPath": "./"
  }
```

