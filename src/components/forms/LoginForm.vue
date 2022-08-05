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
      {{ $t("login_message") }}
    </h1>
    <p
      class="text-[#6C757D] mt-4 font-normal tracking-wider"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      {{ $t("welcome_back") }}
    </p>
    <Form
      @submit="login"
      class="flex flex-col sm:w-7/12 w-10/12 pb-16 sm:mt-6"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      <text-input
        v-model="user"
        name="user"
        rules="required"
        type="text"
        :placeholder="$t('username_email')"
        @focusout="errors = ''"
      />
      <p v-if="errors !== ''" class="text-[#D0342C] text-sm">{{ errors }}</p>
      <text-input
        v-model="password"
        name="password"
        rules="required"
        type="password"
        :placeholder="$t('password')"
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
          <label for="remember_me">{{ $t("remember_me") }}</label>
        </div>
        <router-link
          :to="{ name: 'forgot-password' }"
          class="text-[#0D6EFD] cursor-pointer"
          >{{ $t("forgot_password") }}</router-link
        >
      </div>
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white">
        {{ $t("signin") }}
      </button>
      <button
        class="w-full h-10 border border-white rounded-md mt-4 text-white flex justify-center items-center"
        type="button"
        @click="googleAuth"
      >
        <icon-google class="mr-2" />
        {{ $t("g_signin") }}
      </button>
      <p class="text-center mt-6 text-[#6C757D]">
        {{ $t("no_account") }}
        <router-link
          :to="{ name: 'register' }"
          class="text-[#0D6EFD] underline mx-1"
        >
          {{ $t("signup") }}</router-link
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
import TextInput from "@/components/UI/inputs/TextInput.vue";
import axios from "@/config/axios/index.js";
import { mapActions } from "pinia";
import { Form, ErrorMessage } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import LoadingBar from "@/components/UI/LoadingBar.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
import { setJwtToken } from "../../helpers/jwt";

export default {
  components: { TextInput, Form, LoadingBar, IconGoogle, ErrorMessage },
  data() {
    return {
      user: "",
      password: "",
      errors: "",
      isLoading: false,
      remember_me: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["storeLoggedUser"]),
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
        .post(`${import.meta.env.VITE_API_BASE_URL}login`, {
          name: this.user,
          password: this.password,
          remember_me: this.remember_me,
        })
        .then((response) => {
          this.isLoading = false;
          this.storeLoggedUser({
            token: response.data.access_token,
            username: response.data.username,
            user_email: response.data.user_email,
            expire_time: response.data.expires_in,
            avatar: response.data.avatar,
            user_id: response.data.user_id,
            google_user: false,
          });
          setJwtToken(response.data.access_token);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            this.errors = this.$t("account_not_activated");
          }
          this.isLoading = false;
          if (error.response.data.error === "incorrect credentials")
            this.errors = this.$t("incorrect_credentials");
        });
    },
  },
};
</script>
