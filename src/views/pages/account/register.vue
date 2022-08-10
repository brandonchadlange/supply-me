<script>
import { required, email } from "vuelidate/lib/validators";
import appConfig from "@/app.config";
import UsersService from "../../../services/users";

/**
 * Register component
 */
export default {
  page: {
    title: "Register",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      submitted: false,
      tryingToRegister: false,
      isRegisterError: false,
      title: "Register",
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    // Try to register the user in with the email, username
    // and password they provided.
    async register() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) return;

      const { email, password } = this.user;

      const registerResponse = await UsersService.register(email, password);

      if (registerResponse.hasError) {
        console.log(registerResponse.error);
        return;
      }

      this.$router.push(`/verify-email?ref=${registerResponse.ref}`);
    },
  },
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <router-link to="/" class="text-dark">
        <i class="mdi mdi-home-variant h2"></i>
      </router-link>
    </div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Register Account</h5>
                  <p class="text-muted">Get your free Minible account now.</p>
                </div>
                <div class="p-2 mt-4">
                  <!-- <div
                    v-if="notification.message"
                    :class="'alert ' + notification.type"
                  >
                    {{ notification.message }}
                  </div> -->

                  <b-form @submit.prevent="register">
                    <b-form-group
                      id="fullname-group"
                      label="Email"
                      label-for="email"
                      class="mb-3"
                    >
                      <b-form-input
                        id="email"
                        v-model="user.email"
                        type="email"
                        placeholder="Enter email"
                        :class="{
                          'is-invalid': submitted && $v.user.email.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && $v.user.email.$error"
                        class="invalid-feedback"
                      >
                        <span v-if="!$v.user.email.required"
                          >Email is required.</span
                        >
                        <span v-if="!$v.user.email.email"
                          >Please enter valid email.</span
                        >
                      </div>
                    </b-form-group>

                    <b-form-group
                      id="password-group"
                      label="Password"
                      class="mb-3"
                      label-for="password"
                    >
                      <b-form-input
                        id="password"
                        v-model="user.password"
                        type="password"
                        placeholder="Enter password"
                        :class="{
                          'is-invalid': submitted && $v.user.password.$error,
                        }"
                      ></b-form-input>
                      <div
                        v-if="submitted && !$v.user.password.required"
                        class="invalid-feedback"
                      >
                        Password is required.
                      </div>
                    </b-form-group>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="auth-terms-condition-check"
                      />
                      <label
                        class="form-check-label"
                        for="auth-terms-condition-check"
                        >I accept
                        <a href="javascript: void(0);" class="text-dark"
                          >Terms and Conditions</a
                        ></label
                      >
                    </div>
                    <div class="mt-3 text-end">
                      <b-button type="submit" variant="primary" class="w-sm"
                        >Register</b-button
                      >
                    </div>

                    <div class="mt-4 text-center">
                      <p class="text-muted mb-0">
                        Already have an account ?
                        <router-link to="/login" class="fw-medium text-primary"
                          >Login</router-link
                        >
                      </p>
                    </div>
                  </b-form>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
