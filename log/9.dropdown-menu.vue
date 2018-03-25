<template>
    <ul class="my-dropdown-menu" v-show="showPopper">
      <slot></slot>
    </ul>
</template>
<script>
export default {
  name: "MyDropdownMenu",

  componentName: "MyDropdownMenu",

  props: {},
  data() {
    return {
      showPopper: false
    };
  },
  mounted(){
    this.init()
    this.initEvent()
  },
  methods:{
    init(){
      this.buttonEl = this.$parent.$children[0].$el //获取按钮
      this.dropdownEl = this.$el //下拉框组件
      document.body.appendChild(this.$el) //将组件注册到body中去
    },
    initEvent(){
      this.$on('visible',val=>{
        console.log(`现在为${val?'显示':'隐藏'}状态`)
        this.showPopper = val
      })
    }
  }

};
</script>
