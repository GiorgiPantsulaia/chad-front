<template>
  <section class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen">
    <nav-bar></nav-bar>
    <div
      class="flex mt-24 w-full"
      :class="{
        'blur-[2px] pointer-events-none':
          loading || confirmation_sent || emailChanged,
      }"
    >
      <side-bar class="hidden lg:block"></side-bar>
      <div class="sm:ml-64 flex flex-col sm:w-5/12 h-1/2 w-full">
        <h1 class="text-white text-xl font-black hidden sm:block">
          {{ $t("profile") }}
        </h1>
        <div
          class="w-full h-full flex flex-col items-center mt-24 rounded-lg bg-[#11101A]"
        >
          <img
            :src="user_pfp ? back_url + user_pfp : '/default-pfp.png'"
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
          <Form
            @submit="updateProfile"
            class="flex flex-col sm:w-6/12 w-9/12 pb-24"
          >
            <label for="username" class="text-white mt-4">{{
              $t("username")
            }}</label>
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
              <label for="password" class="text-white mt-4">{{
                $t("password")
              }}</label>
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
              /><ErrorMessage name="password" class="text-[#D0342C] text-sm" />
            </div>
            <button
              class="bg-[#E31221] px-3 w-auto h-9 rounded-md text-white self-end relative top-40 sm:left-48 left-0 right-0 mx-auto sm:mx-0 whitespace-nowrap"
            >
              {{ $t("save") }}
            </button>
          </Form>
        </div>
      </div>
    </div>
    <email-update-sent
      v-if="confirmation_sent"
      @on-close="confirmation_sent = false"
    />
    <email-changed v-if="emailChanged" @on-close="emailChanged = false" />
    <loading-bar
      v-if="loading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
    />
  </section>
</template>

<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import axios from "@/config/axios/index.js";
import LoadingBar from "../components/UI/LoadingBar.vue";
import EmailUpdateSent from "../components/modals/EmailUpdateSent.vue";
import EmailChanged from "../components/modals/EmailChanged.vue";
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  computed: {
    ...mapState(useAuthStore, [
      "username",
      "user_email",
      "user_pfp",
      "google_user",
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
  beforeMount() {
    this.changeEmail();
  },
  methods: {
    changeEmail() {
      if (
        this.$route.query.token &&
        this.$route.query.token.length === 40 &&
        this.$route.query.email
      ) {
        axios
          .post("update-email", {
            verification_code: this.$route.query.token,
            email: this.$route.query.email,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.emailChanged = true;
              this.updateEmail({ email: this.$route.query.email });
              localStorage.setItem("user_email", this.$route.query.email);
              this.$router.replace({ query: null });
            }
          });
      }
    },
    ...mapActions(useAuthStore, ["updateUser", "updateEmail"]),
    handleImageUpload(e) {
      this.image = e.target.files[0];
    },
    updateProfile() {
      let formData = new FormData();
      if (this.image) formData.append("img", this.image);
      if (this.name) formData.append("name", this.name);
      if (this.email) formData.append("email", this.email);
      if (this.password) formData.append("password", this.password);
      if (this.confirm_password)
        formData.append("password_confirmation", this.confirm_password);
      if (formData) {
        formData.append("user_email", this.user_email);
        this.loading = true;
        axios
          .post("update-user", formData)
          .then((res) => {
            if (res.status === 200) {
              this.updateUser({
                username: res.data.user.name,
                user_email: res.data.user.email,
                user_pfp: res.data.user.profile_pic,
              });
              localStorage.setItem("username", res.data.user.name);
              localStorage.setItem("user_email", res.data.user.email);
              localStorage.setItem("user_pfp", res.data.user.profile_pic);
              this.image = null;
              this.name = null;
              this.email = null;
              this.password = null;
              this.confirm_password = null;
              if (res.data.confirmation_sent === true) {
                this.confirmation_sent = true;
              }
              this.loading = false;
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              this.error = err.response.data;
            }
            this.loading = false;
            console.log(err);
          });
      }
    },
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {
    NavBar,
    SideBar,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
    ErrorMessage,
    LoadingBar,
    EmailUpdateSent,
    EmailChanged,
  },
};
</script>
