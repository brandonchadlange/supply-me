<template>
  <div>
    <b-form-group>
      <label :for="field">{{ label }}</label>
      <b-form-input
        ref="input"
        :id="field"
        v-model="input"
        :placeholder="placeholder"
        :type="type"
        :class="{
          'is-invalid': submitted && $v.$error,
        }"
      ></b-form-input>
      <div v-if="submitted && $v.$error" class="invalid-feedback">
        <span v-for="error in errors" :key="error.key">
          <span v-if="!$v.input[error.key]">{{ error.message }}</span>
        </span>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import { EventBus } from "@/libs/eventbus";

export default {
  props: {
    label: String,
    value: String,
    field: String,
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    validation: Object,
  },
  data() {
    return {
      input: this.value,
      submitted: false,
    };
  },
  computed: {
    errors() {
      const messages = [];
      const messageKeys = Object.keys(this.validation.messages);

      messageKeys.forEach((key) => {
        messages.push({
          key,
          message: this.validation.messages[key],
        });
      });

      return messages;
    },
  },
  mounted() {
    EventBus.$on("form:touch", this.touchForm.bind(this));
  },
  watch: {
    input(value) {
      this.$emit("input", value);
    },
  },
  methods: {
    touchForm() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        EventBus.$emit("form:invalid");
      }
    },
    focus() {
      this.$refs.input.focus();
    },
  },
  validations() {
    return {
      input: this.validation.rules || null,
    };
  },
};
</script>
