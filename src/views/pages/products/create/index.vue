<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Row from "@/components/layout/row.vue";
import Column from "@/components/layout/column.vue";
// import { EventBus } from "@/libs/eventbus";

import ProductDetails from "./_components/details/index.vue";
import Variants from "./_components/variants.vue";
import Attributes from "./_components/attributes.vue";
import Tags from "./_components/tags.vue";

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
    Row,
    Column,
    ProductDetails,
    Attributes,
    Tags,
    Variants,
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
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items" />
    <Row>
      <Column cols="8">
        <ProductDetails />
        <Variants />
      </Column>
      <Column cols="4">
        <Attributes />
        <Tags />
      </Column>
    </Row>
  </div>
</template>
