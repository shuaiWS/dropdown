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
//11.提出可复用代码，插件混入使用（最好将类似功能的放在一个method中，但我只是开发了一个小组件于是封装在了一起，勿喷~~，哈哈）
//12.加上transition
//13.后续功能开发  waiting...
import minxin from "./../../../utils/mixins";
export default {
  name: "MyDropdown",

  componentName: "MyDropdown",

  mixins: [minxin],

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
      this.dropdownItem = this.dropdownEl.querySelectorAll("li");
    },
    initEvent() {
      let {
        buttonEl,
        dropdownEl,
        dropdownItem,
        hide,
        handleClick,
        handleKeyDown,
        handleMenuKeyDown
      } = this;
      buttonEl.addEventListener("click", handleClick); //按钮点击设置显示隐藏
      buttonEl.addEventListener("keydown", handleKeyDown); //按钮键盘事件监听
      dropdownEl.addEventListener("keydown", handleMenuKeyDown);//下拉菜单键盘事件监听
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
    handleKeyDown(event) {
      let keyCode = event.keyCode;
      if (keyCode == 38 || keyCode == 40) {// up|down
        this.resetIndex(0)
        this.dropdownItem[0].focus();
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    },
    handleMenuKeyDown(event) {
      let keyCode = event.keyCode;
      let currentIndex = [].indexOf.call(this.dropdownItem,event.target);
      let max = this.dropdownItem.length - 1;
      let nextIndex;

      if (keyCode == 38 || keyCode == 40) { // up|down
        if (keyCode === 38) { // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else { // down
          nextIndex = currentIndex < max ? currentIndex + 1 : max;
        }
        this.removeIndex();
        this.resetIndex(nextIndex)
        this.dropdownItem[nextIndex].focus();
        event.preventDefault();
        event.stopPropagation();
      } else if (keyCode === 13) {//enter选中
        event.target.click();
      }
      return;
    },
    removeIndex(){
      this.dropdownItem.forEach(ele=>{
        ele.setAttribute("tabindex", "-1")
      })
    },
    resetIndex(index){
      this.dropdownItem[index].setAttribute("tabindex", "0")
    },
    hide() {
      console.log("hide");
      this.visible = false;
      this.removeIndex();
    },
    show() {
      console.log("show");
      this.visible = true;
    },
    handleMenuItemClick(command, instance) {
      this.hide();
      this.$emit("command", command, instance);
    }
  },

  watch: {
    visible(val) {
      console.log(`即将为${val ? "显示" : "隐藏"}状态`);
      this.broadcast(this.$children, "MyDropdownMenu", "visible", [val]);
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

