<template>
  <div style="width: 950px;" class="mx-auto">
    <div class="card">
      <div class="card-body p-4">
        <Combobox
          ref="productCombobox"
          v-model="product"
          :items="products"
          :createNew="createNewProduct"
          label="description"
          trackBy="id"
          placeholder="Select or create a product"
        />
        <table class="table table-bordered table-sm mb-0 mt-4">
          <thead>
            <tr>
              <th style="width: 350px;">Product</th>
              <th width="*">
                <span>Suppliers</span>
                <a class="ms-2" href="#">add new</a>
              </th>
              <th style="width: 40px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in selectedProducts" :key="product.uuid">
              <td class="pt-2 px-1">
                <p class="mb-0">{{ product.description }}</p>
              </td>
              <td class="pt-2 px-1">
                <span
                  class="badge bg-primary font-size-14 me-1"
                  v-for="supplier in product.suppliers"
                  :key="supplier.uuid"
                  @click="removeSupplier(supplier, product)"
                >
                  <span>{{ supplier.name }}</span>
                  <i class="uil uil-times ms-1 cursor-pointer"></i>
                </span>
                <a
                  class="ms-2"
                  href="#"
                  @click.prevent="addSupplierToProduct(product)"
                  >add</a
                >
              </td>
              <td>
                <button class="btn btn-sm btn-outline-light">
                  <i class="uil uil-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <QuickAddSupplierDialog :suppliers="suppliers" />
    <b-button @click="submitQuoteRequest" variant="primary" class="w-sm ms-2"
      >Submit Quote Request</b-button
    >
  </div>
</template>

<script>
import appConfig from "@/app.config";
import Combobox from "../../../components/form/combobox/index.vue";
import QuickAddSupplierDialog from "../../../components/supplier/quick-add-supplier-dialog/index.vue";
import QASEvents from "../../../components/supplier/quick-add-supplier-dialog/events";
import { EventBus } from "../../../libs/eventbus";
import QuoteRequestController from "../../../controllers/quote-request";
import { mapGetters } from "vuex";
import productService from "../../../services/product";
import quotesService from "../../../services/quote";

const quoteRequestController = new QuoteRequestController();

export default {
  components: { Combobox, QuickAddSupplierDialog },
  page: {
    title: "Checkout",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      product: null,
      selectedProducts: quoteRequestController.products,
    };
  },
  mounted() {
    EventBus.$on(QASEvents.SELECT, this.onSupplierSelected.bind(this));
    EventBus.$on(QASEvents.DESELECT, this.onSupplierDeselected.bind(this));
    EventBus.$on(QASEvents.CREATE, this.onSupplierCreated.bind(this));

    this.$store.dispatch("product/fetch");
    this.$store.dispatch("supplier/fetch");
  },
  methods: {
    async createNewProduct(description) {
      const product = await this.$store.dispatch("product/create", {
        description,
      });

      return product;
    },
    addSupplierToProduct(product) {
      EventBus.$emit(QASEvents.SHOW, {
        allProducts: false,
        product,
      });
    },
    async onSupplierSelected({ supplier, product, allProducts }) {
      if (!allProducts) {
        const { data } = await productService.createProductVariantSupplier(
          product.id,
          supplier.id
        );

        quoteRequestController.addSupplierToProduct(data, product);
      }
    },
    async removeSupplier(supplier, product) {
      await productService.deleteProductVariantSupplier(supplier.id);
      quoteRequestController.removeSupplierFromProduct(supplier, product);
    },
    async onSupplierDeselected({ supplier, product, allProducts }) {
      if (!allProducts) {
        await productService.deleteProductVariantSupplier(supplier.id);
        quoteRequestController.removeSupplierFromProduct(supplier, product);
      }
    },
    onSupplierCreated(supplier) {
      this.$store.dispatch("supplier/create", supplier);
    },
    async submitQuoteRequest() {
      await quotesService.createQuoteRequest(this.selectedVariants);
      alert("Quote request submitted");
    },
  },
  watch: {
    product(newValue) {
      if (!newValue) return;

      quoteRequestController.addProduct(newValue);
      this.$refs.productCombobox.reset();
    },
  },
  computed: {
    ...mapGetters({
      products: "product/list",
      suppliers: "supplier/list",
    }),
    selectedVariants() {
      const selected = [];

      this.selectedProducts.forEach((sp) => {
        sp.suppliers.forEach((supplier) => {
          selected.push(supplier.id);
        });
      });

      return selected;
    },
  },
  middleware: "authentication",
};
</script>
