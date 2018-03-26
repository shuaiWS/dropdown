<template> 
  <li class="my-dropdown-menu-item" @click="handleClick">
    <slot></slot>
  </li>
</template>
<script>

//1.给下拉选项添加点击事件
export default {
  name: "MyDropdownItem",

  componentName: "MyDropdownItem",

  props: {},

  methods: {
    handleClick(){
      this.dispatch(this.$parent,'MyDropdown', 'menu-item-click')
    },
    /**
     * @description 逆向寻找当前组件的父组件，然后emit事件并传递参数
     * @param {Component} target 当前组件
     * @param {String} componentName 组件名称
     * @param {String} eventName 需要触发的事件名称
     * @param {any[]} params 需要传递的参数
     * @return {void}
     */
    dispatch(target, componentName, eventName, params) {
      let name;
      if( !(name = parent.$options.componentName))return
      if (name === componentName) {
        target.$emit.apply(target, [eventName].concat(params));
      } else {
        this.dispatch(target.$parent, componentName, eventName, params);
      }
    }
  },
};
</script>
