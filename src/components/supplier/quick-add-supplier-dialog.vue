<template>
  <b-modal
    centered
    :id="id"
    size="md"
    title="Create Supplier"
    title-class="font-18"
    @ok.prevent="handleCreateSupplier"
  >
    <b-button
      class="mb-2"
      variant="primary"
      @click="$bvToast.show('example-toast')"
    >
      Show toast
    </b-button>
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Hello, world! This is a toast message.
    </b-toast>
    <b-tabs justified nav-class="nav-tabs-custom" content-class="text-muted">
      <b-tab active>
        <template v-slot:title>
          <span class="d-inline-block d-sm-none">
            <i class="fas fa-home"></i>
          </span>
          <span class="d-none d-sm-inline-block">Select</span>
        </template>
        <p class="mt-4 mb-1">Selected</p>
        <div class="table-responsive">
          <table class="table table-sm mb-0">
            <tbody>
              <tr>
                <td>Mark</td>
              </tr>
              <tr>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>Larry</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 mb-1">Selected</p>
        <div class="table-responsive">
          <table class="table table-sm mb-0">
            <tbody>
              <tr>
                <td>Mark</td>
              </tr>
              <tr>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>Larry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
      <b-tab>
        <template v-slot:title>
          <span class="d-inline-block d-sm-none">
            <i class="far fa-user"></i>
          </span>
          <span class="d-none d-sm-inline-block">Add new</span>
        </template>
        <div class="form-group mt-2">
          <label for="default-input">Name</label>
          <input
            v-model="form.name"
            id="default-input"
            type="text"
            class="form-control"
            placeholder="Enter supplier name"
          />
        </div>
        <div class="form-group mt-4">
          <label for="default-input">Contact name</label>
          <input
            v-model="form.contactName"
            id="default-input"
            type="text"
            class="form-control"
            placeholder="Primary contact name"
          />
        </div>
        <div class="form-group mt-2">
          <label for="default-input">Contact email</label>
          <input
            v-model="form.contactEmail"
            id="default-input"
            type="email"
            class="form-control"
            placeholder="Primary contact email address"
          />
        </div>
        <div class="form-group mt-4">
          <div class="form-check">
            <input
              type="checkbox"
              id="formrow-customCheck"
              class="form-check-input"
              v-model="keepFormOpen"
            />
            <label for="formrow-customCheck" class="form-check-label"
              >Add multiple</label
            >
          </div>
        </div>
        <div style="height: 65px">
          <b-alert :show="dismissCountDown" variant="success" class="mt-2">
            Supplier created
          </b-alert>
        </div>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
export const IDENTIFIER = "quick-add-supplier-dialog";

import { EventBus } from "@/libs/eventbus.js";
import { mapGetters } from "vuex";
// import { mapActions } from "vuex";

export default {
  mounted() {
    EventBus.$on(IDENTIFIER + ":show", this.showDialog.bind(this));
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
    };
  },
  methods: {
    // ...mapActions({
    //   createProduct: "product/create",
    // }),
    /**
     * @param {object} options
     * @param {boolean} options.allProducts
     * @param {object} options.product
     */
    showDialog(options) {
      this.useAllProducts = options.allProducts;
      this.product = options.product;
      this.$bvModal.show(IDENTIFIER);
    },
    async handleCreateSupplier() {
      EventBus.$emit(IDENTIFIER + ":supplier-created", {
        name: this.form.name,
        contactName: this.form.contactName,
        contactEmail: this.form.contactEmail,
      });

      EventBus.$emit(IDENTIFIER + ":supplier-selected", {
        name: this.form.name,
        contactName: this.form.contactName,
        contactEmail: this.form.contactEmail,
        allProducts: this.useAllProducts,
        product: this.product,
      });

      this.form.name = "";
      this.form.contactName = "";
      this.form.contactEmail = "";

      this.$nextTick(() => {
        if (!this.keepFormOpen) {
          this.$bvModal.hide(IDENTIFIER);
        }

        this.dismissCountDown = 2;
      });
    },
  },
  computed: {
    ...mapGetters({
      suppliers: "supplier/list",
    }),
  },
};
</script>
