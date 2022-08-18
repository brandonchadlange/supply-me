<template>
  <FormSection>
    <template slot="title">
      <div class="p-3 bg-light">
        <h5 class="font-size-16 mb-0">
          Tags
        </h5>
      </div>
    </template>
    <template>
      <b-form @submit.prevent="addTag">
        <input
          v-model="tag"
          id="default-input"
          type="text"
          class="form-control mb-2"
        />
      </b-form>
      <span
        v-for="(tag, key) in tags"
        :key="key"
        class="badge bg-primary font-size-14 me-1"
        >{{ tag }}</span
      >
    </template>
  </FormSection>
</template>

<script>
import FormSection from "@/components/form/section.vue";

export default {
  components: {
    FormSection,
  },
  data() {
    return {
      tag: "",
      tags: [],
    };
  },
  methods: {
    addTag() {
      this.tags.push(this.tag);
      this.tag = "";
    },
  },
};
</script>
