<script>
import AppColumn from "@/components/AppColumn.vue";
import AppRow from "@/components/AppRow.vue";
import AppCard from "@/components/AppCard.vue";
import AppForm from "@/components/AppForm.vue";
import AppFormField from "@/components/AppFormField";
import UsersService from "@/services/users";
import validation from "@/validation";

export default {
  components: {
    AppRow,
    AppColumn,
    AppCard,
    AppForm,
    AppFormField,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      validation: validation.register,
      hasError: false,
      errorText: "",
    };
  },
  methods: {
    async register() {
      const { email, password } = this.form;

      const registerResponse = await UsersService.register(email, password);

      if (!registerResponse.success) {
        this.errorText = registerResponse.error.message;
        this.hasError = true;
        return;
      }

      this.$router.push(`/verify-email?ref=${registerResponse.data.guid}`);
    },
  },
};
</script>

<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <AppRow class="align-items-center justify-content-center">
          <AppColumn cols="5">
            <AppCard>
              <div class="text-center mt-2">
                <h5 class="text-primary">Register Account</h5>
                <p class="text-muted">
                  Sign up to continue to
                  <b>
                    <span class="text-primary">Supply</span>
                    <span class="text-dark">Me</span>
                  </b>
                  .
                </p>
              </div>
              <div class="p-2 mt-4">
                <AppForm :onSubmit="register">
                  <AppFormField
                    label="Email"
                    placeholder="Enter email"
                    v-model="form.email"
                    field="email"
                    :validation="validation.email"
                  />

                  <AppFormField
                    label="Password"
                    placeholder="Enter password"
                    v-model="form.password"
                    field="password"
                    type="password"
                    :validation="validation.password"
                  />

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
                </AppForm>
              </div>
            </AppCard>
            <b-alert v-if="hasError" variant="danger" show>{{
              errorText
            }}</b-alert>
          </AppColumn>
        </AppRow>
      </div>
    </div>
  </div>
</template>
