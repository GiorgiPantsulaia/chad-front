import { defineRule } from "vee-validate";
import {
  required,
  min,
  max,
  alpha,
  email,
  alpha_num,
  confirmed,
  min_value,
  max_value,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha", alpha);
defineRule("alpha_num", alpha_num);
defineRule("confirmed", confirmed);
defineRule("min_value", min_value);
defineRule("max_value", max_value);

defineRule("lowercase", (value) => {
  if (!/^[a-z0-9 ]*$/.test(value)) {
    return false;
  }
  return true;
});
defineRule("georgian", (value) => {
  if (!/^[ა-ჰ\s.,!?]*$/.test(value)) {
    return false;
  }
  return true;
});
defineRule("english", (value) => {
  if (!/^[A-Za-z\s.,!?]*$/.test(value)) {
    return false;
  }
  return true;
});
