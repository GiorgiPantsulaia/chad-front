<template>
  <div
    class="flex flex-col bg-[#11101A] absolute sm:w-[45%] left-0 right-0 mx-auto z-50 h-fit pb-6 rounded-lg"
  >
    <div class="flex items-center w-full p-6 border-b border-gray-600">
      <h1 class="text-white w-48 mx-auto font-semibold text-xl">
        {{ $t("new_quote") }}
      </h1>
      <button
        type="button"
        @click="this.$emit('onClick')"
        class="text-3xl text-white"
      >
        ✕
      </button>
    </div>
    <div class="flex sm:w-full text-white items-center mx-10 mt-4">
      <img
        :src="user_pfp ? back_url + user_pfp : '/default-pfp.png'"
        alt=""
        class="w-14 h-14 rounded-full mr-4"
      />
      <p>{{ username }}</p>
    </div>
    <Form class="flex flex-col mt-4" @submit="postQuote">
      <label for="english_quote" class="text-white mx-10 mt-4">Eng</label>
      <Field
        as="textarea"
        name="english_quote"
        v-model="english_quote"
        rules="required|english"
        placeholder="New Quote..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <ErrorMessage name="english_quote" class="text-red-500 text-sm mx-10" />
      <label for="georgian_quote" class="text-white mx-10 mt-4">ქარ</label>
      <Field
        as="textarea"
        name="georgian_quote"
        v-model="georgian_quote"
        rules="required|georgian"
        placeholder="ახალი ციტატა..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <ErrorMessage name="georgian_quote" class="text-red-500 text-sm mx-10" />
      <label
        class="flex mx-10 pl-4 h-20 bg-black text-white items-center cursor-pointer rounded-md mt-6"
      >
        <input type="file" class="hidden" @change="handleImageUpload" />
        <icon-upload-photo class="mr-4" />
        {{ image ? image.name : $t("upload_photo") }}
      </label>
      <p class="text-red-500 text-sm mx-10" v-if="image && !imageValid">
        {{ errorMessage }}
      </p>
      <p v-if="error" class="text-red-500 text-sm mx-10">
        {{ error }}
      </p>
      <div
        class="flex mx-10 pl-2 h-28 bg-black text-white items-center cursor-default rounded-md mt-6"
      >
        <img
          :src="back_url + movie.thumbnail"
          alt=""
          class="h-24 w-36 rounded-md"
        />
        <div class="flex flex-col ml-4">
          <div class="flex items-center text-xl font-semibold">
            <icon-camera class="mr-2" fill="#fff" />
            <p>{{ movie.title[$i18n.locale] }} ({{ movie.release_date }})</p>
          </div>
          <div class="mt-4 font-medium text-lg">
            {{ $t("director") }} : {{ movie.director[$i18n.locale] }}
          </div>
        </div>
      </div>
      <button
        class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6 rounded-md"
      >
        {{ $t("post") }}
      </button>
    </Form>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import IconCamera from "@/components/icons/IconCamera.vue";
import IconUploadPhoto from "@/components/icons/IconUploadPhoto.vue";

export default {
  emits: ["onClick", "onPost"],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      english_quote: "",
      georgian_quote: "",
      image: null,
      error: null,
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_pfp", "username"]),
    imageValid() {
      return this.image.type.slice(0, 5) === "image";
    },
    errorMessage() {
      return this.$t("invalid_image");
    },
  },
  methods: {
    handleImageUpload(e) {
      this.image = e.target.files[0];
      this.error = null;
    },
    postQuote() {
      if (this.image && this.imageValid) {
        let formData = new FormData();
        formData.append("img", this.image);
        formData.append("english_quote", this.english_quote);
        formData.append("georgian_quote", this.georgian_quote);
        formData.append("movie_id", this.$props.movie.id);
        axios
          .post("quotes", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.$emit("onPost");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (!this.image) {
        this.error = this.$t("image_required");
      } else {
        return;
      }
    },
  },
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { IconCamera, IconUploadPhoto, Form, Field, ErrorMessage },
};
</script>
