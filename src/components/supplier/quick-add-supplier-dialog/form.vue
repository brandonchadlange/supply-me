<template>
  <b-form @submit.prevent="onSubmit" ref="form">
    <Field
      label="Name"
      placeholder="Enter supplier name"
      v-model="form.name"
      field="name"
      :validation="validation.name"
    />

    <Field
      label="Contact name"
      placeholder="Primary contact name"
      v-model="form.contactName"
      field="contactName"
      type="text"
      :validation="validation.contactName"
    />

    <Field
      label="Contact email"
      placeholder="Primary contact email"
      v-model="form.contactName"
      field="contactName"
      type="email"
      :validation="validation.contactEmail"
    />

    <hr />

    <div class="mt-3 text-end">
      <b-button @click="onCancel" variant="secondary" class="w-sm"
        >Cancel</b-button
      >
      <b-button type="submit" variant="primary" class="w-sm ms-2">Add</b-button>
    </div>
  </b-form>
</template>

<script>
import Field from "@/components/form/field.vue";
import validation from "../../../validation";
import { EventBus } from "../../../libs/eventbus";
import events from "./events";

export default {
  components: {
    Field,
  },
  props: {
    useAllProducts: Boolean,
    product: Object,
  },
  data() {
    return {
      form: {
        name: "",
        contactName: "",
        contactEmail: "",
      },
      validation: validation.supplier,
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
    async onSubmit() {
      this.formInvalid = false;
      EventBus.$emit("form:touch");

      if (this.formInvalid) return;

      const supplier = await this.$store.dispatch("supplier/create", {
        name: this.form.name,
      });

      EventBus.$emit(events.SELECT, {
        supplier,
        allProducts: this.useAllProducts,
        product: this.product,
      });
      EventBus.$emit(events.HIDE);
    },
    onCancel() {
      EventBus.$emit(events.HIDE);
    },
    setFormInvalid() {
      this.formInvalid = true;
    },
  },
};
</script>
