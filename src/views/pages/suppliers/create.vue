<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { required, url } from "vuelidate/lib/validators";
import SupplierService from "../../../services/supplier";

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
  },
  data() {
    return {
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
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <b-form @submit.prevent="submit">
      <div class="row">
        <div class="col-lg-12">
          <div id="addproduct-accordion" class="custom-accordion">
            <div class="card text-dark">
              <div class="p-4">
                <div class="media align-items-center">
                  <div class="media-body overflow-hidden">
                    <h5 class="font-size-16 mb-1">Supplier Details</h5>
                  </div>
                </div>
              </div>

              <div class="p-4 border-top">
                <form>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="name">Supplier Name</label>
                        <input
                          v-model="form.name"
                          id="name"
                          name="name"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': submitted && $v.form.name.$error,
                          }"
                        />
                        <div
                          v-if="submitted && $v.form.name.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.form.name.required"
                            >Supplier Name is required.</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <label for="manufacturerbrand">Website URL</label>
                        <input
                          v-model="form.websiteUrl"
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="url"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              submitted && $v.form.websiteUrl.$error,
                          }"
                        />
                        <div
                          v-if="submitted && $v.form.websiteUrl.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.form.websiteUrl.required"
                            >Website URL is required.</span
                          >
                          <span v-if="!$v.form.websiteUrl.url"
                            >Website URL must be a valid url.</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col text-end ms-1">
          <router-link
            :to="`/${$route.params.project}/suppliers`"
            class="btn btn-light"
          >
            <i class="uil uil-times me-1"></i> Cancel
          </router-link>
          <button type="submit" class="btn btn-primary ms-1">
            <i class="uil uil-file-alt me-1"></i> Save
          </button>
        </div>
      </div>
    </b-form>
  </div>
</template>
