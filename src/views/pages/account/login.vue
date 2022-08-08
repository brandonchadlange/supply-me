<script>
import { required, email } from "vuelidate/lib/validators";
import appConfig from "@/app.config";
import AuthService from "../../../services/auth";
import { setJWTBearerToken } from "../../../libs/http";

export default {
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
      submitted: false,
      authError: null,
      isAuthError: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    async tryToLogIn() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) return;

      const loginResponse = await AuthService.login(this.email, this.password);

      if (loginResponse.hasError) {
        this.isAuthError = true;
        this.authError = loginResponse.error;
        return;
      }

      localStorage.setItem("sm:token", loginResponse.access_token);
      setJWTBearerToken(loginResponse.access_token);
      this.$store.dispatch("auth/loggedIn", {
        access_token: loginResponse.access_token,
      });

      this.$router.push("/");
    },
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

                  <!-- <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div> -->

                  <b-form @submit.prevent="tryToLogIn">
                    <b-form-group
                      id="input-group-1"
                      class="mb-3"
                      label="Email"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="email"
                        type="text"
                        placeholder="Enter email"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.email.required"
                          >Email is required.</span
                        >
                        <span v-if="!$v.email.email"
                          >Please enter valid email.</span
                        >
                      </div>
                    </b-form-group>

                    <b-form-group id="input-group-2" class="mb-3">
                      <div class="float-end">
                        <router-link
                          tabindex="-1"
                          to="/account/forgot-password"
                          class="text-muted"
                          >Forgot password?</router-link
                        >
                      </div>
                      <label for="input-2">Password</label>
                      <b-form-input
                        id="input-2"
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        :class="{
                          'is-invalid': submitted && $v.password.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && !$v.password.required"
                        class="invalid-feedback"
                      >
                        Password is required.
                      </div>
                    </b-form-group>

                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-remember-check"
                      />
                      <label class="form-check-label" for="auth-remember-check"
                        >Remember me</label
                      >
                    </div>

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
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" module></style>
