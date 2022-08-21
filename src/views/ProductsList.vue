<script>
import Layout from "@/components/Layout";
import { mapGetters } from "vuex";

/**
 * Invoice-list component
 */
export default {
  components: { Layout },
  data() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: [
        {
          key: "description",
          sortable: true,
        },
        {
          key: "contactName",
          sortable: true,
        },
        {
          key: "contactEmail",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      products: "product/list",
    }),
    rows() {
      return this.products.length;
    },
  },
  mounted() {
    this.$store.dispatch("product/fetch");
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
  <Layout>
    <div class="pt-sm-5" v-if="products.length == 0">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="text-center">
              <h4 class="text-uppercase mt-4">No products so far?</h4>
              <p class="text-muted">
                Would you like to create a new product?
              </p>
              <div class="mt-5">
                <router-link to="/products/create" class="btn btn-primary"
                  >Create your first product</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-12">
          <div>
            <router-link
              to="/quotes/create"
              class="btn btn-outline-primary mb-3 float-end"
            >
              <i class="mdi mdi-plus me-1"></i> Create Supplier
            </router-link>
          </div>
        </div>
      </div>
      <div class="table-responsive mb-0">
        <b-table
          table-class="table table-centered datatable table-card-list"
          thead-tr-class="bg-transparent"
          :items="products"
          :fields="fields"
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
        </b-table>
      </div>
      <div class="row">
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-end">
            <ul class="pagination pagination-rounded">
              <!-- pagination -->
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
