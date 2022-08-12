<script>
import appConfig from "@/app.config";
import Field from "../../../components/form/field.vue";
import validation from "../../../validation";
import { EventBus } from "../../../libs/eventbus";

export default {
  components: {
    Field,
  },
  page: {
    title: "Login",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      email: "",
      password: "",
      authError: null,
      isAuthError: false,
      validation: validation,
      formInvalid: false,
    };
  },
  methods: {
    async tryToLogIn() {
      this.formInvalid = false;
      EventBus.$emit("form:touch");

      if (this.formInvalid) return;

      this.$store.dispatch("auth/logIn", {
        email: this.email,
        password: this.password,
      });
    },
    setFormInvalid() {
      this.formInvalid = true;
    },
    async onLogin() {
      const profile = await this.$store.dispatch("user/fetchProfile");
      this.$router.push("/" + profile.defaultProject.slug);
    },
  },
  mounted() {
    EventBus.$on("form:invalid", this.setFormInvalid.bind(this));
    EventBus.$once("auth:loggedIn", this.onLogin.bind(this));
  },
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p class="text-muted">
                    Sign in to continue to
                    <b>
                      <span class="text-primary">Supply</span>
                      <span class="text-dark">Me</span>
                    </b>
                    .
                  </p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert
                    v-model="isAuthError"
                    variant="danger"
                    class="mt-3"
                    dismissible
                    >{{ authError }}</b-alert
                  >

                  <b-form @submit.prevent="tryToLogIn">
                    <Field
                      label="Email"
                      placeholder="Enter email"
                      v-model="email"
                      field="email"
                      :validation="validation.login.email"
                    />

                    <Field
                      label="Password"
                      placeholder="Enter password"
                      v-model="password"
                      field="password"
                      type="password"
                      :validation="validation.login.password"
                    />

                    <div class="mt-3 text-end">
                      <b-button
                        :loading="true"
                        type="submit"
                        variant="primary"
                        class="w-sm"
                        >Log In</b-button
                      >
                    </div>

                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Don't have an account ?
                        <router-link
                          to="/register"
                          class="fw-medium text-primary"
                          >Signup now</router-link
                        >
                      </p>
                    </div>
                  </b-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module></style>
