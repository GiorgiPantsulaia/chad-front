<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen lg:overflow-hidden overflow-auto"
  >
    <nav-bar></nav-bar>
    <div class="flex pt-24 h-full overflow-auto w-full">
      <side-bar
        id="sidebar"
        :class="{ 'opacity-30 pointer-events-none': addNewMovie }"
      ></side-bar>
      <transition name="newMovie" mode="out-in">
        <new-movie
          v-if="addNewMovie"
          :username="username"
          @onClick="addNewMovie = false"
        >
        </new-movie>
      </transition>
      <section
        class="lg:w-9/12 w-full h-full flex flex-col md:mx-16 mx-4"
        :class="{ 'opacity-30 pointer-events-none': addNewMovie }"
      >
        <div class="flex mb-4 justify-between">
          <p type="button" class="text-white text-xl">
            My list of movies (Total {{ movies.length }})
          </p>
          <div class="flex">
            <div class="w-32 hidden items-center md:flex text-white">
              <button>
                <img src="@/icons/search-icon.svg" alt="search" />
              </button>
              <input
                v-model="search"
                type="text"
                class="bg-inherit h-12 ml-4 w-full outline-none"
                placeholder="Search"
              />
            </div>
            <button
              type="button"
              class="text-white bg-[#E31221] h-12 flex items-center justify-center rounded-lg w-32"
              @click="addNewMovie = !addNewMovie"
            >
              <img
                src="@/icons/add-plus-icon.svg"
                alt="new-quote"
                width="25"
                class="mr-2"
              />
              Add movie
            </button>
          </div>
        </div>
        <div
          class="mt-6 flex flex-wrap justify-between basis-1/3 w-full"
          v-if="search === null"
        >
          <movie-card
            v-for="movie in movies"
            :key="movie.slug"
            :thumbnail="movie.thumbnail"
            :title="movie.title"
            :releaseDate="movie.release_date"
            :quotesLength="movie.quotes.length"
            @click="goToMovie(movie.slug)"
          />
        </div>
        <div
          class="mt-6 flex flex-wrap justify-between basis-1/3 w-full"
          v-else
        >
          <movie-card
            v-for="movie in filteredMovies"
            :key="movie.slug"
            :thumbnail="movie.thumbnail"
            :title="movie.title"
            :releaseDate="movie.release_date"
            :quotesLength="movie.quotes.length"
          />
        </div>
        <p
          v-if="search && filteredMovies.length < 1"
          class="absolute left-0 right-0 w-96 mx-auto text-xl text-white top-[40%]"
        >
          There's no movie for this keyword 🤔
        </p>
      </section>
    </div>
  </main>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import axios from "@/config/axios/index.js";
import MovieCard from "@/components/UI/MovieCard.vue";
import NewMovie from "@/components/modals/NewMovie.vue";
import { mapState } from "pinia";
import { useAuthStore } from "../stores/auth";
export default {
  components: { NavBar, SideBar, MovieCard, NewMovie },
  data() {
    return {
      movies: [],
      addNewMovie: false,
      search: null,
    };
  },
  computed: {
    filteredMovies() {
      console.log(this.movies[0].title["en"]);
      return this.movies.filter((movie) => {
        return movie.title["en"]
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },

    ...mapState(useAuthStore, ["username"]),
  },
  methods: {
    goToMovie(slug) {
      this.$router.push("/my-movies/" + slug);
    },
    getMovies() {
      axios
        .get("user-movies")
        .then((response) => {
          this.movies = response.data.data;
          console.log(this.movies[0].title["en"]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>
<style scoped>
.newMovie-enter-active,
.newMovie-leave-active {
  transition: opacity 0.2s ease;
}

.newMovie-enter-from,
.newMovie-leave-to {
  opacity: 0;
}
</style>
