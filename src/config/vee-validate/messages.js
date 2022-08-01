import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "This field is required",
        email: "Email is not valid",
        georgian: "This field should contain only Georgian letters",
        english: "This field should contain only English letters",
        lowercase: "This field should contain English letters and numbers only",
        min: "This field should contain more than 3 characters",
        max: "This field should contain less than 15 characters",
      },
      fields: {
        release_date: {
          min_value: "Minimum release date : 1970",
          max_value: "Maximum release date : 2023",
        },
        name: {
          min: "name must be between 3 and 15 characters",
          max: "name must be between 3 and 15 characters",
          lowercase: "name can only contain lowercase letters and numbers",
        },
        user: {
          min: "name/email must contain at least 3 characters",
        },
        password: {
          min: "password must be between 8 and 15 characters",
          max: "password must be between 8 and 15 characters",
          lowercase: "password can only contain letters and numbers",
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
        georgian: "ველი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს",
        english: "ველი უნდა შეიცავდეს მხოლოდ ინგლისურ ასოებს",
        lowercase: "ველი უნდა შეიცავდეს მხოლოდ ლათინურ სიმბოლოებსა და რიცხვებს",
        min: "ველი უნდა შეიცავდეს 3-ზე მეტ სიმბოლოს",
        max: "ველი უნდა შეიცავდეს 15-ზე ნაკლებ სიმბოლოს",
      },
      fields: {
        release_date: {
          min_value: "გამოშვების წელი : მინ. 1970 წელი",
          max_value: "გამოშვების წელი : მაქს. 2023 წელი",
        },
        სახელი: {
          min: "სახელი უნდა შედგებოდეს მინიმუმ 3,მაქსიმუმ 15 სიმბოლოსგან",
          max: "სახელი უნდა შედგებოდეს მინიმუმ 3,მაქსიმუმ 15 სიმბოლოსგან",
          lowercase:
            "სახელი უნდა შედგებოდეს დაბალი რეგისტრის ლათინური სიმბოლობისა და რიცხვებისგან",
        },
        user: {
          min: "სახელი/ელ-ფოსტა უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან",
        },
        password: {
          min: "პაროლი უნდა შედგებოდეს მინიმუმ 8,მაქსიმუმ 15 სიმბოლოსგან",
          max: "პაროლი უნდა შედგებოდეს მინიმუმ 8,მაქსიმუმ 15 სიმბოლოსგან",
          lowercase:
            "პაროლი უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ასოებსა და რიცხვებს",
        },
        "confirm password": {
          confirmed: "პაროლები არ ემთხვევა.",
        },
      },
    },
  }),
});
