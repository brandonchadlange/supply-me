import { required, email, url } from "vuelidate/lib/validators";

export default {
  name: {
    rules: {
      required,
    },
    messages: {
      required: "Supplier name is required",
    },
  },
  websiteUrl: {
    rules: {
      url,
    },
    messages: {
      url: "Website url must be a valid url",
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
