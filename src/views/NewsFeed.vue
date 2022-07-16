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
            class="text-white bg-[#24222F] h-12 flex items-center justify-center px-4 rounded-lg md:w-2/5"
            @click="addNewQuote = !addNewQuote"
          >
            <img
              src="@/icons/write-icon.svg"
              alt="new-quote"
              width="25"
              class="mr-3"
            />
            Write a new quote
          </button>
          <form
            class="hidden mx-5 w-full border-b border-gray-600 items-center md:flex text-white"
          >
            <button><img src="@/icons/search-icon.svg" alt="search" /></button>
            <input
              type="search"
              class="bg-inherit h-12 ml-4 w-full outline-none"
              placeholder="Enter @ to search movies, Enter # to search quotes"
            />
          </form>
        </div>
        <post-card v-for="quote in quotes" :key="quote.id" :quote="quote" />
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
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { NavBar, SideBar, NewQuote, PostCard },
  data() {
    return {
      quotes: [],
      page: 1,
      lastPage: false,
      loading: false,
      addNewQuote: false,
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
  methods: {
    getInitialQuotes() {
      axios
        .get("all-quotes")
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
