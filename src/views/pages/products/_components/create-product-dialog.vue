<template>
  <b-modal
    centered
    id="create-product-dialog"
    size="md"
    title="Create Product"
    title-class="font-18"
    @ok.prevent="handleCreateProduct"
  >
    <p>
      Dependant on your strategy, a product can be something broad like
      "keyboard" or it can be something more specific such as "Logitech K380
      Wireless".
    </p>
    <div class="form-group">
      <label for="default-input">Description</label>
      <input
        v-model="description"
        id="default-input"
        type="text"
        class="form-control"
      />
    </div>
  </b-modal>
</template>

<script>
import { EventBus } from "@/libs/eventbus.js";
import { mapActions } from "vuex";

export default {
  mounted() {
    EventBus.$on("create-product-dialog:show", this.showDialog.bind(this));
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    ...mapActions({
      createProduct: "product/create",
    }),
    showDialog() {
      this.$bvModal.show("create-product-dialog");
    },
    async handleCreateProduct() {
      await this.createProduct({
        project: 1,
        description: this.description,
      });

      this.$bvModal.hide("create-product-dialog");
    },
  },
};
</script>
