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
    <form class="flex flex-col mt-4" @submit.prevent="postQuote">
      <label for="english_quote" class="text-white mx-10 mt-4">Eng</label>
      <textarea
        name="english_quote"
        v-model="english_quote"
        placeholder="New Quote..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <label for="georgian_quote" class="text-white mx-10 mt-4">ქარ</label>
      <textarea
        name="georgian_quote"
        v-model="georgian_quote"
        placeholder="ახალი ციტატა..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <label
        class="flex mx-10 pl-4 h-20 bg-black text-white items-center cursor-pointer rounded-md mt-6"
      >
        <input type="file" class="hidden" @change="handleImageUpload" />
        <img
          src="@/icons/upload-photo-icon.svg"
          alt="upload photo"
          width="40"
          class="mr-4"
        />
        {{ image ? image.name : $t("upload_photo") }}
      </label>
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
            <img
              src="@/icons/camera-icon.svg"
              alt="upload photo"
              width="30"
              class="mr-2"
            />
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
    </form>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

export default {
  emits: ["onClick"],
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
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_pfp", "username"]),
  },
  methods: {
    handleImageUpload(e) {
      this.image = e.target.files[0];
    },
    postQuote() {
      let formData = new FormData();
      formData.append("img", this.image);
      formData.append("english_quote", this.english_quote);
      formData.append("georgian_quote", this.georgian_quote);
      formData.append("movie_id", this.$props.movie.id);
      axios
        .post("post-quote", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
