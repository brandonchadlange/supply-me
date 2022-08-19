<template>
  <div :class="classNames">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    cols: {
      type: String,
      default: "12",
    },
  },
  computed: {
    classNames() {
      return `col-lg-${this.cols}`;
    },
  },
};
</script>
