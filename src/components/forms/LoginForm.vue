<template>
  <div
    class="sm:w-[601px] bg-[#222030] sm:mt-24 flex flex-col items-center rounded-md absolute mx-auto left-0 right-0 h-full sm:h-auto"
  >
    <button
      class="text-white text-5xl self-end mr-2"
      @click="this.$router.replace({ name: 'home' })"
    >
      ✕
    </button>
    <h1
      class="text-white text-4xl sm:mt-10 mt-24"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      Log in to your account
    </h1>
    <p
      class="text-[#6C757D] mt-4 font-normal tracking-wider"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      Welcome back! Please enter your details.
    </p>
    <Form
      @submit="login"
      class="flex flex-col sm:w-7/12 w-10/12 pb-16 sm:mt-6"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      <text-input
        v-model="user"
        name="user"
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
          <input
            type="checkbox"
            name="remember_me"
            class="mr-2"
            v-model="remember_me"
          />
          <label for="remember_me">Remember me</label>
        </div>
        <p class="text-[#0D6EFD] cursor-pointer">Forgot password?</p>
      </div>
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white">
        Sign in
      </button>
      <button
        class="w-full h-10 border border-white rounded-md mt-4 text-white flex justify-center items-center"
        type="button"
        @click="googleAuth"
      >
        <img
          src="@/icons/google-icon.svg"
          alt="google-icon"
          width="25"
          class="mr-2"
        />
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
import axios from "@/config/axios/index.js";
import { mapActions } from "pinia";
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
      remember_me: null,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["storeLoginUser"]),
    googleAuth() {
      axios.post("auth-redirect").then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      });
    },
    login() {
      this.isLoading = true;
      axios
        .post("http://localhost:8000/api/login", {
          name: this.user,
          password: this.password,
        })
        .then((response) => {
          this.isLoading = false;
          if (response.data.error) {
            this.errors = response.data.error;
          } else {
            console.log(response.data);
            this.storeLoginUser({
              token: response.data.access_token,
              username: response.data.username,
              user_email: response.data.user_email,
              expire_time: response.data.expires_in,
              user_pfp: response.data.user_pfp,
            });
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.errors = error.response.data.error;
        });
    },
  },
};
</script>
