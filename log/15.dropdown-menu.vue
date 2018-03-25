<template>
    <ul class="my-dropdown-menu" v-show="showPopper">
      <slot></slot>
    </ul>
</template>
<script>
//1.将下拉框组件渲染到body中
//2.将下拉组件定位到按钮下
export default {
  name: "MyDropdownMenu",

  componentName: "MyDropdownMenu",

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
    },
    /**
     * @description 逆向寻找当前组件的父组件，然后emit事件并传递参数
     * @param {Component} $el 当前组件
     * @param {Component} $target 组件名称
     * @param {($el,$target)=>void} callback 回调函数
     * @return {void}
     */
    bindUpdate($el, callback) {
      let target;
      if ((target = $el.parentElement)) {
        target.addEventListener("scroll", callback);
        this.bindUpdate(target, callback);
      }
    },
    /**
     * @description 根据目标元素更新挂载元素的位置
     * @param {Element} $el 目标元素
     * @param {Element} $target 挂载元素
     * @return {Void}
     */
    update($el, $target) {
      if (!$el || !$target) return;
      let {
        bottom: $elBottom,
        height: $elHeight,
        left: $elLeft,
        right: $elRight,
        top: $elTop,
        width: $elWidth
      } = this.getBoundingClientRect($el);
      let {
        bottom: $targetBottom,
        height: $targetHeight,
        left: $targetLeft,
        right: $targetRight,
        top: $targetTop,
        width: $targetWidth
      } = this.getBoundingClientRect($target);
      let scrollTop = window.scrollY;
      let scrollLeft = window.scrollX;
      $target.style.top = `${$elTop + $elHeight + scrollTop}px`;
      $target.style.left = `${$elRight - $targetWidth + scrollLeft}px`;
    },
    /**
     * @description 获取元素的bottom、height、left、right、top、width属性
     * @param {Element} $el  目标元素
     * @return {ClientRect}
     */
    getBoundingClientRect($el) {
      let style = $el.style;
      if (style.display === "none") {
        let _addCss = {
          display: "",
          position: "absolute",
          visibility: "hidden"
        };
        let _oldCss = {};
        for (let i in _addCss) {
          _oldCss[i] = style[i];
          style[i] = _addCss[i];
        }
        let clientRect = $el.getBoundingClientRect();
        for (let i in _oldCss) {
          style[i] = _oldCss[i];
        }
        return clientRect;
      }
      return $el.getBoundingClientRect();
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

