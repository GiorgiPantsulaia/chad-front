<template>
  <div
    class="sm:w-[601px] bg-[#222030] sm:mt-48 flex flex-col items-center rounded-md absolute mx-auto left-0 right-0 h-full sm:h-auto"
    v-if="!password_changed"
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
      {{ $t("reset_password") }}
    </h1>
    <p
      class="text-[#6C757D] mt-4 font-normal tracking-wider w-1/2 text-center"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      {{ $t("new_password_rules") }}
    </p>
    <Form
      @submit="resetPassword"
      class="flex flex-col sm:w-7/12 w-10/12 pb-16 sm:mt-6"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      <password-input
        v-model="password"
        name="password"
        rules="required|min:3|lowercase"
        type="password"
        :placeholder="$t('username_email')"
        @focusout="errors = ''"
      />
      <p v-if="errors !== ''" class="text-red-500 text-sm">{{ errors }}</p>
      <password-input
        v-model="confirm_password"
        name="confirm password"
        rules="required|confirmed:@password"
        type="password"
        :placeholder="$t('repeat_password')"
        @focusout="errors = ''"
      />
      <p v-if="errors !== ''" class="text-red-500 text-sm">{{ errors }}</p>
      <div class="text-white flex justify-between"></div>
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white">
        {{ $t("reset_password") }}
      </button>
    </Form>
    <loading-bar
      v-if="isLoading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
    />
  </div>
  <password-changed v-else />
</template>
<script>
import axios from "@/config/axios/index.js";
import { Form } from "vee-validate";
import LoadingBar from "@/components/UI/LoadingBar.vue";
import PasswordInput from "@/components/UI/inputs/PasswordInput.vue";
import PasswordChanged from "@/components/modals/PasswordChanged.vue";

export default {
  components: { Form, LoadingBar, PasswordInput, PasswordChanged },
  data() {
    return {
      password: "",
      confirm_password: "",
      errors: "",
      isLoading: false,
      password_changed: false,
    };
  },
  methods: {
    resetPassword() {
      this.isLoading = true;
      axios
        .post("reset-password", {
          _method: "patch",
          code: this.$route.query.token,
          password: this.password,
        })
        .then(() => {
          this.isLoading = false;
          this.password_changed = true;
        });
    },
    checkToken() {
      if (
        !this.$route.query.token ||
        (this.$route.query.token && this.$route.query.token.length !== 40)
      ) {
        this.$router.replace({ name: "home" });
      }
    },
  },
  beforeMount() {
    this.checkToken();
  },
};
</script>
