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
            <div class="search-box ms-2">
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
            :to="`/${$route.params.project}/suppliers/create`"
            type="button"
            class="btn btn-outline-primary mb-3"
          >
            <i class="mdi mdi-plus me-1"></i> Add Supplier
          </router-link>
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="table-responsive mb-0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="suppliers"
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
        <template v-slot:cell(check)="data">
          <div class="custom-control custom-checkbox text-center">
            <input
              type="checkbox"
              class="custom-control-input"
              :id="`contacusercheck${data.item.id}`"
            />
            <label
              class="custom-control-label"
              :for="`contacusercheck${data.item.id}`"
            ></label>
          </div>
        </template>
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
</template>
