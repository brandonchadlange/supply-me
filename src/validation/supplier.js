import { required, email } from "vuelidate/lib/validators";

export default {
  name: {
    rules: {
      required,
    },
    messages: {
      required: "Supplier name is required",
    },
  },
  contactName: {
    rules: {
      required,
    },
    messages: {
      required: "Contact name is required",
    },
  },
  contactEmail: {
    rules: {
      required,
      email,
    },
    messages: {
      required: "Contact email is required",
      email: "Must be a valid email",
    },
  },
};
