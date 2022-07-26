<template>
  <div
    class="flex flex-col bg-[#11101A] absolute md:w-[45%] left-0 right-0 mx-auto z-50 h-fit pb-6 rounded-lg"
    v-click-outside="onClickOutside"
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
    <div class="flex w-full text-white items-center mx-10 mt-4">
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
        rules="required|english"
        name="english_quote"
        v-model="english_quote"
        placeholder="New Quote..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <ErrorMessage name="english_quote" class="text-red-500 text-sm mx-10" />
      <label for="georgian_quote" class="text-white mx-10 mt-4">ქარ</label>
      <Field
        as="textarea"
        rules="required|georgian"
        name="georgian_quote"
        v-model="georgian_quote"
        placeholder="ახალი ციტატა..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <ErrorMessage name="georgian_quote" class="text-red-500 text-sm mx-10" />
      <label
        class="flex mx-10 pl-4 h-20 bg-black text-white items-center cursor-pointer rounded-md mt-6"
      >
        <input
          type="file"
          class="hidden"
          @change="handleImageUpload"
          rules="required|image"
        />
        <icon-upload-photo class="mr-4" />
        {{ image ? image.name : $t("upload_photo") }}
      </label>
      <p class="text-red-500 text-sm mx-10" v-if="image && !imageValid">
        {{ errorMessage }}
      </p>
      <div class="mx-10" v-if="movies.length > 0">
        <select
          name="chosenMovie"
          class="text-white bg-black pl-14 h-20 items-center cursor-pointer rounded-md mt-4 w-full outline-none"
          placeholder="Choose movie"
          v-model="chosenMovie"
        >
          <option :value="null" disabled hidden>
            {{ $t("choose_movie") }}
          </option>
          <option
            v-for="movie in movies"
            selected="false"
            :key="movie.slug"
            :value="movie.id"
          >
            {{ movie.title[$i18n.locale] }} ({{ movie.release_date }})
          </option>
        </select>
        <icon-camera
          class="relative bottom-14 left-2 pointer-events-none"
          fill="#fff"
        />
      </div>
      <div v-else class="flex flex-col text-white mt-10 text-center">
        <p>{{ $t("no_movies") }}</p>
        <button
          class="bg-[#E31221] h-10 font-black text-lg mt-10 w-48 mx-auto rounded-md"
          @click="this.$router.push('/movies')"
        >
          {{ $t("add_movie") }}
        </button>
      </div>
      <p class="text-red-500 text-sm mx-10" v-if="error">
        {{ error }}
      </p>
      <button
        class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6 rounded-md"
        v-if="movies.length > 0"
      >
        {{ $t("post") }}
      </button>
    </Form>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import { Field, Form, ErrorMessage } from "vee-validate";
import IconCamera from "@/components/icons/IconCamera.vue";
import IconUploadPhoto from "@/components/icons/IconUploadPhoto.vue";
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Field, Form, ErrorMessage, IconCamera, IconUploadPhoto },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  emits: ["onQuotepost", "onOutside"],
  data() {
    return {
      english_quote: "",
      georgian_quote: "",
      movies: [],
      chosenMovie: null,
      image: null,
      error: false,
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user_pfp"]),
    imageValid() {
      return this.image.type.slice(0, 5) === "image";
    },
    errorMessage() {
      return this.$t("invalid_image");
    },
  },
  methods: {
    onClickOutside() {
      this.$emit("onOutside");
    },
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
        formData.append("movie_id", this.chosenMovie);
        axios
          .post("post-quote", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            this.$emit("onQuotepost");
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.chosenMovie === null) {
        this.error = this.$t("no_movie_chosen");
      } else {
        this.error = this.$t("image_required");
      }
    },
    getMovies() {
      axios.get("user-movies").then((response) => {
        this.movies = response.data.data;
      });
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>
