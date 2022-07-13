<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen lg:overflow-hidden overflow-auto"
  >
    <nav-bar></nav-bar>
    <div class="flex pt-24 h-full overflow-auto w-full">
      <side-bar></side-bar>
      <section class="lg:w-9/12 w-full h-full flex flex-col md:ml-32 mx-4">
        <div class="flex mb-4 justify-between">
          <p class="text-white text-xl">Movie Description</p>
        </div>
        <div class="flex">
          <img
            :src="back_url + movie.thumbnail"
            alt=""
            class="w-6/12 rounded-2xl"
          />
          <div class="flex flex-col ml-4 w-full">
            <div class="flex justify-between w-full">
              <p class="text-[#DDCCAA] text-xl font-bold">
                {{ movie.title["en"] }} ({{ movie.release_date }})
              </p>
              <div
                class="w-36 bg-[#24222F] py-2 items-center rounded-lg flex justify-center mr-24 text-gray-600 font-light"
              >
                <button class="pr-4 mx-2">
                  <img src="@/icons/edit-pencil-icon.svg" alt="edit" />
                </button>
                <span class="cursor-default">|</span>
                <button class="pl-4 mx-2">
                  <img src="@/icons/delete-icon.svg" alt="delete" />
                </button>
              </div>
            </div>
            <div class="flex" v-for="genre in movie.genres" :key="genre.title">
              <p
                class="px-2 py-1 bg-[#6C757D] font-black text-white rounded-md"
              >
                {{ genre.title }}
              </p>
            </div>
            <p class="text-white mt-6 font-medium text-lg">
              Director : {{ movie.director["en"] }}
            </p>
            <p class="text-white mt-6 font-medium text-lg">
              Budget : {{ movie.income }}$
            </p>
            <p class="text-white mt-6 text-base leading-10">
              {{ movie.description["en"] }}
            </p>
          </div>
        </div>
        <div class="flex text-white mt-8 items-center">
          <p class="text-xl">Quotes (total {{ movie.quotes.length }})</p>
          <p class="text-gray-600 mx-2 text-2xl">|</p>
          <button
            type="button"
            class="text-white bg-[#E31221] h-9 flex items-center justify-center rounded-md w-32"
            @click="addNewMovie = !addNewMovie"
          >
            <img
              src="@/icons/add-plus-icon.svg"
              alt="new-quote"
              width="20"
              class="mr-2"
            />
            Add Quote
          </button>
        </div>
        <div class="flex flex-col w-6/12 mt-10">
          <quote-card
            v-for="quote in movie.quotes"
            :key="quote.id"
            :quote="quote"
          />
        </div>
      </section>
    </div>
  </main>
</template>
<script>
import axios from "@/config/axios/index.js";
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import QuoteCard from "@/components/UI/QuoteCard.vue";
export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      back_url: import.meta.env.VITE_BACKEND_BASE_URL,
      movie: null,
    };
  },
  methods: {
    getMovie() {
      axios
        .post("movie-description", { slug: this.$props.slug })
        .then((response) => {
          this.movie = response.data.data;
        });
    },
  },
  beforeMount() {
    this.getMovie();
  },
  components: { NavBar, SideBar, QuoteCard },
};
</script>
