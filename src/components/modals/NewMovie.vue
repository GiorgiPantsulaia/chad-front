<template>
  <div
    class="flex flex-col bg-[#11101A] absolute sm:w-[45%] left-0 right-0 mx-auto z-50 h-fit rounded-lg pb-6 top-5"
  >
    <div class="flex items-center w-full p-6 border-b border-gray-600">
      <h1 class="text-white w-28 mx-auto font-semibold text-xl">Add Movie</h1>
      <button
        type="button"
        @click="this.$emit('onClick')"
        class="text-3xl text-white"
      >
        ✕
      </button>
    </div>
    <div
      class="flex w-full text-white items-center sm:mx-10 px-10 sm:px-0 mt-4"
    >
      <img
        src="@/icons/interstellar.png"
        alt=""
        class="w-14 h-14 rounded-full mr-4"
      />
      <p>{{ username }}</p>
    </div>
    <form class="flex flex-col mt-4" @submit.prevent="postMovie">
      <movie-input
        :modelValue="english_title"
        @update:modelValue="(newValue) => (english_title = newValue)"
        name="english_title"
        placeholder="Movie name..."
        lang="Eng"
      />
      <movie-input
        :modelValue="georgian_title"
        @update:modelValue="(newValue) => (georgian_title = newValue)"
        name="georgian_title"
        placeholder="ფილმის სახელი..."
        lang="ქარ"
      />
      <input
        v-model="income"
        type="number"
        name="income"
        placeholder="Income/შემოსავალი"
        class="outline-none p-2 text-white rounded-md bg-inherit mx-10 border border-gray-600 h-10 mt-4"
      />
      <input
        v-model="release_date"
        type="number"
        min="1970"
        max="2023"
        name="release_date"
        placeholder="Release date/გამოსვლის წელი"
        class="outline-none p-2 text-white rounded-md bg-inherit mx-10 border border-gray-600 h-10 mt-4"
      />
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
            {{ genre }}
          </option>
        </select>
      </div>
      <movie-input
        :modelValue="director_eng"
        @update:modelValue="(newValue) => (director_eng = newValue)"
        name="director_eng"
        placeholder="Director"
        lang="Eng"
      />
      <movie-input
        :modelValue="director_geo"
        @update:modelValue="(newValue) => (director_geo = newValue)"
        name="director_geo"
        placeholder="რეჟისორი"
        lang="ქარ"
      />
      <movie-textarea
        :modelValue="english_description"
        @update:modelValue="(newValue) => (english_description = newValue)"
        name="english_description"
        placeholder="Movie description"
        lang="Eng"
      />
      <movie-textarea
        :modelValue="georgian_description"
        @update:modelValue="(newValue) => (georgian_description = newValue)"
        name="georgian_description"
        placeholder="ფილმის აღწერა"
        lang="ქარ"
      />
      <label
        class="flex mx-10 pl-4 h-20 bg-black text-white items-center cursor-pointer rounded-md mt-6"
      >
        <input type="file" class="hidden" @change="handleImageUpload" />
        <img
          src="@/icons/upload-photo-icon.svg"
          alt="upload photo"
          width="30"
          class="mr-4"
        />
        {{ image ? image.name : "Upload Photo" }}
      </label>

      <button
        class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6 rounded-md"
      >
        Post
      </button>
    </form>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import MovieInput from "../inputs/MovieInput.vue";
import MovieTextarea from "../inputs/MovieTextarea.vue";
export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      english_title: "",
      georgian_title: "",
      genres: [],
      genre: null,
      chosen_genres: [],
      director_eng: null,
      director_geo: null,
      english_description: null,
      georgian_description: null,
      income: null,
      release_date: null,
      image: null,
    };
  },
  methods: {
    postMovie() {
      let formData = new FormData();
      formData.append("img", this.image);
      formData.append("english_title", this.english_title);
      formData.append("georgian_title", this.georgian_title);
      formData.append("chosen_genres", this.chosen_genres);
      formData.append("director_eng", this.director_eng);
      formData.append("director_geo", this.director_geo);
      formData.append("english_description", this.english_description);
      formData.append("georgian_description", this.georgian_description);
      formData.append("release_date", this.release_date);
      formData.append("income", this.income);
      axios
        .post("post-movie", formData, {
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
    removeGenre(title) {
      this.genres.push(title);
      this.genres.sort();
      this.chosen_genres = this.chosen_genres.filter(
        (genre) => genre !== title
      );
      this.genre = null;
    },
    handleChoose() {
      if (this.chosen_genres.length < 6) {
        this.chosen_genres.push(this.genre);
        this.genres = this.genres.filter((genre) => genre != this.genre);
        this.genre = null;
      } else {
        return;
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
  components: { MovieInput, MovieTextarea },
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
</style>
