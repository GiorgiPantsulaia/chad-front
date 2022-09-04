<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen overflow-auto"
  >
    <nav-bar></nav-bar>
    <div class="flex pt-24 h-auto overflow-auto w-full">
      <side-bar
        id="sidebar"
        class="hidden lg:block w-96"
        :class="{ 'opacity-30 pointer-events-none': addNewMovie }"
      ></side-bar>
      <transition name="newMovie" mode="out-in">
        <new-movie
          v-if="addNewMovie"
          :username="username"
          @on-close="addNewMovie = false"
          @on-Moviepost="handleMoviePost"
          @on-outside="handleClickOutside"
        >
        </new-movie>
      </transition>
      <section
        class="lg:w-9/12 w-full h-full flex flex-col md:mx-16 mx-4"
        :class="{ 'opacity-30 pointer-events-none': addNewMovie }"
      >
        <h1 class="text-lg font-medium text-white">
          {{ genre.charAt(0).toUpperCase() + genre.slice(1) }}
          {{ $t("movies") }} :
        </h1>
        <div
          class="mt-6 sm:flex sm:flex-row sm:flex-wrap flex-col justify-between sm:basis-1/3 w-full"
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
            @click="goToMovie(movie.slug)"
          />
        </div>
        <p
          v-if="search && filteredMovies.length < 1"
          class="absolute left-0 right-0 w-96 mx-auto text-xl text-white top-[40%] sm:whitespace-nowrap"
        >
          {{ $t("no_movie") }}
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
import { useAuthStore } from "@/stores/auth.js";
export default {
  components: { NavBar, SideBar, MovieCard, NewMovie },
  props: {
    genre: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movies: [],
      addNewMovie: false,
      search: null,
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter((movie) =>
        movie.title[this.$i18n.locale]
          .toLowerCase()
          .includes(this.search.toLowerCase())
      );
    },
    ...mapState(useAuthStore, ["username"]),
  },
  methods: {
    handleClickOutside() {
      this.addNewMovie = false;
    },
    handleMoviePost() {
      this.addNewMovie = false;
      this.getMovies();
    },
    goToMovie(slug) {
      this.$router.push({ name: "movie-view", params: { slug: slug } });
    },
    getMovies() {
      axios
        .post("genre-movies", {
          genre: this.genre.charAt(0).toUpperCase() + this.genre.slice(1),
        })
        .then((response) => {
          this.movies = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
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
