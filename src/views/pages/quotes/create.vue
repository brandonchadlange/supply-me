<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { required, url } from "vuelidate/lib/validators";
import SupplierService from "../../../services/supplier";
// import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { productData } from "./data-products";
import { emailData } from "./data-inbox";
import { supplierComputed } from "../../../state/helpers";
import Multiselect from "vue-multiselect";

export default {
  page: {
    title: "Add Supplier",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    Multiselect,
  },
  computed: {
    ...supplierComputed,
  },
  data() {
    return {
      emailData: emailData,
      paginatedEmailData: emailData,
      productData: productData,
      title: "Create Supplier",
      items: [
        {
          text: "Suppliers",
        },
        {
          text: "Create",
          active: true,
        },
      ],
      form: {
        name: "",
        websiteUrl: "",
      },
      submitted: false,
      value: null,
      value1: null,
      options: [
        "Alaska",
        "Hawaii",
        "California",
        "Nevada",
        "Oregon",
        "Washington",
        "Arizona",
        "Colorado",
        "Idaho",
        "Montana",
        "Nebraska",
        "New Mexico",
        "North Dakota",
        "Utah",
        "Wyoming",
        "Alabama",
        "Arkansas",
        "Illinois",
        "Iowa",
      ],
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      websiteUrl: {
        required,
        url,
      },
    },
  },
  middleware: "authentication",
  methods: {
    async submit() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) return;

      await SupplierService.createSupplier(
        this.form.name,
        this.form.websiteUrl,
        this.$route.params.project
      );

      this.$router.push(`/${this.$route.params.project}/suppliers`);
    },
    valuechange(value) {
      this.productData = productData.filter(function(product) {
        return product.newprice <= value.currentValue;
      });
    },
  },
  mounted() {
    this.totalRows = this.items.length;
    this.$store.dispatch("supplier/fetch");
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Select2</h4>
            <p class="card-title-desc">
              A mobile and touch friendly input spinner component for Bootstrap
            </p>
            <div class="col-sm-8">
              <label>Single Select</label>
              <multiselect
                v-model="value"
                :options="options"
                class="helo"
              ></multiselect>

              <label class="mt-3">Multiple Select</label>
              <multiselect
                v-model="value1"
                :options="options"
                :multiple="true"
              ></multiselect>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Css Switch</h4>
            <p class="card-title-desc">Here are a few types of switches.</p>

            <switches
              v-model="enabled"
              type-bold="true"
              class="mb-0"
            ></switches>
            <switches
              v-model="enabled1"
              type-bold="false"
              color="warning"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled2"
              type-bold="false"
              color="danger"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled3"
              type-bold="false"
              color="primary"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled4"
              type-bold="false"
              color="success"
              class="ms-1 mb-0"
            ></switches>
            <switches
              v-model="enabled5"
              type-bold="false"
              color="info"
              class="ms-1 mb-0"
            ></switches>
            <h5 class="mt-4 font-size-14 mb-4">Small switch</h5>

            <div>
              <switches v-model="small"></switches>
              <switches
                v-model="small1"
                color="warning"
                class="ms-1"
              ></switches>
              <switches v-model="small2" color="danger" class="ms-1"></switches>
              <switches
                v-model="small3"
                color="success"
                class="ms-1"
              ></switches>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <form-wizard color="#5b73e8">
      <tab-content icon="mdi mdi-account-circle" class="px-0 p-0">
        <b-tabs content-class="p-3 bg-white">
          <b-tab active class="border-0">
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="fas fa-home"></i>
              </span>
              <span class="d-none d-sm-inline-block">All products</span>
            </template>
            <div class="table-responsive mb-0">
              <div class="table-responsive">
                <table class="table table-nowrap table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 250px;">
                        Supplier Name
                      </th>
                      <th scope="col" style="width: 250px;">Website URL</th>
                      <th scope="col"></th>
                      <th scope="col" style="width: 50px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="supplier in suppliers" :key="supplier.id">
                      <td>
                        <router-link
                          :to="
                            `/${$route.params.project}/suppliers/${supplier.slug}`
                          "
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
                      <td></td>
                      <td>
                        <button class="btn btn-sm btn btn-outline-primary">
                          <i class="uil uil-plus"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-tab>
          <b-tab class="border-0">
            <template v-slot:title>
              <span class="d-inline-block d-sm-none">
                <i class="fas fa-home"></i>
              </span>
              <span class="d-none d-sm-inline-block">Selected</span>
            </template>
            <div class="table-responsive mb-0">
              <div class="table-responsive">
                <table class="table table-sm table-nowrap table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 250px;">
                        Supplier Name
                      </th>
                      <th scope="col" style="width: 250px;">Website URL</th>
                      <th scope="col">Fullfill with</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="supplier in suppliers" :key="supplier.id">
                      <td>
                        <router-link
                          :to="
                            `/${$route.params.project}/suppliers/${supplier.slug}`
                          "
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
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </tab-content>
      <tab-content icon="mdi mdi-face-profile">
        <div class="row">
          <div class="col-12">
            <div class="form-group row mb-3">
              <label class="col-md-3 col-form-label" for="name"
                >First name</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  value="Francis"
                />
              </div>
            </div>
            <div class="form-group row mb-3">
              <label class="col-md-3 col-form-label" for="surname"
                >Last name</label
              >
              <div class="col-md-9">
                <input
                  type="text"
                  name="surname"
                  class="form-control"
                  value="Brinkman"
                />
              </div>
            </div>

            <div class="form-group row mb-3">
              <label class="col-md-3 col-form-label" for="email">Email</label>
              <div class="col-md-9">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  value="cory1979@hotmail.com"
                />
              </div>
            </div>
          </div>
        </div>
      </tab-content>
      <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <h2 class="mt-0">
                <i class="mdi mdi-check-all"></i>
              </h2>
              <h3 class="mt-0">Thank you !</h3>

              <p class="w-75 mb-2 mx-auto">
                Quisque nec turpis at urna dictum luctus. Suspendisse convallis
                dignissim eros at volutpat. In egestas mattis dui. Aliquam
                mattis dictum aliquet.
              </p>

              <div class="mb-3">
                <div class="custom-control custom-checkbox">
                  <input
                    id="customCheck1"
                    type="checkbox"
                    class="custom-control-input"
                  />
                  <label class="custom-control-label" for="customCheck1"
                    >I agree with the Terms and Conditions</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content>
    </form-wizard> -->
  </div>
</template>
