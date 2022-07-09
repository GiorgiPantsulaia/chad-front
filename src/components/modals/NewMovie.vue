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
      <label for="english_name" class="text-white mx-10 mt-4">Eng</label>
      <input
        type="text"
        name="english_name"
        v-model="english_name"
        placeholder="Movie name..."
        class="bg-inherit border border-gray-600 mx-10 h-12 resize-none outline-none rounded-md p-2 text-white"
      />
      <label for="georgian_name" class="text-white mx-10 mt-4">ქარ</label>
      <input
        type="text"
        name="georgian_name"
        v-model="georgian_name"
        placeholder="ფილმის სახელი..."
        class="bg-inherit border border-gray-600 mx-10 h-12 resize-none outline-none rounded-md p-2 text-white"
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
        class="text-white bg-[#E31221] mx-10 h-10 font-black text-lg mt-6"
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
      english_name: "",
      georgian_name: "",
      genres: [],
      director_eng: null,
      director_geo: null,
      english_description: null,
      georgian_description: null,
    };
  },
  methods: {
    handleImageUpload(e) {
      this.image = e.target.files[0];
    },
    postQuote() {
      let formData = new FormData();
      formData.append("img", this.image);
      formData.append("english_name", this.english_name);
      formData.append("georgian_name", this.georgian_name);
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
    getGenres() {
      axios.get("genres").then((response) => {
        this.genres = response.data.data;
      });
    },
  },
  beforeMount() {
    this.getGenres();
  },
};
</script>
