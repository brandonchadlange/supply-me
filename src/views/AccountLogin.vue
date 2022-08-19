<script>
import AppColumn from "@/components/AppColumn.vue";
import AppRow from "@/components/AppRow.vue";
import AppCard from "@/components/AppCard.vue";
import AppForm from "@/components/AppForm.vue";
import AppFormField from "@/components/AppFormField";
import validation from "@/validation";
import { EventBus } from "@/libs/eventbus";
import { setProjectIdHeader } from "@/libs/http";

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
      authError: null,
      isAuthError: false,
      validation: validation.login,
    };
  },
  methods: {
    async tryToLogIn() {
      this.$store.dispatch("auth/logIn", this.form);
    },
    async onLogin() {
      const profile = await this.$store.dispatch("user/fetchProfile");

      if (!profile.onboardingComplete) {
        this.$router.push("/onboarding");
        return;
      }

      setProjectIdHeader(profile.defaultProject.id);
      this.$router.push("/" + profile.defaultProject.slug);
    },
  },
  mounted() {
    EventBus.$once("auth:loggedIn", this.onLogin.bind(this));
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
                <h5 class="text-primary">{{ $t("views.login.title") }}</h5>
                <p class="text-muted">
                  {{ $t("views.login.subtitle") }}
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

                <AppForm :onSubmit="tryToLogIn">
                  <AppFormField
                    :label="$t('views.login.form.email.label')"
                    :placeholder="$t('views.login.form.email.placeholder')"
                    v-model="form.email"
                    field="email"
                    :validation="validation.email"
                  />

                  <AppFormField
                    :label="$t('views.login.form.password.label')"
                    :placeholder="$t('views.login.form.password.placeholder')"
                    v-model="form.password"
                    field="password"
                    type="password"
                    :validation="validation.password"
                  />

                  <div class="mt-3 text-end">
                    <b-button
                      :loading="true"
                      type="submit"
                      variant="primary"
                      class="w-sm"
                    >
                      {{ $t("views.login.form.submit") }}
                    </b-button>
                  </div>

                  <div class="mt-4 text-center">
                    <p class="mb-0">
                      {{ $t("views.login.links.register.text") }}
                      <router-link
                        to="/register"
                        class="fw-medium text-primary"
                      >
                        {{ $t("views.login.links.register.link") }}
                      </router-link>
                    </p>
                  </div>
                </AppForm>
              </div>
            </AppCard>
          </AppColumn>
        </AppRow>
      </div>
    </div>
  </div>
</template>
