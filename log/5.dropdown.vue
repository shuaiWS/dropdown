<script>
export default {
  name: "MyDropdown",

  componentName: "MyDropdown",

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
