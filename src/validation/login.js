import { required, email } from "vuelidate/lib/validators";

export default {
  email: {
    rules: {
      required,
      email,
    },
    messages: {
      required: "views.login.form.email.validation.required",
      email: "views.login.form.email.validation.email",
    },
  },
  password: {
    rules: {
      required,
    },
    messages: {
      required: "views.login.form.password.validation.required",
    },
  },
};
