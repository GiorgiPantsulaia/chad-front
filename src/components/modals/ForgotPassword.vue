<template>
  <div
    class="sm:w-[601px] bg-[#222030] sm:mt-48 flex flex-col items-center rounded-md absolute mx-auto left-0 right-0 h-full sm:h-auto z-50"
    v-if="!confirmation_sent"
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
      {{ $t("forgot_password") }}
    </h1>
    <p
      class="text-[#6C757D] mt-4 font-normal tracking-wider w-8/12 text-center"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      {{ $t("forgot_password_instructions") }}
    </p>
    <Form
      @submit="sendInstructions"
      class="flex flex-col sm:w-7/12 w-10/12 pb-16 sm:mt-6"
      :class="{ 'blur-[2px] pointer-events-none': isLoading }"
    >
      <text-input
        v-model="email"
        name="email"
        rules="required|email"
        type="text"
        :placeholder="$t('email')"
        @focusout="errors = ''"
      />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <button
        class="w-full h-10 bg-[#E31221] rounded-md mt-4 text-white text-xl"
      >
        {{ $t("send") }}
      </button>
      <router-link
        to="/login"
        class="text-[#6C757D] flex mt-6 items-center self-center text-lg"
      >
        <icon-return class="mr-2" />
        {{ $t("backto_login") }}</router-link
      >
    </Form>
    <loading-bar
      v-if="isLoading"
      class="absolute top-0 bottom-0 my-auto left-0 right-0 mx-auto"
    />
  </div>
  <confirmation-sent message="close" v-else />
</template>
<script>
import TextInput from "@/components/inputs/TextInput.vue";
import axios from "@/config/axios/index.js";
import { Form } from "vee-validate";
import LoadingBar from "@/components/UI/LoadingBar.vue";
import IconReturn from "@/components/icons/IconReturn.vue";
import ConfirmationSent from "@/components/modals/ConfirmationSent.vue";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { TextInput, Form, LoadingBar, IconReturn, ConfirmationSent },
  data() {
    return {
      error: null,
      email: null,
      isLoading: false,
      confirmation_sent: false,
    };
  },
  methods: {
    sendInstructions() {
      this.isLoading = true;
      axios
        .post("confirm-email", { email: this.email })
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          if (res.status === 200) {
            this.confirmation_sent = true;
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
          this.error = this.$t("user_doesnt_exist");
        });
    },
  },
};
</script>
