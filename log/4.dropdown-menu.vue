<template>
    <ul class="my-dropdown-menu" v-show="showPopper">
      <slot></slot>
    </ul>
</template>
<script>
export default {
  name: "MyDropdownMenu",

  componentName: "MyDropdownMenu",

  props: {},
  data() {
    return {
      showPopper: true
    };
  },

  mounted() {}
};
</script>
