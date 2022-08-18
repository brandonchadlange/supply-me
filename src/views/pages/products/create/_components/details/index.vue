<template>
  <FormSection>
    <template slot="title">
      <h5 class="font-size-16">Suppliers</h5>
    </template>
    <template>
      <Field
        label="Description"
        field="description"
        type="text"
        :validation="validation.description"
      />
    </template>
  </FormSection>
</template>

<script>
import Field from "@/components/form/field.vue";
import FormSection from "@/components/form/section.vue";
import validation from "@/validation";

export default {
  components: {
    Field,
    FormSection,
  },
  data() {
    return {
      validation: validation.product,
    };
  },
};
</script>
