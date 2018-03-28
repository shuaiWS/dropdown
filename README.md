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

使用vue开发过几个项目了，对vue感觉很好，不愧为开源世界华人的骄傲（顺便膜拜下尤大~~ ）
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

第五步通过dropdown.vue将button与dropdown-item.vue连通起来，实现组件间的通信
具体做法为
1.在dropdown中为button绑定click事件，设置下拉组件的visible为true和false，通过Vue的watch钩子来监听visible的变化来向子组件dropdown-menu.vue来emit一个事件，在dropdown-menu.vue生命周期中只要事先绑定好了这个事件，就会接收到事件反馈和参数传递，通过参数的值来判断是否显示和隐藏menu
2.在dropdown.vue中绑定一个item中的自定义点击事件，当触发该方法是隐藏整个menu
这两个方法的关键点在父子组件之间的通信，方法见（broadcast与dispatch）

第六步整个下拉组件四个子组件的通信实现了，因为下拉框受父元素的高度和overflow影响，不能作为button的兄弟组件存在，现在将menu渲染到body中，并给出美观的css（copy自elementUI），然后根据button的位置绝对定位到具体位置
具体做法为
1.设置menu的position:absolute;
2.获取button的位置信息--使用getBoundingClientRect方法可以获取元素在窗口的相对位置和元素的宽高（但不是在文档流中的位置，所以绝对定位时要加上window的scrollTop和scrollLeft）
3.如果元素的display为none时，getBoundingClientRect方法是无法获取物理尺寸的，所以，实现menu与button的右对齐还需要算出menu的宽度，所以用jQuery的方法为将元素设置visible为hidden，然后将其脱离文档流获取尺寸后在还原回去

第七步现在大致的定位和样式以及交互都完成了，现在如果button的父组件或祖父组件可以拉滚动条的话，在滚动时需要实时跟新menu的位置
具体做法为：
由button向上递归获取父元素，并为他们绑定滚动监听，如果下拉框是显示的状态。则需要不断的更新下拉框的位置

第八步为将一些可以重用的方法提出到util中，作为组件的混合使用

第九步添加一些tab键聚焦和按键操作,整个流程走完了，组件基本功能算是完善了

将下拉框插件化

第一步
