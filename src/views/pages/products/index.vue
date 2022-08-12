<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { supplierComputed } from "../../../state/helpers";

/**
 * Invoice-list component
 */
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
  components: { PageHeader },
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
    ...supplierComputed,
  },
  mounted() {
    this.totalRows = this.items.length;
    this.$store.dispatch("supplier/fetch");
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
          <router-link
            :to="`/${$route.params.project}/products/create`"
            type="button"
            class="btn btn-outline-primary mb-3"
          >
            <i class="mdi mdi-plus me-1"></i> Add Product
          </router-link>
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
            <tr v-for="supplier in suppliers" :key="supplier.id">
              <td>9780261103566</td>
              <!-- <td>
                KPD-001
              </td> -->
              <td>
                Ball Bearings
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
