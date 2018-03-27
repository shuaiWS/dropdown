<template> 
  <button class="my-button">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "MyButton",
  componentName: "MyButton"
};
</script>
<style>
.my-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px
}
.my-button:hover,.my-button:focus {
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff
}
</style>

