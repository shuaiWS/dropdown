<template>
  <div id="app">
    <div class="main">
      <my-dropdown @command="handleCommand">
        <my-button>
          {{smyectedValue}}<i class="my-icon-arrow-down"></i>
        </my-button>
        <my-dropdown-menu  slot="dropdown">
          <my-dropdown-item  v-for="(item,i) in dropdownData" :key="i" :command="item.id">{{item.value}}</my-dropdown-item>
        </my-dropdown-menu>
      </my-dropdown>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {  },
  data() {
    return {
      smyectedValue: "请选择",
      dropdownData: [
        { id: 1000, value: "我是选项一" },
        { id: 1001, value: "我是选项二" },
        { id: 1002, value: "我是选项三" },
        { id: 1003, value: "我是选项四" },
        { id: 1004, value: "我是选项五" }
      ]
    };
  },
  methods: {
    handleCommand(command) {
      console.log(`我被点击了,command为${command}`);
      this.dropdownData.every(ele=>{
        if(command == ele.id){
          this.smyectedValue = ele.value
          return false
        }
        return true
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Hmyvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {}
</style>
