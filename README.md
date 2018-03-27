# elementUI下拉框简单版

> 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

使用vue开发过几个项目了，对vue感觉很好，不愧为开源世界华人的骄傲（顺便膜拜下尤大~~）
Vue是一个数据驱动页面的一个框架，他的双向绑定原理使我们开发页面更简单
总结起来的几大特点：1.简洁2.轻量3.快速4.数据驱动5.模块友好6.组件化
在这整理一篇vue的丑陋版的下拉框组件(因为还没加更加详细的功能)，用作学习vue的笔记
 
开发组件的设计原则：（摘自elementUI）
一致性 Consistency
与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
反馈 Feedback
控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。
效率 Efficiency
简化流程：设计简洁直观的操作流程；
清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
可控 Controllability
用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
 
不仅要遵循以上原则，还必须要禁用vue全家桶，组件要遵循低耦合性

第一步安装vue脚手架，官网上有详细的说明，略过...
我没有用单元测试，直接将组将上到app.vue中了

第二步按照elementui的组件写法写好APP.vue等待开发

第三步写入button.vue、dropdown.vue、dropdown-ment.vue、dropdown-item.vue初始元素架构，准备开发了
现在基本已经有一个大致的内容了

第四步先给按钮加上点击事件，可以正确打印出显示隐藏的状态

第四步



1.按照elementUI的写法，将
<template>
  <div id="app">
    <div class="main">
      <my-dropdown @command="handleCommand">
        <my-button>
          {{smyectedValue}}<i class="my-icon-arrow-down"></i>
        </my-button>
        <my-dropdown-menu  slot="dropdown">
          <my-dropdown-item  v-for="(item,i) in dropdownData" :key="i" :command="item.id">{{item.value}}</my-dropdown-item>
        </my-dropdown-menu>
      </my-dropdown>
    </div>
  </div>
</template>
