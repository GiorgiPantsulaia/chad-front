<template>
  <div
    class="flex flex-col bg-[#11101A] absolute lg:w-[45%] md:w-[80%] left-0 right-0 mx-auto z-50 h-full overflow-auto rounded-lg pb-6 sm:top-5 top-0"
  >
    <div class="flex items-center w-full p-6 border-b border-gray-600">
      <h1
        class="text-white w-44 mx-auto font-semibold text-xl whitespace-nowrap"
      >
        {{ $t("edit_movie") }}
      </h1>
      <button
        type="button"
        @click="this.$emit('onClose')"
        class="text-3xl text-white"
      >
        ✕
      </button>
    </div>
    <div
      class="flex w-full text-white items-center sm:mx-10 px-10 sm:px-0 mt-4"
    >
      <img
        :src="avatar ? back_url + avatar : '/default-pfp.png'"
        alt="profile-picture"
        class="w-14 h-14 rounded-full mr-4"
      />
      <p>{{ username }}</p>
    </div>
    <Form class="flex flex-col mt-4" @submit="postMovie" id="form">
      <movie-input
        :modelValue="english_title"
        @update:modelValue="(newValue) => (english_title = newValue)"
        name="english_title"
        rules="required|english"
        placeholder="Movie name..."
        lang="Eng"
      />
      <p v-if="movieExists" class="text-red-500 text-sm mx-10">
        {{ $t("movie_exists") }}
      </p>
      <movie-input
        :modelValue="georgian_title"
        @update:modelValue="(newValue) => (georgian_title = newValue)"
        name="georgian_title"
        rules="required|georgian"
        placeholder="ფილმის სახელი..."
        lang="ქარ"
      />
      <Field
        v-model="income"
        type="number"
        name="income"
        rules="required|max_value:1000000000000"
        placeholder="Income/შემოსავალი"
        class="outline-none p-2 text-white rounded-md bg-inherit mx-10 border border-gray-600 h-10 mt-4"
      />
      <ErrorMessage name="income" class="text-red-500 text-sm mx-10" />
      <Field
        v-model="release_date"
        type="number"
        min="1970"
        rules="required|min_value:1970|max_value:2023"
        max="2023"
        name="release_date"
        placeholder="Release date/გამოსვლის წელი"
        class="outline-none p-2 text-white rounded-md bg-inherit mx-10 border border-gray-600 h-10 mt-4"
      />
      <ErrorMessage name="release_date" class="text-red-500 text-sm mx-10" />
      <div class="mx-10 mt-4 z-50">
        <div
          class="absolute mt-3 flex text-white pl-2"
          v-if="chosen_genres.length > 0"
        >
          <div
            v-for="genre in chosen_genres"
            :key="genre"
            class="mx-0.5 flex items-center px-2 bg-[#6C757D] pointer-events-none"
          >
            {{ genre }}
            <p
              @click="removeGenre(genre)"
              class="text-base font-black ml-1 pointer-events-auto cursor-pointer"
            >
              x
            </p>
          </div>
        </div>
        <p
          v-else
          class="absolute mt-3 flex text-white pl-2 pointer-events-none"
        >
          Genre
        </p>
        <select
          name="genres"
          class="text-white bg-[#11101A] border border-gray-600 h-12 rounded-md appearance-none outline-none w-full"
          v-model="genre"
          @change="handleChoose"
        >
          <option v-for="genre in genres" :value="genre" :key="genre">
            {{ genre[$i18n.locale] }}
          </option>
        </select>
      </div>
      <movie-input
        :modelValue="director_eng"
        @update:modelValue="(newValue) => (director_eng = newValue)"
        name="director_eng"
        rules="required|english"
        placeholder="Director"
        lang="Eng"
      />
      <movie-input
        :modelValue="director_geo"
        @update:modelValue="(newValue) => (director_geo = newValue)"
        name="director_geo"
        rules="required|georgian"
        placeholder="რეჟისორი"
        lang="ქარ"
      />
      <movie-textarea
        :modelValue="english_description"
        @update:modelValue="(newValue) => (english_description = newValue)"
        name="english_description"
        rules="english"
        placeholder="Movie description"
        lang="Eng"
      />
      <movie-textarea
        :modelValue="georgian_description"
        @update:modelValue="(newValue) => (georgian_description = newValue)"
        name="georgian_description"
        rules="georgian"
        placeholder="ფილმის აღწერა"
        lang="ქარ"
      />
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
      <p class="text-red-500 text-sm mx-10 mt-4" v-if="error">
        {{ error }}
      </p>
      <button
        class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6 rounded-md"
      >
        {{ $t("save") }}
      </button>
    </Form>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import MovieInput from "@/components/UI/inputs/MovieInput.vue";
import MovieTextarea from "@/components/UI/inputs/MovieTextarea.vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import IconUploadPhoto from "@/components/icons/IconUploadPhoto.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
export default {
  emits: ["onEdit", "onClose"],
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      english_title: this.$props.movie.title["en"],
      georgian_title: this.$props.movie.title["ka"],
      genres: [],
      genre: null,
      chosen_genres: [],
      director_eng: this.$props.movie.director["en"],
      director_geo: this.$props.movie.director["ka"],
      english_description: this.$props.movie.description["en"],
      georgian_description: this.$props.movie.description["ka"],
      income: this.$props.movie.income,
      release_date: this.$props.movie.release_date,
      image: null,
      movieExists: false,
      error: null,
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
    };
  },
  computed: {
    ...mapState(useAuthStore, ["avatar", "username"]),
    imageValid() {
      return this.image.type.slice(0, 5) === "image";
    },
    errorMessage() {
      return this.$t("invalid_image");
    },
  },
  methods: {
    postMovie() {
      console.log(this.chosen_genres);
      if ((this.image && this.imageValid) || !this.image) {
        const form = document.getElementById("form");
        let formData = new FormData(form);
        formData.append("_method", "patch");
        formData.append("lang", this.$i18n.locale);
        if (this.image) formData.append("img", this.image);
        if (this.chosen_genres)
          formData.append("chosen_genres", this.chosen_genres);
        axios
          .post(`edit-movie/${this.movie.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.$router.replace({ name: "movies-list" });
          })
          .catch(() => {
            this.movieExists = true;
          });
      }
    },
    removeGenre(title) {
      this.genres.push(title);
      this.genres.sort();
      this.chosen_genres = this.chosen_genres.filter(
        (genre) => genre !== title
      );
      this.genre = null;
    },
    handleChoose() {
      if (this.chosen_genres.length < 4) {
        this.chosen_genres.push(this.genre[this.$i18n.locale]);
        this.genres = this.genres.filter((genre) => genre != this.genre);
        this.genre = null;
      }
    },
    handleImageUpload(e) {
      this.image = e.target.files[0];
    },
    getGenres() {
      axios.get("genres").then((response) => {
        for (let genre of response.data) {
          this.genres.push(genre.title);
        }
      });
    },
  },
  beforeMount() {
    this.getGenres();
  },
  components: {
    MovieInput,
    MovieTextarea,
    Field,

    Form,
    IconUploadPhoto,
    ErrorMessage,
  },
};
</script>
<style scoped>
::placeholder {
  color: white;
  opacity: 1;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
div::-webkit-scrollbar {
  display: none;
}
</style>
