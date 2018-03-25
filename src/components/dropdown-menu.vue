<template>
    <ul class="my-dropdown-menu" v-show="showPopper">
      <slot></slot>
    </ul>
</template>
<script>
//1.将下拉框组件渲染到body中
//2.将下拉组件定位到按钮下
import minxin from './../utils/mixins'
export default {
  name: "MyDropdownMenu",

  componentName: "MyDropdownMenu",

  mixins:[minxin],
  props: {},
  data() {
    return {
      showPopper: false
    };
  },
  mounted() {
    this.init();
    this.initEvent();
  },
  methods: {
    init() {
      this.buttonEl = this.$parent.$children[0].$el; //获取按钮
      this.dropdownEl = this.$el; //下拉框组件
      document.body.appendChild(this.$el); //将组件注册到body中去
    },
    initEvent() {
      this.$on("visible", val => {
        console.log(`现在为${val ? "显示" : "隐藏"}状态`);
        this.showPopper = val;
        val && this.$emit("update", val);
      });
      this.$on("update", val => {
        val && this.update(this.buttonEl, this.dropdownEl);
      });
      this.bindUpdate(this.buttonEl, () => {
        this.showPopper && this.update(this.buttonEl, this.dropdownEl);
      });
    }
  }
};
</script>

<style>
.my-dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

