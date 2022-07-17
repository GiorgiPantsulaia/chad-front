import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "This field is required",
        email: "Email is not valid",
      },
      fields: {
        name: {
          min: "name must be between 3 and 15 characters",
          max: "name must be between 3 and 15 characters",
          alpha_num: "name can only contain letters and numbers",
        },
        user: {
          min: "name/email must contain at least 3 characters",
        },
        password: {
          min: "password must be between 8 and 15 characters",
          max: "password must be between 8 and 15 characters",
          alpha_num: "password can only contain letters and numbers",
        },
        "confirm password": {
          confirmed: "passwords do not match.",
        },
      },
    },
    ka: {
      messages: {
        required: "ველი სავალდებულოა",
        email: "ელ-ფოსტა არ არის ვალიდური",
      },
      fields: {
        სახელი: {
          min: "სახელი უნდა შედგებოდეს მინიმუმ 3,მაქსიმუმ 15 სიმბოლოსგან",
          max: "სახელი უნდა შედგებოდეს მინიმუმ 3,მაქსიმუმ 15 სიმბოლოსგან",
          alpha_num: "სახელი უნდა შეიცავდეს მხოლოდ ასოებსა და რიცხვებს",
        },
        user: {
          min: "სახელი/ელ-ფოსტა უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან",
        },
        password: {
          min: "პაროლი უნდა შედგებოდეს მინიმუმ 8,მაქსიმუმ 15 სიმბოლოსგან",
          max: "პაროლი უნდა შედგებოდეს მინიმუმ 8,მაქსიმუმ 15 სიმბოლოსგან",
          alpha_num: "პაროლი უნდა შეიცავდეს მხოლოდ ასოებსა და რიცხვებს",
        },
        "confirm password": {
          confirmed: "პაროლები არ ემთხვევა.",
        },
      },
    },
  }),
});
