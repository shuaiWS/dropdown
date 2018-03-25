<template>
    <ul class="my-dropdown-menu" v-show="showPopper">
      <slot></slot>
    </ul>
</template>
<script>
export default {
  name: "myDropdownMenu",

  componentName: "myDropdownMenu",

  props: {},
  data() {
    return {
      showPopper: true
    };
  },

  mounted() {}
};
</script>
