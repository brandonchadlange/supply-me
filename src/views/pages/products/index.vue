<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import CreateProductDialog from "./_components/create-product-dialog.vue";
import { EventBus } from "../../../libs/eventbus";
import { mapGetters } from "vuex";

export default {
  page: {
    title: "Products List",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: { PageHeader, CreateProductDialog },
  data() {
    return {
      title: "Products List",
      items: [
        {
          text: "Products",
          active: true,
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
    };
  },
  computed: {
    ...mapGetters({
      products: "product/list",
    }),
  },
  mounted() {
    this.$store.dispatch("product/fetch", {
      product: 1,
    });
  },
  methods: {
    openCreateProductDialog() {
      EventBus.$emit("create-product-dialog:show");
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-8">
        <div class="float-start">
          <div class="form-inline mb-3">
            <div class="search-box">
              <div class="position-relative">
                <input
                  type="text"
                  class="form-control rounded"
                  placeholder="Search..."
                />
                <i class="mdi mdi-magnify search-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="float-end">
          <button
            @click="openCreateProductDialog"
            type="button"
            class="btn btn-outline-primary mb-3"
          >
            <i class="mdi mdi-plus me-1"></i> Add Product
          </button>
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="table-responsive mb-0">
      <div class="table-responsive">
        <table class="table table-nowrap table-hover mb-0">
          <thead>
            <tr>
              <th scope="col" style="width: 150px;">Barcode</th>
              <!-- <th scope="col" style="width: 150px;">SKU</th> -->
              <th scope="col" style="width: 250px;">Description</th>
              <th scope="col">Fullfill with</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <!-- <td>
                KPD-001
              </td> -->
              <td>
                {{ product.description }}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <CreateProductDialog />
  </div>
</template>
