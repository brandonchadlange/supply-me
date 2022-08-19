<script>
import { layoutComputed } from "@/state/helpers";
import Vertical from "./TheLayoutVertical.vue";
import Horizontal from "./TheLayout.vue";

/**
 * Main Layout
 */
export default {
  components: {
    Vertical,
    Horizontal,
  },
  data() {
    return {};
  },
  computed: {
    ...layoutComputed,
  },
  mounted() {
    document.body.classList.remove("authentication-bg");
  },
  methods: {},
};
</script>

<template>
  <div>
    <Vertical v-if="layoutType === 'vertical'" :layout="layoutType">
      <slot />
    </Vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>
