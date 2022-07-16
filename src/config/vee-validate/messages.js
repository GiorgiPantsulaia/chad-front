import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize("en", {
    messages: {
      required: "This field is required",
      email: "",
    },
    fields: {
      name: {
        min: "name must be between 3 and 15 characters",
        max: "name must be between 3 and 15 characters",
        alpha_num: "name can only contain letters and numbers",
      },
      user: {
        min: "name/email must contain at least 3 characters",
        max: "",
      },
      email: {
        min: "",
        max: "",
        alpha: "",
      },
      password: {
        min: "password must be between 3 and 15 characters",
        max: "password must be between 3 and 15 characters",
        alpha_num: "password can only contain letters and numbers",
      },
      "confirm password": {
        confirmed: "passwords do not match.",
      },
    },
  }),
});
