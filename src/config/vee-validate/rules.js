import { defineRule } from "vee-validate";
import {
  required,
  min,
  max,
  alpha,
  email,
  alpha_num,
  confirmed,
} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("alpha", alpha);
defineRule("alpha_num", alpha_num);
defineRule("confirmed", confirmed);
