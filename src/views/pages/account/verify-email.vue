<template>
  <div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <p>
                  Please enter the OTP sent to your email address to continue.
                </p>
                <b-form @submit.prevent="verifyOtp">
                  <b-form-group
                    id="fullname-group"
                    label="OTP"
                    label-for="otp"
                    class="mb-3"
                  >
                    <b-form-input
                      v-model="form.otp"
                      id="otp"
                      type="text"
                      placeholder="6 character otp"
                      maxLength="6"
                      :class="{
                        'is-invalid': submitted && $v.form.otp.$error,
                      }"
                    ></b-form-input>
                    <div
                      v-if="submitted && $v.form.otp.$error"
                      class="invalid-feedback"
                    >
                      <span v-if="!$v.form.otp.required"
                        >Please provide an OTP.</span
                      >
                      <span v-if="!$v.form.otp.minLength"
                        >The OTP must be 6 characters.</span
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
import { required, minLength } from "vuelidate/lib/validators";
import UsersService from "../../../services/users";

export default {
  data() {
    return {
      form: {
        otp: "",
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

      const ref = this.$route.query.ref;
      const otp = this.form.otp;

      const verifyOtpResponse = await UsersService.verifyEmail(ref, otp);

      if (verifyOtpResponse.hasError) {
        alert(verifyOtpResponse.error);
        return;
      }

      alert("Email verified! Sign in to continue.");

      this.$router.push(`/login`);
    },
  },
  validations: {
    form: {
      otp: {
        required,
        minLength: minLength(6),
      },
    },
  },
};
</script>
