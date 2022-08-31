<template>
  <img
    :src="avatar ? back_url + avatar : '/default-pfp.png'"
    alt="profile picture"
    class="w-32 h-32 rounded-full -mt-16"
  />
  <form class="text-white text-center">
    <label class="cursor-pointer" :class="{ 'text-gray-500 ': image }">
      <input
        type="file"
        class="text-white hidden"
        @change="handleImageUpload"
      />
      {{ $t("new_photo") }}</label
    >
    <p v-if="image" class="text-sm text-red-300">{{ image.name }}</p>
  </form>
  <Form @submit="updateProfile" class="flex flex-col sm:w-6/12 w-9/12 pb-24">
    <label for="username" class="text-white mt-4">{{ $t("username") }}</label>
    <Field
      type="text"
      name="username"
      rules="min:3|max:15|lowercase"
      class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3 placeholder-black"
      v-model="name"
      :placeholder="username"
    />
    <ErrorMessage name="username" class="text-[#D0342C] text-sm" />
    <label for="email" class="text-white mt-4">{{ $t("email") }}</label>
    <Field
      type="email"
      name="email"
      rules="email"
      v-model="email"
      @blur="error = null"
      :placeholder="user_email"
      :disabled="google_user === 'true' || google_user === true"
      class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3 placeholder-black"
    />
    <ErrorMessage name="email" class="text-[#D0342C] text-sm" />
    <p v-if="error" class="text-red-600 text-sm">
      {{ $t("user_exists") }}
    </p>
    <p
      class="text-[#0D6EFD] underline cursor-pointer w-32 text-sm mt-8"
      v-if="google_user === 'false' || google_user === false"
      @click="changePassword = !changePassword"
    >
      Change Password
    </p>
    <div class="flex flex-col" v-if="changePassword">
      <label for="password" class="text-white mt-4">{{ $t("password") }}</label>
      <Field
        type="password"
        v-model="password"
        rules="min:8|max:15|lowercase"
        name="password"
        :placeholder="$t('password_placeholder')"
        class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3"
      /><ErrorMessage name="password" class="text-[#D0342C] text-sm" />
      <label for="confirm password" class="text-white mt-4">{{
        $t("repeat_password")
      }}</label>
      <Field
        type="password"
        v-model="confirm_password"
        name="confirm password"
        rules="confirmed:@password"
        :placeholder="$t('repeat_password')"
        class="border border-[#CED4DA] bg-[#CED4DA] outline-none rounded-sm h-9 pl-3"
      /><ErrorMessage name="confirm password" class="text-[#D0342C] text-sm" />
    </div>
    <button
      class="bg-[#E31221] px-3 w-auto h-9 rounded-md text-white self-end relative sm:top-40 top-14 sm:left-48 left-0 right-0 mx-auto sm:mx-0 whitespace-nowrap"
    >
      {{ $t("save") }}
    </button>
  </Form>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import axios from "@/config/axios/index.js";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  beforeMount() {
    this.changeEmail();
  },
  computed: {
    ...mapState(useAuthStore, [
      "username",
      "user_email",
      "avatar",
      "google_user",
      "user_id",
    ]),
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      changePassword: false,
      image: null,
      name: null,
      email: null,
      password: null,
      confirm_password: null,
      confirmation_sent: false,
      loading: false,
      error: null,
      emailChanged: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["updateUser", "updateEmail"]),
    handleImageUpload(e) {
      this.image = e.target.files[0];
    },
    updateProfile() {
      let formData = new FormData();
      formData.append("_method", "patch");
      if (this.image) formData.append("img", this.image);
      if (this.name) formData.append("name", this.name);
      if (this.email) formData.append("email", this.email);
      if (this.password) formData.append("password", this.password);
      if (this.confirm_password)
        formData.append("password_confirmation", this.confirm_password);
      if (formData) {
        formData.append("user_email", this.user_email);
        this.loading = true;
        this.$emit("onLoading");
        axios
          .post(`user/${parseInt(this.user_id)}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.updateUser({
              username: res.data.user.name,
              user_email: res.data.user.email,
              avatar: res.data.user.profile_pic,
            });
            localStorage.setItem("username", res.data.user.name);
            localStorage.setItem("user_email", res.data.user.email);
            localStorage.setItem("avatar", res.data.user.profile_pic);
            this.image = null;
            this.name = null;
            this.email = null;
            this.password = null;
            this.confirm_password = null;
            if (res.data.confirmation_sent) {
              this.confirmation_sent = true;
              this.$emit("onConfirmationSend");
            }
            this.loading = false;
            this.$emit("onStopLoading");
          })
          .catch((err) => {
            this.error = err.response.data;
            this.loading = false;
            this.$emit("onStopLoading");
          });
      }
    },
    changeEmail() {
      if (
        this.$route.query.token &&
        this.$route.query.token.length === 40 &&
        this.$route.query.email
      ) {
        axios
          .patch("update-email", {
            verification_code: this.$route.query.token,
            email: this.$route.query.email,
          })
          .then((res) => {
            if (res.status === 200) {
              this.$emit("onEmailChange");
              this.updateEmail({ email: this.$route.query.email });
              localStorage.setItem("user_email", this.$route.query.email);
              this.$router.replace({ query: null });
            }
          });
      }
    },
  },
  emits: ["onEmailChange", "onLoading", "onStopLoading", "onConfirmationSend"],
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    ErrorMessage,
  },
};
</script>
