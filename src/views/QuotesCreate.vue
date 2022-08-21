<template>
  <Layout>
    <div>
      <AppRow class="mb-4">
        <AppColumn cols="4">
          <AppFormField
            label="Quote reference"
            placeholder="e.g. QT-0001"
            v-model="reference"
            field="email"
            :validation="validation.reference"
          />
        </AppColumn>
        <AppColumn cols="8">
          <button
            @click="submitQuoteRequest"
            class="btn btn-outline-primary float-end"
            tabindex="1"
          >
            <i class="mdi mdi-plus me-1"></i> Submit Quote request
          </button>
        </AppColumn>
      </AppRow>
      <AppCard>
        <Combobox
          id="product-combobox"
          ref="productCombobox"
          v-model="product"
          :items="productsExcludingSelected"
          :createNew="createNewProduct"
          label="description"
          trackBy="id"
          placeholder="Type to select or create a product"
        />
        <b-table
          table-class="table table-bordered table-sm mb-0 mt-4"
          thead-tr-class="bg-transparent"
          :items="selectedProducts"
          :fields="fields"
        >
          <template v-slot:cell(suppliers)="data">
            <span
              class="badge bg-primary font-size-14 me-1"
              v-for="supplier in data.item.suppliers"
              :key="supplier.uuid"
              @click="removeSupplier(supplier, data.item)"
            >
              <span>{{ supplier.name }}</span>
              <i class="uil uil-times ms-1 cursor-pointer"></i>
            </span>
            <a
              class="ms-2"
              href="#"
              @click.prevent="addSupplierToProduct(data.item)"
              >add</a
            >
          </template>
          <template v-slot:cell(remove)="data">
            <button
              class="btn btn-sm btn-outline-light"
              @click="removeProduct(data.item)"
            >
              <i class="uil uil-trash-alt"></i>
            </button>
          </template>
        </b-table>
      </AppCard>
      <QuickAddSupplierDialog :suppliers="suppliers" />
      <ProductAddModal />
    </div>
  </Layout>
</template>

<script>
import Layout from "../components/Layout.vue";
import Combobox from "../components/AppCombobox.vue";
import AppFormField from "../components/AppFormField.vue";
import QuickAddSupplierDialog from "../components/SupplierManageModal.vue";
import ProductAddModal from "../components/ProductAddModal.vue";
import AppCard from "../components/AppCard.vue";
import AppRow from "../components/AppRow.vue";
import AppColumn from "../components/AppColumn.vue";

import { EventBus } from "../libs/eventbus";
import { mapGetters } from "vuex";

import QuoteRequestController from "../controllers/quote-request";
import productService from "../services/product";
import quotesService from "../services/quote";
import events from "../helpers/events";
import validation from "../validation";

const quoteRequestController = new QuoteRequestController();

export default {
  components: {
    Layout,
    AppCard,
    AppRow,
    AppColumn,
    AppFormField,
    Combobox,
    QuickAddSupplierDialog,
    ProductAddModal,
  },
  data() {
    return {
      product: null,
      selectedProducts: quoteRequestController.products,
      validation: validation.quote,
      reference: "",
      fields: [
        {
          label: "Product",
          key: "description",
        },
        {
          label: "Suppliers",
          key: "suppliers",
        },
        {
          label: "",
          key: "remove",
        },
      ],
    };
  },
  mounted() {
    EventBus.$on(
      events.supplierManageModal.SELECT,
      this.onSupplierSelected.bind(this)
    );
    EventBus.$on(
      events.supplierManageModal.DESELECT,
      this.onSupplierDeselected.bind(this)
    );
    EventBus.$on(
      events.supplierManageModal.CREATE,
      this.onSupplierCreated.bind(this)
    );

    this.$store.dispatch("product/fetch");
    this.$store.dispatch("supplier/fetch");
  },
  beforeDestroy() {
    EventBus.$off(
      events.supplierManageModal.SELECT,
      this.onSupplierSelected.bind(this)
    );
    EventBus.$off(
      events.supplierManageModal.DESELECT,
      this.onSupplierDeselected.bind(this)
    );
    EventBus.$off(
      events.supplierManageModal.CREATE,
      this.onSupplierCreated.bind(this)
    );
  },
  methods: {
    removeProduct(product) {
      quoteRequestController.removeProduct(product);
    },
    async createNewProduct(description) {
      const resolver = new Promise((res) => {
        function onClose() {
          EventBus.$off(events.productAddModal.CREATED, onCreated);
        }

        function onCreated(product) {
          EventBus.$off(events.productAddModal.CLOSED, onClose);
          res(product);
        }

        EventBus.$once(events.productAddModal.CREATED, onCreated);
        EventBus.$once(events.productAddModal.CLOSED, onClose);
      });

      EventBus.$emit(events.productAddModal.SHOW, {
        description,
      });

      return resolver;
    },
    addSupplierToProduct(product) {
      EventBus.$emit(events.supplierManageModal.SHOW, {
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
      await quotesService.createQuoteRequest(
        this.reference,
        this.selectedVariants
      );
      this.$router.push("/quotes");
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
    productsExcludingSelected() {
      return this.products.filter((product) => {
        return !this.selectedProducts.some((sp) => {
          return sp.id === product.id;
        });
      });
    },
  },
};
</script>
