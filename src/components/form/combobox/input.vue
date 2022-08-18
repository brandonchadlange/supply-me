<template>
  <b-form @submit.prevent="onInputSubmit">
    <input
      ref="input"
      type="text"
      class="form-control"
      v-model="input"
      :placeholder="placeholder"
    />
  </b-form>
</template>

<script>
import { EventBus } from "../../../libs/eventbus";

export default {
  props: {
    id: {
      type: String,
    },
    props: {
      value: Object,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      input: "",
    };
  },
  mounted() {
    EventBus.$on(
      `combobox-${this.id}:update-input`,
      this.updateInput.bind(this)
    );

    EventBus.$on(`combobox-${this.id}:focus-input`, this.focusInput.bind(this));
  },
  beforeDestroy() {
    EventBus.$off(
      `combobox-${this.id}:update-input`,
      this.updateInput.bind(this)
    );

    EventBus.$off(
      `combobox-${this.id}:focus-input`,
      this.focusInput.bind(this)
    );
  },
  methods: {
    onInputSubmit() {
      EventBus.$emit(`combobox-${this.id}:created`);
    },
    updateInput(newVal) {
      this.input = newVal;
    },
    focusInput() {
      this.$refs.input.focus();
    },
  },
  watch: {
    input(value) {
      this.$emit("input", value);
    },
  },
};
</script>
