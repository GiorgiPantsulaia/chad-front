import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize("ka", {
    messages: {
      required: "",
      email: "",
    },
    fields: {
      name: {
        min: "",
        max: "",
        alpha: "",
      },
      email: {
        min: "",
        max: "",
        alpha: "",
      },
      "confirm password": {
        confirmed: "passwords do not match.",
      },
    },
  }),
});
