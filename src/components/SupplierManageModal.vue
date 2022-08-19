<template>
  <b-modal
    centered
    :id="id"
    size="md"
    title="Create Supplier"
    title-class="font-18"
    hide-footer
    hide-header
  >
    <b-tabs
      v-model="tab"
      justified
      nav-class="nav-tabs-custom"
      content-class="text-muted"
    >
      <b-tab active>
        <template v-slot:title>
          <span class="d-none d-sm-inline-block">Select</span>
        </template>

        <SupplierSelect
          :suppliers="suppliers"
          :product="product"
          :useAllProducts="useAllProducts"
        />
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <span class="d-none d-sm-inline-block">Add new</span>
        </template>
        <CreateForm :product="product" :useAllProducts="useAllProducts" />
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
import IDENTIFIER from "./identifier";

import { EventBus } from "../../../libs/eventbus";
import CreateForm from "./form.vue";
import SupplierSelect from "./select.vue";
import events from "./events";

export default {
  components: {
    SupplierSelect,
    CreateForm,
  },
  props: {
    suppliers: Array,
  },
  mounted() {
    EventBus.$on(events.SHOW, this.showDialog.bind(this));
    EventBus.$on(events.HIDE, this.hideDialog.bind(this));
  },
  beforeDestroy() {
    EventBus.$off(events.SHOW, this.showDialog.bind(this));
    EventBus.$off(events.HIDE, this.hideDialog.bind(this));
  },
  data() {
    return {
      id: IDENTIFIER,
      form: {
        name: "",
        contactName: "",
        contactEmail: "",
      },
      useAllProducts: false,
      product: null,
      keepFormOpen: false,
      dismissCountDown: 0,
      tab: 0,
    };
  },
  methods: {
    showDialog(options) {
      this.useAllProducts = options.allProducts;
      this.product = options.product;
      this.$bvModal.show(IDENTIFIER);
    },
    hideDialog() {
      this.$bvModal.hide(IDENTIFIER);
    },
  },
};
</script>
