<template>
  <b-modal
    centered
    id="variant-dialog"
    size="lg"
    title="Variant Details"
    title-class="font-18"
    @ok="addVariants"
  >
    <a href="#" @click.prevent="addVariant">Add variant</a>
    <table class="table table-bordered table-sm mb-0 mt-2">
      <thead class="table-light">
        <tr>
          <th style="width: 300px;">Name</th>
          <th width="*">Values</th>
          <th style="width: 50px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(variant, key) in variants" :key="key">
          <td>
            <input
              v-model="variant.name"
              id="default-input"
              type="text"
              class="form-control mb-2"
              placeholder="e.g color, size"
            />
          </td>
          <td>
            <input
              v-model="variant.values"
              id="default-input"
              type="text"
              class="form-control mb-2"
            />
          </td>
          <td>
            <button class="btn btn-outline-light" @click="deleteVariant(key)">
              <i class="uil uil-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </b-modal>
</template>

<script>
import { EventBus } from "@/libs/eventbus.js";

export default {
  data() {
    return {
      variants: [],
    };
  },
  mounted() {
    EventBus.$on("variant-dialog:show", this.showDialog.bind(this));
  },
  methods: {
    showDialog() {
      this.$bvModal.show("variant-dialog");
    },
    addVariant() {
      this.variants.push({
        name: "",
        values: "",
      });
    },
    deleteVariant(idx) {
      this.variants.splice(idx, 1);
    },
    addVariants() {
      EventBus.$emit("variants:updated", this.variants);
      this.$bvModal.hide("variant-dialog");
    },
  },
};
</script>
