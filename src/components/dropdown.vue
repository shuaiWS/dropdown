<script>
  //1.将按钮和下拉框组件放在内存中，方便后续操作
  //2.自定义一个visible数据，用来记录当前下拉框显示隐藏状态
  //3.加按钮基本的点击事件，实现下拉组件的显示隐藏
  //4.定义hide和show方法
  //5.实现按钮控制下拉框的显示隐藏
  //6.下拉选项点击实现dropdown的显示隐藏
  //7.给下拉选项添加点击事件，实现下拉框的显示隐藏
  //8.为下拉框添加点击值，绑定command
  //9.将下拉框组件渲染到body中
  //10.添加下拉组件的样式(因elementUI的样式做的很漂亮，直接copy)
  //11.提出可复用代码，插件混入使用
  //12.后续功能开发  waiting...
import minxin from './../utils/mixins'
export default {
  name: "MyDropdown",

  componentName: "MyDropdown",

  mixins:[minxin],
  
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
      let { buttonEl, dropdownEl, hide, handleClick } = this;
      buttonEl.addEventListener("click", handleClick); //设置按钮点击显示隐藏
      document.addEventListener("click", event => {
        if (event.target != buttonEl) {
          this.visible && hide();
        }
      }); //点击整个窗口下拉框消失
      this.$on("menu-item-click", this.handleMenuItemClick); //注册下拉菜单点击事件
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
    },
    handleMenuItemClick(command, instance) {
      this.visible = false;
      this.$emit('command',command, instance)
    }
  },

  watch: {
    visible(val) {
      console.log(`马上为${val ? "显示" : "隐藏"}状态`);
      this.broadcast(this.$children, "MyDropdownMenu", "visible", val);
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

<style>
.my-dropdown {
  display: inline-block;
  position: relative;
}
</style>

