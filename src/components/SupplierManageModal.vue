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
const IDENTIFIER = 'supplier-manage-modal';

import { EventBus } from "@/libs/eventbus";
import CreateForm from "./SupplierManageModalForm.vue";
import SupplierSelect from "./SupplierManageModalSelect.vue";
import events from "@/helpers/events";

export default {
  components: {
    SupplierSelect,
    CreateForm,
  },
  props: {
    suppliers: Array,
  },
  mounted() {
    EventBus.$on(events.supplierManageModal.SHOW, this.showDialog.bind(this));
    EventBus.$on(events.supplierManageModal.HIDE, this.hideDialog.bind(this));
  },
  beforeDestroy() {
    EventBus.$off(events.supplierManageModal.SHOW, this.showDialog.bind(this));
    EventBus.$off(events.supplierManageModal.HIDE, this.hideDialog.bind(this));
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
