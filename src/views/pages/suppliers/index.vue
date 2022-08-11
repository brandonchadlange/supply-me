<script>
import Layout from "../../layouts/main";
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
  components: { Layout, PageHeader },
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
    /**
     * Total no. of records
     */
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.$store.dispatch("supplier/fetch");
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />

    <div class="row">
      <div class="col-md-8">
        <div class="float-start">
          <div class="form-inline mb-3">
            <div
              class="input-daterange input-group"
              data-provide="datepicker"
              data-date-format="dd M, yyyy"
              data-date-autoclose="true"
            >
              <input
                type="text"
                class="form-control text-left"
                placeholder="From"
                name="From"
              />
              <input
                type="text"
                class="form-control text-left"
                placeholder="To"
                name="To"
              />
              <div class="input-group-append">
                <button type="button" class="btn btn-primary">
                  <i class="mdi mdi-filter-variant"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="float-end">
          <button type="button" class="btn btn-success mb-3">
            <i class="mdi mdi-plus me-1"></i> Add Supplier
          </button>
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
  </Layout>
</template>
