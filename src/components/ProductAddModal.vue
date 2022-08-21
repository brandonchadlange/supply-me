<template>
  <b-modal
    title="Add new product"
    title-class="font-18"
    :id="id"
    centered
    size="md"
    hide-footer
  >
    <AppForm :onSubmit="onSubmit">
      {{ validation.manufacturerCode }}

      <AppFormField
        label="Description"
        placeholder=""
        v-model="form.description"
        field="description"
        :validation="validation.description"
      />

      <AppFormField
        ref="manufacturerCodeField"
        label="Manufacturer Code"
        placeholder=""
        v-model="form.manufacturerCode"
        field="manufacturerCode"
        :validation="validation.manufacturerCode"
        class="mt-4"
      />

      <label class="mt-4">Category</label>
      <AppCombobox
        id="category-combobox"
        v-model="form.category"
        :items="categories"
        :createNew="createNewCategory"
        label="name"
        trackBy="id"
        placeholder="Type to select or create a category"
      />

      <div class="mt-3 text-end">
        <b-button @click="onCancel" variant="secondary" class="w-sm"
          >Cancel</b-button
        >
        <b-button type="submit" variant="primary" class="w-sm ms-2"
          >Add</b-button
        >
      </div>
    </AppForm>
  </b-modal>
</template>

<script>
const IDENTIFIER = "product-add-modal";

import events from "../helpers/events";
import { EventBus } from "../libs/eventbus";
import validation from "../validation";

import AppForm from "./AppForm";
import AppFormField from "./AppFormField";
import AppCombobox from "./AppCombobox";

export default {
  components: {
    AppForm,
    AppFormField,
    AppCombobox,
  },
  data() {
    return {
      id: IDENTIFIER,
      validation: validation.product,
      form: {
        description: "",
        manufacturerCode: "",
        category: null,
      },
      categories: [
        {
          id: 1,
          name: "Routers",
        },
        {
          id: 2,
          name: "Wifi Access Points",
        },
      ],
    };
  },
  mounted() {
    EventBus.$on(events.productAddModal.SHOW, this.showDialog.bind(this));
  },
  methods: {
    showDialog(options) {
      this.form.description = options.description;
      this.$bvModal.show(IDENTIFIER);

      setTimeout(() => {
        const field = document.getElementById("manufacturerCode");
        field.focus();
      }, 60);
    },
    onCancel() {
      EventBus.$emit(events.productAddModal.CLOSED);
      this.$bvModal.hide(IDENTIFIER);
    },
    async onSubmit() {
      const product = await this.$store.dispatch("product/create", this.form);
      console.log(product);
      EventBus.$emit(events.productAddModal.CREATED, product);
      this.$bvModal.hide(IDENTIFIER);
    },
    createNewCategory(name) {
      const newCategory = {
        id: new Date(),
        name,
      };

      this.categories.push(newCategory);

      return newCategory;
    },
  },
  watch: {},
};
</script>
