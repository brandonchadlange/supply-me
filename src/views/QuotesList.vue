<script>
import Layout from "@/components/Layout";
import { mapGetters } from 'vuex';

/**
 * Invoice-list component
 */
export default {
  components: { Layout },
  data() {
    return {
      title: "Invoice List",
      items: [
        {
          text: "Invoices",
        },
        {
          text: "Invoice List",
          active: true,
        },
      ],
      invoicelist: [
        {
          id: "#MN0131",
          date: "10 Jul, 2020",
          name: "Connie Franco",
          amount: "$141",
          status: "Paid",
        },
        {
          id: "#MN0130",
          date: "09 Jul, 2020",
          name: "Paul Reynolds",
          amount: "$153",
          status: "Paid",
        },
        {
          id: "#MN0129",
          date: "09 Jul, 2020",
          name: "Ronald Patterson",
          amount: "$220",
          status: "Pending",
        },
        {
          id: "#MN0128",
          date: "08 Jul, 2020",
          name: "Adella Perez",
          amount: "$175",
          status: "Paid",
        },
        {
          id: "#MN0127",
          date: "07 Jul, 2020",
          name: "Theresa Mayers",
          amount: "$160",
          status: "Paid",
        },
        {
          id: "#MN0126",
          date: "06 Jul, 2020",
          name: "Michael Wallace",
          amount: "$150",
          status: "Paid",
        },
        {
          id: "#MN0125",
          date: "05 Jul, 2020",
          name: "Oliver Gonzales",
          amount: "$165",
          status: "Pending",
        },
        {
          id: "#MN0124",
          date: "05 Jul, 2020",
          name: "David Burke",
          amount: "$170",
          status: "Paid",
        },
        {
          id: "#MN0123",
          date: "04 Jul, 2020",
          name: "Willie Verner",
          amount: "$140",
          status: "Pending",
        },
        {
          id: "#MN0122",
          date: "03 Jul, 2020",
          name: "Felix Perry",
          amount: "$155",
          status: "Paid",
        },
        {
          id: "#MN0121",
          date: "02 Jul, 2020",
          name: "Virgil Kelley",
          amount: "$165",
          status: "Paid",
        },
        {
          id: "#MN0120",
          date: "02 Jul, 2020",
          name: "Matthew Lawler",
          amount: "$170",
          status: "Pending",
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
          key: "reference",
          label: "Quote ID",
          sortable: true,
        },
        {
          key: "dateCreated",
          sortable: true,
        },
        {
          label: "Suppliers",
          key: "uniqueSuppliers",
          sortable: true,
        },
        {
          label: "Products",
          key: "uniqueProducts",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      quotes: "quote/list",
    }),
    rows() {
      return this.invoicelist.length;
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
    this.$store.dispatch("quote/fetch");
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
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-link
            to="/quotes/create"
            class="btn btn-outline-primary mb-3 float-end"
          >
            <i class="mdi mdi-plus me-1"></i> Create Quote request
          </router-link>
        </div>
      </div>
    </div>
    <div class="table-responsive mb-0">
      <b-table
        table-class="table table-centered datatable table-card-list"
        thead-tr-class="bg-transparent"
        :items="quotes"
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
        <template v-slot:cell(id)="data">
          <a href="javascript: void(0);" class="text-dark fw-bold">
            {{ data.item.id }}
          </a>
        </template>

        <template v-slot:cell(status)="data">
          <div
            class="badge rounded-pill bg-soft-success font-size-12"
            :class="{ 'bg-soft-warning': data.item.status === 'Pending' }"
          >
            {{ data.item.status }}
          </div>
        </template>

        <template v-slot:cell(name)="data">
          <a href="#" class="text-body">{{ data.item.name }}</a>
        </template>
        <template v-slot:cell(download)>
          <div>
            <button class="btn btn-light btn-sm w-xs">
              Pdf
              <i class="uil uil-download-alt ms-2"></i>
            </button>
          </div>
        </template>
        <template v-slot:cell(action)>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-primary"
                v-b-tooltip.hover
                title="Edit"
              >
                <i class="uil uil-pen font-size-18"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a
                href="javascript:void(0);"
                class="px-2 text-danger"
                v-b-tooltip.hover
                title="Delete"
              >
                <i class="uil uil-trash-alt font-size-18"></i>
              </a>
            </li>
          </ul>
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
