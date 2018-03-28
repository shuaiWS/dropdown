<template> 
  <li class="my-dropdown-menu-item" @click="handleClick">
    <slot></slot>
  </li>
</template>
<script>
//1.给下拉选项添加点击事件
//2.为下拉框添加点击值，绑定command

import minxin from "./../../../utils/mixins"
export default {
  name: "MyDropdownItem",

  componentName: "MyDropdownItem",

  mixins:[minxin],

  props: {
    command: {}
  },

  methods: {
    handleClick() {
      this.dispatch(this.$parent, "MyDropdown", "menu-item-click", [
        this.command,
        this
      ])
    }
  }
}
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
.my-dropdown-menu-item:hover ,.my-dropdown-menu-item:focus{
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>

