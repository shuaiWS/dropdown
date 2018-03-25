<script>
export default {
  //1.将按钮和下拉框组件放在内存中，方便后续操作
  //2.自定义一个visible数据，用来记录当前下拉框显示隐藏状态
  //3.加按钮基本的点击事件，实现下拉组件的显示隐藏
  //4.定义hide和show方法
  //现在按钮已经可以打印隐藏显示了，现在需要与下拉框通信
  name: "MyDropdown",

  componentName: "MyDropdown",

  data() {
    return {
      visible: false
    };
  },

  mounted() {
    this.init(); //初始化组件元素
    this.initEvent(); //添加组件元素事件
  },

  methods: {
    init() {
      this.buttonEl = this.$slots.default[0].elm; //组件按钮
      this.dropdownEl = this.$slots.dropdown[0].elm; //组件下拉框
    },
    initEvent() {
      let { buttonEl, dropdownEl } = this;
      buttonEl.addEventListener("click", this.handleClick); //设置按钮点击显示隐藏
    },
    handleClick() {
      this.visible ? this.hide() : this.show();
    },
    hide() {
      console.log("hide");
      this.visible = false;
    },
    show() {
      console.log("show");
      this.visible = true;
    }
  },

  render(h) {
    return (
      <div class="my-dropdown">
        {this.$slots.default}
        {this.$slots.dropdown}
      </div>
    );
  }
};
</script>
