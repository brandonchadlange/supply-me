<template>
  <b-form @submit.prevent="tryToSubmit">
    <slot></slot>
  </b-form>
</template>

<script>
import { EventBus } from "@/libs/eventbus";

export default {
  props: {
    onSubmit: Function,
  },
  data() {
    return {
      formInvalid: false,
    };
  },
  mounted() {
    EventBus.$on("form:invalid", this.setFormInvalid.bind(this));
  },
  beforeDestroy() {
    EventBus.$off("form:invalid", this.setFormInvalid.bind(this));
  },
  methods: {
    tryToSubmit(ev) {
      this.formInvalid = false;
      EventBus.$emit("form:touch");

      if (this.formInvalid) return;

      this.onSubmit(ev);
    },
    setFormInvalid() {
      this.formInvalid = true;
    },
  },
};
</script>
