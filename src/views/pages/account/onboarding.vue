<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <p>
                  Please submit the following details to complete your account
                  setup.
                </p>
                <b-form @submit.prevent="verifyOtp">
                  <b-form-group
                    id="fullname-group"
                    label="First name"
                    label-for="firstName"
                    class="mb-3"
                  >
                    <b-form-input
                      v-model="form.firstName"
                      id="firstName"
                      type="text"
                      placeholder="John"
                      :class="{
                        'is-invalid': submitted && $v.form.firstName.$error,
                      }"
                    ></b-form-input>
                    <div
                      v-if="submitted && $v.form.firstName.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.firstName.required"
                        >First name is required.</span
                      >
                    </div>
                  </b-form-group>

                  <b-form-group
                    id="fullname-group"
                    label="Last name"
                    label-for="lastName"
                    class="mb-3"
                  >
                    <b-form-input
                      v-model="form.lastName"
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      :class="{
                        'is-invalid': submitted && $v.form.lastName.$error,
                      }"
                    ></b-form-input>
                    <div
                      v-if="submitted && $v.form.lastName.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.lastName.required"
                        >Last name is required.</span
                      >
                    </div>
                  </b-form-group>

                  <b-form-group
                    id="fullname-group"
                    label="Company name"
                    label-for="companyName"
                    class="mb-3"
                  >
                    <b-form-input
                      v-model="form.companyName"
                      id="companyName"
                      type="text"
                      placeholder="ACME Company"
                      :class="{
                        'is-invalid': submitted && $v.form.companyName.$error,
                      }"
                    ></b-form-input>
                    <div
                      v-if="submitted && $v.form.companyName.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.companyName.required"
                        >Company name is required.</span
                      >
                    </div>
                  </b-form-group>

                  <div class="mt-3 text-end">
                    <b-button type="submit" variant="primary" class="w-sm"
                      >Submit</b-button
                    >
                  </div>
                </b-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import OnboardingService from "../../../services/onboarding";

export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        companyName: "",
      },
      submitted: false,
    };
  },
  methods: {
    async verifyOtp() {
      this.submitted = true;

      console.log(this.$v);

      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) return;

      const onboardingResponse = await OnboardingService.completeOnboarding(
        this.form.firstName,
        this.form.lastName,
        this.form.companyName
      );

      if (onboardingResponse.hasError) {
        alert(onboardingResponse.error);
        return;
      }

      alert("Onboarding complete.");

      this.$router.push(`/${onboardingResponse.project.slug}`);
    },
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      companyName: {
        required,
      },
    },
  },
};
</script>
