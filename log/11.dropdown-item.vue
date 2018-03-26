<template> 
  <li class="my-dropdown-menu-item" @click="handleClick">
    <slot></slot>
  </li>
</template>
<script>
//1.给下拉选项添加点击事件
//2.为下拉框添加点击值，绑定command
export default {
  name: "MyDropdownItem",

  componentName: "MyDropdownItem",

  props: {
    command: {}
  },

  methods: {
    handleClick() {
      this.dispatch(this.$parent, "MyDropdown", "menu-item-click", [
        this.command,
        this
      ]);
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
      if( !(name = target.$options.componentName))return
      if (name === componentName) {
        target.$emit.apply(target, [eventName].concat(params));
      } else {
        this.dispatch(target.$parent, componentName, eventName, params);
      }
    }
  }
};
</script>

<style>
.my-dropdown-menu-item {
  list-style: none;
  line-height: 36px;
  padding: 0 20px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;
}
.my-dropdown-menu-item:hover {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>

