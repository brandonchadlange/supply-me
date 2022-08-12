<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";

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
  components: { Layout },
  middleware: "authentication",
};
</script>

<template>
  <Layout>
    <main>
      <router-view />
    </main>
  </Layout>
</template>
