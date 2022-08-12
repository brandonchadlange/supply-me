import { required, email } from "vuelidate/lib/validators";

export default {
  email: {
    rules: {
      required,
      email,
    },
    messages: {
      required: "Email is required.",
      email: "Please enter valid email.",
    },
  },
  password: {
    rules: {
      required,
    },
    messages: {
      required: "Password is required.",
    },
  },
};
