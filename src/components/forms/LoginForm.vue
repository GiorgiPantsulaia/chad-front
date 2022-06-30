<template>
  <div
    class="w-[601px] bg-[#222030] mt-24 flex flex-col items-center rounded-md absolute mx-auto left-0 right-0"
  >
    <button
      class="text-white text-5xl self-end mr-2"
      @click="this.$router.replace({ name: 'home' })"
    >
      ✕
    </button>
    <h1
      class="text-white text-4xl mt-10"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      Log in to your account
    </h1>
    <p
      class="text-[#6C757D]"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      Welcome back! Please enter your details.
    </p>
    <Form
      @submit="login"
      class="flex flex-col w-[360px] pb-16 mt-6"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      <text-input
        v-model="user"
        name="email"
        rules="required|min:3"
        type="text"
        placeholder="At least 3 & max.15 lower case characters"
        @focusout="errors = ''"
      />
      <p v-if="errors !== ''" class="text-red-500 text-sm">{{ errors }}</p>
      <text-input
        v-model="password"
        name="password"
        rules="required"
        type="password"
        placeholder="At least 8 & max.15 lower case characters"
        @focusout="errors = ''"
      />
      <p v-if="errors !== ''" class="text-red-500 text-sm">{{ errors }}</p>
      <div class="text-white flex justify-between">
        <div>
          <input type="checkbox" name="remember_me" class="mr-2" />
          <label for="remember_me">Remember me</label>
        </div>
        <p class="text-[#0D6EFD] cursor-pointer">Forgot password?</p>
      </div>
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white">
        Sign in
      </button>
      <button
        class="w-full h-10 border border-white rounded-md mt-4 text-white"
        type="button"
        @click="log"
      >
        Sign in with Google
      </button>
      <p class="text-center mt-6 text-[#6C757D]">
        Don't have an account?
        <router-link to="/register" class="text-[#0D6EFD] underline mx-1">
          Sign up</router-link
        >
      </p>
    </Form>
    <loading-bar
      v-if="isLoading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
    />
  </div>
</template>
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import axios from "axios";
import { mapActions, mapState } from "pinia";
import { Form } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import LoadingBar from "@/components/UI/LoadingBar.vue";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { TextInput, Form, LoadingBar },
  data() {
    return {
      user: "",
      password: "",
      errors: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["getToken"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["storeToken"]),
    login() {
      this.isLoading = true;
      axios
        .post("http://localhost:8000/api/login", {
          name: this.user,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.isLoading = false;
          this.storeToken({ token: response.data.access_token });
          localStorage.setItem("token", response.data.access_token);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.isLoading = false;
          this.errors = error.response.data.error;
        });
    },
  },
};
</script>
