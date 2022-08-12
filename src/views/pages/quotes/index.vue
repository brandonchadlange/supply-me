<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { supplierComputed } from "../../../state/helpers";

/**
 * Invoice-list component
 */
export default {
  page: {
    title: "Suppliers List",
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
      title: "Suppliers List",
      items: [
        {
          text: "Suppliers",
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
      fields: [
        {
          key: "name",
          label: "Supplier Name",
          sortable: true,
        },
        {
          key: "websiteUrl",
          label: "Website URL",
          sortable: true,
        },
      ],
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
            :to="`/${$route.params.project}/quotes/create`"
            type="button"
            class="btn btn-outline-primary mb-3"
          >
            <i class="mdi mdi-plus me-1"></i> Request Quote
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
              <th scope="col" style="width: 250px;">Supplier Name</th>
              <th scope="col" style="width: 250px;">Website URL</th>
              <th scope="col">Fullfill with</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="supplier in suppliers" :key="supplier.id">
              <td>
                <router-link
                  :to="`/${$route.params.project}/suppliers/${supplier.slug}`"
                  >{{ supplier.name }}</router-link
                >
              </td>
              <td>
                <a :href="supplier.websiteUrl" target="_blank">
                  <i
                    class="uil uil-external-link-alt"
                    style="margin-right: 4px;"
                  ></i>
                  <span>{{ supplier.websiteUrl }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
