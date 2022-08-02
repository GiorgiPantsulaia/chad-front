<template>
  <div
    class="sm:w-[601px] bg-[#222030] sm:mt-24 h-full sm:h-auto flex flex-col items-center rounded-md absolute mx-auto left-0 right-0"
  >
    <button
      class="text-white text-5xl self-end mr-2"
      :class="{ hidden: registered }"
      @click="this.$router.replace({ name: 'home' })"
    >
      ✕
    </button>
    <h1
      class="text-white text-4xl sm:mt-10"
      :class="{
        'blur-[2px] pointer-events-none': isLoading,
        hidden: registered,
      }"
    >
      {{ $t("create_account") }}
    </h1>
    <p
      class="text-[#6C757D] mt-2"
      :class="{
        'blur-[2px] pointer-events-none': isLoading,
        hidden: registered,
      }"
    >
      {{ $t("start_journey") }}
    </p>
    <Form
      @submit="submitForm"
      class="flex flex-col sm:w-7/12 w-10/12 pb-16 sm:mt-6 mt-12"
      :class="{
        'blur-[2px] pointer-events-none': isLoading,
        hidden: registered,
      }"
    >
      <text-input
        v-model="name"
        type="text"
        rules="required|lowercase|min:3|max:15"
        :name="$i18n.locale === 'en' ? 'name' : 'სახელი'"
        :placeholder="$t('name_placeholder')"
        @focusout="errors = {}"
      />
      <text-input
        v-model="email"
        type="email"
        :name="$i18n.locale === 'en' ? 'email' : 'ელ-ფოსტა'"
        rules="required|email"
        :placeholder="$t('email_placeholder')"
        @focusout="errors = {}"
      />
      <p v-if="errors.email" class="text-sm text-red-500">
        {{ $t("email_exists") }}
      </p>
      <password-input
        v-model="password"
        name="password"
        rules="required|min:8|max:15|lowercase"
        :placeholder="$t('password_placeholder')"
      />
      <password-input
        v-model="confirm_password"
        name="confirm password"
        rules="confirmed:@password"
        :placeholder="$t('repeat_password')"
      />
      <button class="w-full h-10 bg-[#E31221] rounded-md mt-8 text-white">
        {{ $t("get_started") }}
      </button>
      <button
        type="button"
        class="w-full h-10 border border-white rounded-md mt-4 text-white justify-center items-center flex"
        @click="googleAuth"
      >
        <icon-google class="mr-2" />
        {{ $t("g_signup") }}
      </button>
      <p class="text-center mt-6 text-[#6C757D]">
        {{ $t("have_account") }}
        <router-link to="/login" class="text-blue-500 underline">{{
          $t("login")
        }}</router-link>
      </p>
    </Form>
    <loading-bar
      v-if="isLoading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
    />
    <user-registered v-if="registered" />
  </div>
</template>
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import axios from "@/config/axios/index.js";
import { Form } from "vee-validate";
import LoadingBar from "@/components/UI/LoadingBar.vue";
import UserRegistered from "@/components/modals/UserRegistered.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import IconGoogle from "@/components/icons/IconGoogle.vue";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},
      isLoading: false,
      registered: false,
    };
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      axios
        .post("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm_password,
        })
        .then((response) => {
          this.isLoading = false;
          if (response.status === 201) {
            this.registered = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          this.errors = error.response.data.errors;
        });
    },
    googleAuth() {
      axios.post("auth-redirect").then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      });
    },
  },
  components: {
    TextInput,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    LoadingBar,
    UserRegistered,
    PasswordInput,
    IconGoogle,
  },
};
</script>
