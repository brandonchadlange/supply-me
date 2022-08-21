<script>
import Layout from "@/components/Layout";

export default {
  components: { Layout }
};
</script>

<template>
  <Layout>
    <div class="pt-sm-2">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <div>
              <div class="row justify-content-center">
                <div class="col-sm-4">
                  <div class="error-img">
                    <img
                      src="@/assets/images/maintenance.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <h4 class="text-uppercase mt-4">Seems like there is nothing here!</h4>
            <p class="text-muted">
              Would you like to create a new quote request?
            </p>
            <div class="mt-5">
              <router-link to="/quotes/create" class="btn btn-primary"
                >Create new quote request</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </Layout>
</template>
