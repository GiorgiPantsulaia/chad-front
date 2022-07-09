<template>
  <div
    class="flex flex-col bg-[#11101A] absolute w-[45%] left-0 right-0 mx-auto z-50 h-3/4 rounded-lg"
  >
    <div class="flex items-center w-full p-6 border-b border-gray-600">
      <h1 class="text-white w-48 mx-auto font-semibold text-xl">
        Write New Quote
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
        src="@/icons/interstellar.png"
        alt=""
        class="w-14 h-14 rounded-full mr-4"
      />
      <p>{{ username }}</p>
    </div>
    <form class="flex flex-col mt-4" @submit.prevent="postQuote">
      <label for="english_quote" class="text-white mx-10 mt-4">Eng</label>
      <textarea
        type="text"
        name="english_quote"
        v-model="english_quote"
        placeholder="New Quote..."
        class="bg-inherit border border-gray-600 mx-10 h-20 resize-none outline-none rounded-md p-2 text-white"
      />
      <label for="georgian_quote" class="text-white mx-10 mt-4">ქარ</label>
      <textarea
        type="text"
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
          width="30"
          class="mr-4"
        />
        {{ image ? image.name : "Upload Photo" }}
      </label>
      <div class="mx-10" v-if="movies.length > 0">
        <select
          name="chosenMovie"
          class="text-white bg-black pl-14 h-20 items-center cursor-pointer rounded-md mt-4 w-full outline-none"
          placeholder="Choose movie"
          v-model="chosenMovie"
        >
          <option :value="null" disabled hidden>Choose Movie</option>
          <option
            v-for="movie in movies"
            selected="false"
            :key="movie.slug"
            :value="movie.id"
          >
            {{ movie.title }} ({{ movie.release_date }})
          </option>
        </select>
        <img
          src="@/icons/camera-icon.svg"
          alt=""
          width="30"
          class="relative bottom-14 left-4 pointer-events-none"
        />
      </div>
      <div v-else class="flex flex-col text-white mt-10 text-center">
        <p>You do not have any movies added.</p>
        <button class="bg-[#E31221] h-10 font-black text-lg mt-10 w-48 mx-auto">
          Add Movie
        </button>
      </div>
      <button
        class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6"
        v-if="movies.length > 0"
      >
        Post
      </button>
    </form>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";

export default {
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      english_quote: "",
      georgian_quote: "",
      movies: [],
      chosenMovie: null,
      image: null,
    };
  },
  methods: {
    handleImageUpload(e) {
      this.image = e.target.files[0];
    },
    postQuote() {
      console.log(this.image);
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMovies() {
      axios.get("all-movies").then((response) => {
        this.movies = response.data.data;
      });
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>
