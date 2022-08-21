import { required, url } from "vuelidate/lib/validators";

export default {
  description: {
    rules: {
      required,
    },
    messages: {
      required: "Description is required",
    },
  },
  manufacturerCode: {
    rules: {
      required,
    },
    messages: {
      required: "Manufacturer code is required",
    },
  },
  websiteUrl: {
    rules: {
      required,
      url,
    },
    messages: {
      required: "Website URL is required",
      url: "Website URL must be a valid url",
    },
  },
};
