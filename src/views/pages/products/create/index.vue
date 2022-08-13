<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Field from "../../../../components/form/field.vue";
import FormSection from "../../../../components/form/section.vue";
import Row from "../../../../components/layout/row.vue";
import Column from "../../../../components/layout/column.vue";
import validation from "../../../../validation";
import Multiselect from "vue-multiselect";
import { EventBus } from "../../../../libs/eventbus";
import { supplierComputed } from "../../../../state/helpers";
import VariantDialog from "./_components/variant-dialog/index.vue";

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
    Multiselect,
    VariantDialog,
  },
  data() {
    return {
      title: "Create Product",
      items: [
        {
          text: "Ecommerce",
        },
        {
          text: "Products",
          active: true,
        },
      ],
      form: {
        description: "",
        websiteUrl: "",
        supplier: null,
      },
      submitted: false,
      validation: validation,
      formInvalid: false,
      modal: true,
    };
  },
  computed: {
    ...supplierComputed,
  },
  mounted() {
    EventBus.$on("form:invalid", this.setFormInvalid.bind(this));
    this.$store.dispatch("supplier/fetch");
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
    openVariantDialog() {
      EventBus.$emit("variant-dialog:show");
    },
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <b-form @submit.prevent="submit">
      <FormSection>
        <template slot="title">
          <h5 class="font-size-16">Product Details</h5>
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
          </Row>
          <Row class="mt-4">
            <Column cols="6">
              <label>Supplier</label>
              <multiselect
                multiple
                v-model="form.supplier"
                :options="['takealot', 'evetech']"
                :allow-empty="false"
                class="helo"
              ></multiselect>
            </Column>
          </Row>
        </template>
      </FormSection>
      <FormSection>
        <template slot="title">
          <h5 class="font-size-16">Product Variants</h5>
        </template>
        <template>
          <div v-for="supplier in form.supplier" :key="supplier.id">
            <h4>{{ supplier.name }}</h4>
            <div class="table-responsive">
              <table class="table table-sm mb-0">
                <thead class="thead-light">
                  <tr>
                    <th style="width: 300px">Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a @click.prevent="openVariantDialog" href="#"
                        >Razer Kraken Kitty Edition - Quartz</a
                      >
                    </td>
                    <td>R 1,895</td>
                  </tr>
                  <tr>
                    <td>
                      <a @click.prevent="openVariantDialog" href="#"
                        >Razer Kraken Kitty Edition - Black</a
                      >
                    </td>
                    <td>R 1,999</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
          </div>
        </template>
      </FormSection>
      <FormSection>
        <template slot="title">
          <h5 class="font-size-16">Suppliers</h5>
        </template>
        <template>
          <div v-for="supplier in form.supplier" :key="supplier.id">
            <h4>{{ supplier.name }}</h4>
            <div class="table-responsive">
              <table class="table table-sm mb-0">
                <thead class="thead-light">
                  <tr>
                    <th style="width: 300px">Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a @click.prevent="openVariantDialog" href="#"
                        >Razer Kraken Kitty Edition - Quartz</a
                      >
                    </td>
                    <td>R 1,895</td>
                  </tr>
                  <tr>
                    <td>
                      <a @click.prevent="openVariantDialog" href="#"
                        >Razer Kraken Kitty Edition - Black</a
                      >
                    </td>
                    <td>R 1,999</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
          </div>
        </template>
      </FormSection>
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
    <VariantDialog />
  </div>
</template>
