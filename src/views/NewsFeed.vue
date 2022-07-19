<template>
  <main
    class="h-screen bg-[#1a1825] absolute top-0 left-0 w-screen overflow-hidden"
  >
    <nav-bar></nav-bar>
    <div class="flex pt-24 h-full overflow-auto w-full" id="infinite-list">
      <side-bar
        id="sidebar"
        :class="{ 'opacity-30 pointer-events-none': addNewQuote }"
      ></side-bar>
      <transition name="newQuote" mode="out-in">
        <new-quote
          v-if="addNewQuote"
          :username="username"
          @onClick="addNewQuote = false"
        >
        </new-quote>
      </transition>
      <section
        class="lg:w-9/12 w-full h-full mx-auto"
        :class="{ 'opacity-30 pointer-events-none': addNewQuote }"
      >
        <div class="flex mb-4 mx-auto lg:w-7/12 mt-2">
          <button
            type="button"
            class="text-white bg-[#24222F] h-12 flex items-center justify-center px-4 rounded-lg w-full transition-all"
            :class="{ 'md:w-2/5': openSearch }"
            @click="addNewQuote = !addNewQuote"
          >
            <img
              src="@/icons/write-icon.svg"
              alt="new-quote"
              width="25"
              class="mr-3"
            />
            {{ $t("new_post") }}
          </button>
          <form
            class="hidden mx-5 border-b border-gray-600 items-center md:flex text-white transition-all"
            :class="{ 'w-full': openSearch }"
            @submit.prevent="search"
          >
            <button><img src="@/icons/search-icon.svg" alt="search" /></button>
            <input
              type="search"
              v-model="search_keyword"
              class="bg-inherit h-12 ml-4 w-full outline-none"
              :placeholder="
                openSearch ? $t('search_placeholder') : $t('search')
              "
              @focus="openSearch = true"
              @focusout="openSearch = false"
            />
          </form>
        </div>
        <div v-if="!searched_movies">
          <post-card v-for="quote in quotes" :key="quote.id" :quote="quote" />
        </div>
        <div
          v-else
          class="flex flex-wrap basis-1/2 w-full ml-24 justify-between"
        >
          <movie-card
            v-for="movie in searched_movies"
            :key="movie.slug"
            :thumbnail="movie.thumbnail"
            :title="movie.title"
            :releaseDate="movie.release_date"
            :quotesLength="movie.quotes.length"
            @click="goToMovie(movie.slug)"
          />
        </div>
        <p v-if="not_found" class="text-white mx-auto w-max mt-48">
          {{ $t("not_found") }}
        </p>
      </section>
    </div>
  </main>
</template>
<script>
import NavBar from "@/components/layout/NavBar.vue";
import SideBar from "@/components/layout/SideBar.vue";
import axios from "@/config/axios/index.js";
import NewQuote from "@/components/modals/NewQuote.vue";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import PostCard from "@/components/modals/PostCard.vue";
import MovieCard from "../components/UI/MovieCard.vue";
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { NavBar, SideBar, NewQuote, PostCard, MovieCard },
  data() {
    return {
      quotes: [],
      page: 1,
      lastPage: false,
      loading: false,
      addNewQuote: false,
      openSearch: false,
      search_keyword: null,
      searched_movies: null,
      not_found: false,
    };
  },
  mounted() {
    const scrollDiv = document.getElementById("infinite-list");
    scrollDiv.addEventListener("scroll", () => {
      if (
        scrollDiv.offsetHeight + scrollDiv.scrollTop >=
        scrollDiv.scrollHeight
      ) {
        this.addQuotes();
      }
    });
  },
  computed: {
    ...mapState(useAuthStore, ["username"]),
  },
  watch: {
    search_keyword() {
      if (this.search_keyword === "") {
        this.searched_movies = null;
        this.getInitialQuotes();
      }
    },
  },
  methods: {
    search() {
      axios
        .post("search", {
          search: this.search_keyword,
          lang: this.$i18n.locale,
        })
        .then((response) => {
          if (response.data.quotes) {
            this.searched_movies = null;
            this.not_found = null;
            this.quotes = response.data.quotes;
          } else if (response.data.movies) {
            this.not_found = null;
            this.searched_movies = response.data.movies;
          } else {
            this.quotes = null;
            this.searched_movies = null;
            this.not_found = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getInitialQuotes() {
      axios
        .post("all-quotes")
        .then((response) => {
          this.quotes = response.data.data.data;
          this.page++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addQuotes() {
      if (!this.lastPage) {
        axios
          .get(`all-quotes?page=${this.page}`)
          .then((response) => {
            this.quotes.push.apply(this.quotes, response.data.data.data);
            this.page++;
            // prevent from requesting after last page reached
            response.data.data.current_page === response.data.data.last_page
              ? (this.lastPage = true)
              : false;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  beforeMount() {
    this.getInitialQuotes();
  },
};
</script>
<style scoped>
#infinite-list {
  scroll-behavior: smooth;
}

.newQuote-enter-active,
.newQuote-leave-active {
  transition: opacity 0.2s ease;
}

.newQuote-enter-from,
.newQuote-leave-to {
  opacity: 0;
}
</style>
