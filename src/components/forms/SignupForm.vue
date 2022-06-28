<template>
  <div
    class="w-[601px] bg-[#222030] mt-24 flex flex-col items-center rounded-md absolute mx-auto left-0 right-0"
  >
    <button
      class="text-white text-5xl self-end mr-2"
      @click="this.$router.replace('/')"
    >
      ✕
    </button>
    <h1 class="text-white text-4xl mt-10">Create an account</h1>
    <p class="text-[#6C757D]">Start your journey!</p>
    <Form @submit="submitForm" class="flex flex-col w-7/12 pb-16 mt-6">
      <text-input
        v-model="name"
        type="text"
        rules="required|min:3|max:15|alpha_num"
        name="name"
        placeholder="At least 3 & max.15 lower case characters"
      />
      <text-input
        v-model="email"
        type="email"
        name="email"
        rules="required|email"
        placeholder="Enter your email"
      />
      <text-input
        v-model="password"
        name="password"
        type="password"
        rules="required|min:8|max:15|alpha_num"
        placeholder="At least 8 & max.15 lower case characters"
      />
      <text-input
        v-model="confirm_password"
        type="password"
        name="confirm password"
        rules="confirmed:@password"
        placeholder="Confirm password"
      />

      <button class="w-full h-10 bg-[#E31221] rounded-md mt-8 text-white">
        Get Started
      </button>
      <button
        type="button"
        class="w-full h-10 border border-white rounded-md mt-4 text-white"
      >
        Sign up with Google
      </button>
      <p class="text-center mt-6 text-[#6C757D]">
        Already have an account?
        <router-link to="/login" class="text-blue-500 underline"
          >Log in</router-link
        >
      </p>
    </Form>
  </div>
</template>
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import axios from "axios";
import { Form } from "vee-validate";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://localhost:8000/api/register-user", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm_password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error.response.data.errors);
        });
    },
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { TextInput, Form },
};
</script>
