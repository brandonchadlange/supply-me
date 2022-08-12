<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
// import SupplierService from "../../../services/supplier";
import Field from "../../../components/form/field.vue";
import FormSection from "../../../components/form/section.vue";
import Row from "../../../components/layout/row.vue";
import Column from "../../../components/layout/column.vue";
import validation from "../../../validation";
import { EventBus } from "../../../libs/eventbus";

export default {
  page: {
    title: "Add Product",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
    Field,
    Row,
    Column,
    FormSection,
  },
  data() {
    return {
      title: "Create Product",
      form: {
        description: "",
        websiteUrl: "",
      },
      submitted: false,
      validation: validation,
      formInvalid: false,
    };
  },
  mounted() {
    EventBus.$on("form:invalid", this.setFormInvalid.bind(this));
  },
  middleware: "authentication",
  methods: {
    async submit() {
      this.formInvalid = false;
      EventBus.$emit("form:touch");

      if (!this.formInvalid) {
        alert("Can submit");
      }

      // if (this.$v.$invalid) return;

      // await SupplierService.createSupplier(
      //   this.form.name,
      //   this.form.websiteUrl,
      //   this.$route.params.project
      // );

      // this.$router.push(`/${this.$route.params.project}/suppliers`);
    },
    setFormInvalid() {
      this.formInvalid = true;
    },
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <b-form @submit.prevent="submit">
      <Row>
        <Column cols="12">
          <FormSection>
            <template slot="title">
              <h5 class="font-size-16 mb-1">Product Details</h5>
            </template>
            <template>
              <Row>
                <Column cols="6">
                  <Field
                    label="Description"
                    v-model="form.description"
                    field="description"
                    :validation="validation.product.description"
                  />
                </Column>
                <Column cols="6">
                  <Field
                    label="Website Url"
                    placeholder="https://takealot.com"
                    v-model="form.websiteUrl"
                    field="websiteUrl"
                    :validation="validation.product.websiteUrl"
                  />
                </Column>
              </Row>
            </template>
          </FormSection>
        </Column>
      </Row>
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
